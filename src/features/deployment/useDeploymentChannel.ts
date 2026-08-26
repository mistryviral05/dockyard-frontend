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
    /** Only set when the deployment fails. */
    error: string | null
    isConnected: boolean
}

const initialState: ChannelState = {
    lines: [],
    status: null,
    error: null,
    isConnected: false,
}

/**
 * Listens on `deployment:{id}`.
 * Subscribe only once the history is on screen, otherwise the lines that land
 * between the first page and the subscription are lost.
 */
export function useDeploymentChannel(deploymentId?: string, enabled: boolean = false) {
    const isApiReady = useApiStore((state) => state.isApiReady)
    const [state, setState] = useState<ChannelState>(initialState)
    const [channelId, setChannelId] = useState(deploymentId)
    // Centrifugo replays its history after a reconnect, so seq keeps duplicates out.
    const seenSeq = useRef<Set<number>>(new Set())

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
        const channel = `deployment:${deploymentId}`
        seenSeq.current = new Set()

        const handleEvent = (event: DeployEvent) => {
            if (event.event === "status") {
                setState((current) => ({
                    ...current,
                    status: event.status,
                    error: event.error ?? null,
                }))
                return
            }

            if (seenSeq.current.has(event.seq)) {
                return
            }

            seenSeq.current.add(event.seq)
            const incoming = toLogLines(event)
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

                if (subscription.state !== "subscribed") {
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

    return state
}
