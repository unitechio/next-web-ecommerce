"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Download, Truck, CheckCircle, XCircle, Clock } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

// Mock order detail data
const orderDetail = {
  id: "ORD001",
  date: "2025-01-15",
  status: "delivered",
  customer: {
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    phone: "0901234567",
    address: "123 Đường ABC, Quận 1, TP.HCM",
  },
  items: [
    {
      id: 1,
      name: "VietTech CRM Pro",
      image: "/placeholder.svg?height=80&width=80",
      price: 1500000,
      quantity: 2,
      discount: 10,
    },
    {
      id: 2,
      name: "VietTech Analytics",
      image: "/placeholder.svg?height=80&width=80",
      price: 2000000,
      quantity: 1,
      discount: 0,
    },
  ],
  subtotal: 5000000,
  discount: 300000,
  shipping: 0,
  tax: 400000,
  total: 5100000,
  payment: {
    method: "Thẻ tín dụng",
    status: "paid",
    transactionId: "TXN-2025-001-15489",
  },
  tracking: [
    {
      status: "ordered",
      label: "Đơn hàng đã đặt",
      time: "2025-01-15 09:30",
      completed: true,
    },
    {
      status: "confirmed",
      label: "Đã xác nhận",
      time: "2025-01-15 10:15",
      completed: true,
    },
    {
      status: "processing",
      label: "Đang xử lý",
      time: "2025-01-15 14:30",
      completed: true,
    },
    {
      status: "shipped",
      label: "Đang giao hàng",
      time: "2025-01-16 08:00",
      completed: true,
    },
    {
      status: "delivered",
      label: "Đã giao hàng",
      time: "2025-01-17 16:45",
      completed: true,
    },
  ],
}

const statusConfig = {
  delivered: { label: "Đã giao hàng", variant: "default" as const, icon: CheckCircle },
  processing: { label: "Đang xử lý", variant: "secondary" as const, icon: Clock },
  cancelled: { label: "Đã hủy", variant: "destructive" as const, icon: XCircle },
  shipped: { label: "Đang giao", variant: "secondary" as const, icon: Truck },
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  if (!user) {
    router.push("/login")
    return null
  }

  const handleDownloadInvoice = () => {
    toast({
      title: "Đang tải hóa đơn",
      description: "Hóa đơn sẽ được tải xuống trong giây lát...",
    })
    // Generate PDF invoice
    setTimeout(() => {
      toast({
        title: "Tải thành công",
        description: "Hóa đơn đã được tải về máy của bạn.",
      })
    }, 1500)
  }

  const StatusIcon = statusConfig[orderDetail.status].icon

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold">Chi tiết đơn hàng #{orderDetail.id}</h1>
          <p className="text-muted-foreground">
            Đặt hàng ngày {new Date(orderDetail.date).toLocaleDateString("vi-VN")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownloadInvoice}>
            <Download className="mr-2 h-4 w-4" />
            Tải hóa đơn
          </Button>
          <Button variant="outline" asChild>
            <Link href="/orders">Quay lại</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Order Status */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Trạng thái đơn hàng</CardTitle>
                <Badge variant={statusConfig[orderDetail.status].variant} className="flex items-center gap-1">
                  <StatusIcon className="h-4 w-4" />
                  {statusConfig[orderDetail.status].label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-8 pb-4">
                {orderDetail.tracking.map((track, index) => (
                  <div key={index} className="relative flex gap-4">
                    {/* Timeline line */}
                    {index < orderDetail.tracking.length - 1 && (
                      <div
                        className={`absolute left-4 top-10 h-full w-0.5 ${track.completed ? "bg-accent" : "bg-secondary"}`}
                      />
                    )}

                    {/* Icon */}
                    <div
                      className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${
                        track.completed ? "bg-accent text-white" : "bg-secondary"
                      }`}
                    >
                      {track.completed ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <p className={`font-semibold ${track.completed ? "text-foreground" : "text-muted-foreground"}`}>
                        {track.label}
                      </p>
                      <p className="text-sm text-muted-foreground">{track.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Sản phẩm</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderDetail.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">Số lượng: {item.quantity}</p>
                      {item.discount > 0 && (
                        <Badge variant="secondary" className="mt-1">
                          Giảm {item.discount}%
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{(item.price * item.quantity).toLocaleString("vi-VN")}đ</p>
                      {item.discount > 0 && (
                        <p className="text-sm text-muted-foreground line-through">
                          {((item.price * item.quantity) / (1 - item.discount / 100)).toLocaleString("vi-VN")}đ
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tạm tính</span>
                  <span>{orderDetail.subtotal.toLocaleString("vi-VN")}đ</span>
                </div>
                {orderDetail.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Giảm giá</span>
                    <span className="text-green-600">-{orderDetail.discount.toLocaleString("vi-VN")}đ</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Phí vận chuyển</span>
                  <span>
                    {orderDetail.shipping === 0 ? "Miễn phí" : `${orderDetail.shipping.toLocaleString("vi-VN")}đ`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Thuế VAT</span>
                  <span>{orderDetail.tax.toLocaleString("vi-VN")}đ</span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng</span>
                  <span className="text-accent">{orderDetail.total.toLocaleString("vi-VN")}đ</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin khách hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Họ tên</p>
                <p className="font-semibold">{orderDetail.customer.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold">{orderDetail.customer.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Số điện thoại</p>
                <p className="font-semibold">{orderDetail.customer.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Địa chỉ giao hàng</p>
                <p className="font-semibold">{orderDetail.customer.address}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin thanh toán</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Phương thức</p>
                <p className="font-semibold">{orderDetail.payment.method}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Trạng thái</p>
                <Badge variant="default">Đã thanh toán</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mã giao dịch</p>
                <p className="font-mono text-xs">{orderDetail.payment.transactionId}</p>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card className="bg-accent/10">
            <CardContent className="p-6">
              <h3 className="mb-2 font-semibold">Cần hỗ trợ?</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Liên hệ với chúng tôi nếu bạn có bất kỳ thắc mắc nào về đơn hàng này.
              </p>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/support">Tạo ticket hỗ trợ</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
