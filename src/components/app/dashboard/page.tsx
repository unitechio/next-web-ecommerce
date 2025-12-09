"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { TrendingUp, Users, DollarSign, Download, CreditCard, Package } from "lucide-react"
import { redirect } from "next/navigation"

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    redirect("/login")
  }

  // Mock data
  const subscriptions = [
    {
      id: 1,
      name: "VietTech CRM",
      plan: "Professional",
      price: 1500000,
      status: "active",
      renewDate: "2024-12-15",
      users: 15,
      maxUsers: 20,
    },
    {
      id: 2,
      name: "VietTech Analytics",
      plan: "Enterprise",
      price: 2500000,
      status: "active",
      renewDate: "2024-11-30",
      users: 45,
      maxUsers: 50,
    },
  ]

  const invoices = [
    {
      id: "INV-2024-001",
      date: "2024-10-15",
      amount: 1500000,
      status: "paid",
      description: "VietTech CRM - Tháng 10/2024",
    },
    {
      id: "INV-2024-002",
      date: "2024-10-01",
      amount: 2500000,
      status: "paid",
      description: "VietTech Analytics - Tháng 10/2024",
    },
    {
      id: "INV-2024-003",
      date: "2024-09-15",
      amount: 1500000,
      status: "paid",
      description: "VietTech CRM - Tháng 9/2024",
    },
  ]

  const usageStats = {
    apiCalls: { current: 45230, limit: 50000 },
    storage: { current: 85, limit: 100 },
    users: { current: 60, limit: 70 },
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Xin chào, {user?.name}!</h1>
        <p className="text-muted-foreground">Quản lý tài khoản và dịch vụ của bạn</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="subscriptions">Đăng ký</TabsTrigger>
          <TabsTrigger value="invoices">Hóa đơn</TabsTrigger>
          <TabsTrigger value="usage">Sử dụng</TabsTrigger>
          <TabsTrigger value="team">Đội nhóm</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Tổng chi phí/tháng</p>
                    <p className="text-2xl font-bold">4,000,000đ</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Dịch vụ đang dùng</p>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                  <Package className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Người dùng</p>
                    <p className="text-2xl font-bold">60/70</p>
                  </div>
                  <Users className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Tiết kiệm</p>
                    <p className="text-2xl font-bold">+28%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Hoạt động gần đây</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Thanh toán hóa đơn", time: "2 giờ trước", icon: CreditCard },
                    { action: "Thêm 5 người dùng mới", time: "1 ngày trước", icon: Users },
                    { action: "Nâng cấp gói Enterprise", time: "3 ngày trước", icon: TrendingUp },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 border-b pb-3 last:border-0">
                      <activity.icon className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Khuyến nghị</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h4 className="mb-2 font-semibold">Nâng cấp lên gói Enterprise</h4>
                    <p className="mb-3 text-sm text-muted-foreground">
                      Bạn sắp đạt giới hạn người dùng. Nâng cấp để mở khóa nhiều tính năng hơn.
                    </p>
                    <Button size="sm" variant="outline">
                      Xem chi tiết
                    </Button>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h4 className="mb-2 font-semibold">Tối ưu hóa chi phí</h4>
                    <p className="mb-3 text-sm text-muted-foreground">
                      Tiết kiệm 15% khi thanh toán hàng năm thay vì hàng tháng.
                    </p>
                    <Button size="sm" variant="outline">
                      Tìm hiểu thêm
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-6">
          {subscriptions.map((sub) => (
            <Card key={sub.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="text-xl font-semibold">{sub.name}</h3>
                      <Badge variant={sub.status === "active" ? "default" : "secondary"}>{sub.plan}</Badge>
                    </div>
                    <div className="mb-4 grid gap-2 text-sm text-muted-foreground md:grid-cols-3">
                      <div>
                        <span className="font-medium">Giá:</span> {sub.price.toLocaleString("vi-VN")}đ/tháng
                      </div>
                      <div>
                        <span className="font-medium">Gia hạn:</span> {sub.renewDate}
                      </div>
                      <div>
                        <span className="font-medium">Người dùng:</span> {sub.users}/{sub.maxUsers}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Quản lý
                      </Button>
                      <Button size="sm" variant="outline">
                        Nâng cấp
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="invoices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử hóa đơn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div>
                      <p className="font-semibold">{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">{invoice.description}</p>
                      <p className="text-xs text-muted-foreground">{invoice.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">{invoice.amount.toLocaleString("vi-VN")}đ</p>
                        <Badge variant="secondary">
                          {invoice.status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
                        </Badge>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thống kê sử dụng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="mb-2 flex justify-between">
                  <span className="font-medium">API Calls</span>
                  <span className="text-sm text-muted-foreground">
                    {usageStats.apiCalls.current.toLocaleString()} / {usageStats.apiCalls.limit.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-accent"
                    style={{ width: `${(usageStats.apiCalls.current / usageStats.apiCalls.limit) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between">
                  <span className="font-medium">Lưu trữ (GB)</span>
                  <span className="text-sm text-muted-foreground">
                    {usageStats.storage.current} / {usageStats.storage.limit}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-accent"
                    style={{ width: `${(usageStats.storage.current / usageStats.storage.limit) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between">
                  <span className="font-medium">Người dùng</span>
                  <span className="text-sm text-muted-foreground">
                    {usageStats.users.current} / {usageStats.users.limit}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-accent"
                    style={{ width: `${(usageStats.users.current / usageStats.users.limit) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Thành viên đội nhóm</CardTitle>
              <Button>Mời thành viên</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Nguyễn Văn A", email: "a@company.com", role: "Admin", status: "active" },
                  { name: "Trần Thị B", email: "b@company.com", role: "Editor", status: "active" },
                  { name: "Lê Văn C", email: "c@company.com", role: "Viewer", status: "pending" },
                ].map((member, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div>
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary">{member.role}</Badge>
                      <Badge variant={member.status === "active" ? "default" : "outline"}>
                        {member.status === "active" ? "Hoạt động" : "Chờ xác nhận"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
