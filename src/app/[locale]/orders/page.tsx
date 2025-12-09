"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Eye } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

// Mock orders data
const orders = [
  {
    id: "ORD001",
    date: "2025-01-15",
    status: "delivered",
    total: 3400000,
    items: [
      { name: "VietTech CRM", quantity: 2 },
      { name: "VietTech Analytics", quantity: 1 },
    ],
  },
  {
    id: "ORD002",
    date: "2025-01-10",
    status: "processing",
    total: 2500000,
    items: [{ name: "VietTech E-commerce", quantity: 1 }],
  },
  {
    id: "ORD003",
    date: "2024-12-28",
    status: "cancelled",
    total: 1800000,
    items: [{ name: "VietTech HRM", quantity: 1 }],
  },
]

const statusMap = {
  delivered: { label: "Đã giao hàng", variant: "default" as const },
  processing: { label: "Đang xử lý", variant: "secondary" as const },
  cancelled: { label: "Đã hủy", variant: "destructive" as const },
}

export default function OrdersPage() {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    router.push("/login")
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold md:text-4xl mb-2">Đơn hàng của tôi</h1>
        <p className="text-muted-foreground">Quản lý và theo dõi đơn hàng của bạn</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-secondary/20 p-6">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Chưa có đơn hàng nào</h2>
            <p className="text-muted-foreground">
              Bạn chưa thực hiện đơn hàng nào. Hãy khám phá sản phẩm của chúng tôi!
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/products">Khám phá sản phẩm</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-lg">Đơn hàng #{order.id}</h3>
                      <Badge variant={statusMap[order.status].variant}>{statusMap[order.status].label}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Ngày đặt: {new Date(order.date).toLocaleDateString("vi-VN")}
                    </div>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm">
                          {item.name} x{item.quantity}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end gap-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-1">Tổng cộng</div>
                      <div className="text-2xl font-bold text-accent">{order.total.toLocaleString("vi-VN")}đ</div>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href={`/orders/${order.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Xem chi tiết
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
