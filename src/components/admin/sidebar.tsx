"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { LayoutDashboard, Package, Ticket, MessageSquare, Gift, Calendar, LogOut, ChevronDown } from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Sản phẩm", icon: Package },
  { href: "/admin/tickets", label: "Tickets", icon: Ticket },
  { href: "/admin/contact-feedback", label: "Contact & Feedback", icon: MessageSquare },
  { href: "/admin/redeem", label: "Redeem & Coupons", icon: Gift },
  { href: "/admin/campaigns", label: "Campaigns", icon: Calendar },
]

export function Sidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={`${isCollapsed ? "w-20" : "w-64"} border-r bg-card transition-all duration-300 flex flex-col`}>
      <div className="flex items-center justify-between gap-4 border-b p-4">
        {!isCollapsed && <h1 className="font-bold text-lg">Admin</h1>}
        <Button size="sm" variant="ghost" onClick={() => setIsCollapsed(!isCollapsed)}>
          <ChevronDown className={`h-4 w-4 transition-transform ${isCollapsed ? "rotate-90" : ""}`} />
        </Button>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? "default" : "ghost"}
              className="w-full justify-start"
              title={item.label}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!isCollapsed && <span className="ml-2">{item.label}</span>}
            </Button>
          </Link>
        ))}
      </nav>

      <div className="border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Đăng xuất</span>}
        </Button>
      </div>
    </div>
  )
}
