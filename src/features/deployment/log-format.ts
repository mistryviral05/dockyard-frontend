import { DeploymentLog, LogEvent } from "./types"

/** How a single line is painted in the log box. */
export type LogTone = "default" | "muted" | "info" | "success" | "warning" | "error"

/** One rendered line, no matter if it came from the api or from the socket. */
export type LogLine = {
    key: string
    text: string
    tone: LogTone
    at: string
}

// Build output carries color codes, and some of them reach us without the escape byte.
const ANSI_SEQUENCE = /[\u001B\u009B][[\]()#;?]*(?:\d{1,4}(?:;\d{0,4})*)?[\dA-PR-TZcf-nqry=><]/g
const ORPHAN_COLOR_CODE = /\[\d{1,3}(?:;\d{1,3})*m/g

const WARNING_PATTERN = /\b(warn|warning|warnings|deprecated|deprecation|retrying|skipped|undefinedvar)\b/i
const ERROR_PATTERN = /\b(error|errors|failed|failure|fatal|denied|unable to|not found|exit code [1-9])\b/i
const SUCCESS_PATTERN = /\b(done|success|successful|successfully|pushed|listening|completed|is running)\b/i

export function stripAnsi(value: string) {
    return value.replace(ANSI_SEQUENCE, "").replace(ORPHAN_COLOR_CODE, "")
}

/**
 * Warnings win over errors, because the api tags a retry warning as an error line
 * and painting the whole build red reads worse than it is.
 */
function toneFor(text: string, type: string): LogTone {
    if (WARNING_PATTERN.test(text)) {
        return "warning"
    }

    if (type === "error" || ERROR_PATTERN.test(text)) {
        return "error"
    }

    if (SUCCESS_PATTERN.test(text)) {
        return "success"
    }

    if (type === "system") {
        return "info"
    }

    if (type === "runtime") {
        return "muted"
    }

    return "default"
}

/** History rows from GET /deployments/{id}/logs. */
export function toLogLine(log: DeploymentLog): LogLine {
    const text = stripAnsi(log.message)

    return {
        key: log.id,
        text,
        tone: toneFor(text, log.type),
        at: log.logged_at,
    }
}

/** Live batches, one event holds up to twenty lines. */
export function toLogLines(event: LogEvent): LogLine[] {
    return event.lines.map((line, index) => {
        const text = stripAnsi(line)

        return {
            key: `live-${event.seq}-${index}`,
            text,
            tone: toneFor(text, event.type),
            at: event.at,
        }
    })
}
