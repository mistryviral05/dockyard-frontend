"use client"

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs"
import {
  AGENT_METRICS_WINDOWS,
  type AgentMetricsWindow,
} from "@/features/agent/types"

/** Picks how far back the charts go, the value is sent as the `window` param. */
function AgentWindowTabs({
  value,
  onChange,
}: {
  value: AgentMetricsWindow
  onChange: (value: AgentMetricsWindow) => void
}) {
  return (
    <Tabs
      value={value}
      onValueChange={(next) => onChange(next as AgentMetricsWindow)}
    >
      <TabsList>
        {AGENT_METRICS_WINDOWS.map((item) => (
          <TabsTrigger key={item} value={item} className="px-3 text-xs">
            {item}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export { AgentWindowTabs }
