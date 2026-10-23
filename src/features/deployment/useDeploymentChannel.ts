"use client"

import { useEffect, useRef, useState } from "react"
import type { Centrifuge, Subscription } from "centrifuge"

import { getCentrifugeClient } from "@/shared/lib/centrifugo"
import { useApiStore } from "@/store/useApiStore"
import { LogLine, toLogLines } from "./log-format"
import { DeployEvent, DeploymentStatus } from "./types"

type ChannelState = {
    /** Lines pushed since the subscription opened, history is not repeated here. */
    lines: LogLine[]
    /** Last status the channel reported, `null` until the first status event. */
    status: DeploymentStatus | null
    /** Public address of the running container, `null` until one is published. */
    url: string | null
    /** Only set when the deployment fails. */
    error: string | null
    isConnected: boolean
}

/** The namespace centrifugo publishes on, the channel is `deploy:{deployment_id}`. */
const DEPLOYMENT_CHANNEL_PREFIX = "deploy"

const initialState: ChannelState = {
    lines: [],
    status: null,
    url: null,
    error: null,
    isConnected: false,
}

/**
 * Listens on `deploy:{id}`.
 *
 * The socket opens right away, before the history request is done, otherwise the
 * lines published in between are lost. Anything that lands early waits in a
 * buffer until `isHistoryReady`, so live lines never jump ahead of the history.
 */
export function useDeploymentChannel(
    deploymentId?: string,
    enabled: boolean = false,
    isHistoryReady: boolean = false
) {
    const isApiReady = useApiStore((state) => state.isApiReady)
    const [state, setState] = useState<ChannelState>(initialState)
    const [channelId, setChannelId] = useState(deploymentId)
    // Centrifugo replays its history after a reconnect, so seq keeps duplicates out.
    const seenSeq = useRef<Set<number>>(new Set())
    const buffer = useRef<LogLine[]>([])
    const hasHistory = useRef(isHistoryReady)

    // Another deployment means another channel, so drop what the last one collected.
    if (channelId !== deploymentId) {
        setChannelId(deploymentId)
        setState(initialState)
    }

    useEffect(() => {
        if (!deploymentId || !enabled || !isApiReady) {
            return
        }

        let isCancelled = false
        let client: Centrifuge | null = null
        let subscription: Subscription | null = null
        const channel = `${DEPLOYMENT_CHANNEL_PREFIX}:${deploymentId}`
        seenSeq.current = new Set()

        const handleEvent = (event: DeployEvent) => {
            if (event.event === "status") {
                setState((current) => ({
                    ...current,
                    status: event.status,
                    // The earlier moves carry no url, so they must not clear the one held.
                    url: event.url || current.url,
                    error: event.error ?? null,
                }))
                return
            }

            if (seenSeq.current.has(event.seq)) {
                return
            }

            seenSeq.current.add(event.seq)
            const incoming = toLogLines(event)

            if (!hasHistory.current) {
                buffer.current.push(...incoming)
                return
            }

            setState((current) => ({ ...current, lines: [...current.lines, ...incoming] }))
        }

        getCentrifugeClient()
            .then((instance) => {
                if (isCancelled) {
                    return
                }

                client = instance
                subscription = instance.getSubscription(channel) ?? instance.newSubscription(channel)

                subscription.on("publication", (context) => {
                    handleEvent(context.data as DeployEvent)
                })
                subscription.on("subscribed", () => {
                    setState((current) => ({ ...current, isConnected: true }))
                })
                subscription.on("unsubscribed", () => {
                    setState((current) => ({ ...current, isConnected: false }))
                })
                // A refused subscribe means the ownership check said no, and it is
                // silent otherwise, so it would look like a build with no output.
                subscription.on("error", (context) => {
                    console.warn(`centrifugo could not subscribe to ${channel}`, context)
                })

                if (subscription.state === "subscribed") {
                    setState((current) => ({ ...current, isConnected: true }))
                } else {
                    subscription.subscribe()
                }
            })
            .catch(() => {
                if (!isCancelled) {
                    setState((current) => ({ ...current, isConnected: false }))
                }
            })

        return () => {
            isCancelled = true

            if (subscription) {
                subscription.removeAllListeners()
                subscription.unsubscribe()
                client?.removeSubscription(subscription)
            }
        }
    }, [deploymentId, enabled, isApiReady])

    // Once the history is rendered, whatever came in early can go under it.
    useEffect(() => {
        hasHistory.current = isHistoryReady

        if (!isHistoryReady || buffer.current.length === 0) {
            return
        }

        const pending = buffer.current
        buffer.current = []
        const timer = setTimeout(() => {
            setState((current) => ({ ...current, lines: [...current.lines, ...pending] }))
        }, 0)

        return () => clearTimeout(timer)
    }, [isHistoryReady])

    return state
}
