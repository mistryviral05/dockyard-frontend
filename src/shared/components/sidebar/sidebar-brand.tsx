import Link from "next/link"
import { Container } from "lucide-react"
import Image from "next/image"

function SidebarBrand() {
  return (
    <Link
      href="/apps"
      className="flex items-center gap-3 rounded-md px-2 py-1.5 outline-none transition-colors  focus-visible:bg-sidebar-accent/60"
    >

    <Image src="/logo.png" alt="Dockyard Logo" unoptimized className="rounded-md" width={50} height={50} />
      <span className="flex min-w-0 flex-col gap-1">
        <span className="truncate font-heading text-lg font-bold tracking-tight">
          Dockyard
        </span>
        <span className="text-xs font-semibold text-muted-foreground bg-[#1b1b1b] p-1.5 rounded-md">Early Access</span>
      </span>
    </Link>
  )
}

export { SidebarBrand }
