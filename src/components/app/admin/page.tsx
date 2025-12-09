"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"
import { Users, Package, ShoppingCart, DollarSign, Search, Plus, Edit, Trash2, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function AdminPage() {
  const { user, isAdmin, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/")
    }
  }, [isAdmin, isLoading, router])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-muted-foreground">Đang kiểm tra quyền truy cập...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  const stats = [
    { label: "Tổng người dùng", value: "2,543", change: "+12%", icon: Users },
    { label: "Sản phẩm", value: "156", change: "+8", icon: Package },
    { label: "Đơn hàng", value: "1,234", change: "+23%", icon: ShoppingCart },
    { label: "Doanh thu", value: "₫523M", change: "+18%", icon: DollarSign },
  ]

  const recentOrders = [
    { id: "ORD-001", customer: "Nguyễn Văn A", product: "VietTech CRM", amount: 1500000, status: "completed" },
    { id: "ORD-002", customer: "Trần Thị B", product: "VietTech Analytics", amount: 2000000, status: "processing" },
    { id: "ORD-003", customer: "Lê Văn C", product: "VietTech HRM", amount: 1800000, status: "pending" },
  ]

  const users = [
    { id: 1, name: "Nguyễn Văn A", email: "a@example.com", role: "Enterprise", status: "active" },
    { id: 2, name: "Trần Thị B", email: "b@example.com", role: "Professional", status: "active" },
    { id: 3, name: "Lê Văn C", email: "c@example.com", role: "Starter", status: "inactive" },
  ]

  const revenueData = [
    { month: "Jan", revenue: 45000000, profit: 15000000, orders: 120 },
    { month: "Feb", revenue: 52000000, profit: 18000000, orders: 145 },
    { month: "Mar", revenue: 48000000, profit: 16000000, orders: 130 },
    { month: "Apr", revenue: 61000000, profit: 22000000, orders: 165 },
    { month: "May", revenue: 55000000, profit: 20000000, orders: 150 },
    { month: "Jun", revenue: 67000000, profit: 25000000, orders: 180 },
  ]

  const categoryData = [
    { name: "CRM", value: 35, fill: "hsl(var(--chart-1))" },
    { name: "Analytics", value: 25, fill: "hsl(var(--chart-2))" },
    { name: "Marketing", value: 20, fill: "hsl(var(--chart-3))" },
    { name: "HRM", value: 15, fill: "hsl(var(--chart-4))" },
    { name: "Others", value: 5, fill: "hsl(var(--chart-5))" },
  ]

  const customerTypeData = [
    { type: "B2B", count: 2100, percentage: 82 },
    { type: "B2C", count: 450, percentage: 18 },
  ]

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Quản lý toàn bộ hệ thống</p>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-xs text-green-600">{stat.change}</p>
                </div>
                <stat.icon className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Doanh thu & Lợi nhuận</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: { label: "Doanh thu", color: "hsl(var(--chart-1))" },
                profit: { label: "Lợi nhuận", color: "hsl(var(--chart-2))" },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" name="Doanh thu" />
                  <Line type="monotone" dataKey="profit" stroke="var(--color-profit)" name="Lợi nhuận" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Doanh số theo danh mục</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Đơn hàng theo tháng</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                orders: { label: "Đơn hàng", color: "hsl(var(--chart-3))" },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="orders" fill="var(--color-orders)" name="Đơn hàng" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phân chia khách hàng B2B vs B2C</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ type, percentage }) => `${type}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    <Cell fill="hsl(var(--chart-1))" />
                    <Cell fill="hsl(var(--chart-2))" />
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList>
          <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
          <TabsTrigger value="products">Sản phẩm</TabsTrigger>
          <TabsTrigger value="users">Người dùng</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="analytics">Phân tích</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Đơn hàng gần đây</CardTitle>
              <div className="flex gap-2">
                <Input placeholder="Tìm kiếm đơn hàng..." className="w-64" />
                <Button variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div>
                      <p className="font-semibold">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.product}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">{order.amount.toLocaleString("vi-VN")}đ</p>
                        <Badge
                          variant={
                            order.status === "completed"
                              ? "default"
                              : order.status === "processing"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {order.status === "completed"
                            ? "Hoàn thành"
                            : order.status === "processing"
                              ? "Đang xử lý"
                              : "Chờ xác nhận"}
                        </Badge>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Quản lý sản phẩm</CardTitle>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Thêm sản phẩm
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div>
                      <p className="font-semibold">VietTech Product {i}</p>
                      <p className="text-sm text-muted-foreground">Category • 1,200,000đ</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Quản lý người dùng</CardTitle>
              <Input placeholder="Tìm kiếm người dùng..." className="w-64" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary">{user.role}</Badge>
                      <Badge variant={user.status === "active" ? "default" : "outline"}>
                        {user.status === "active" ? "Hoạt động" : "Không hoạt động"}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Quản lý Blog</CardTitle>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Viết bài mới
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">CMS quản lý blog, pages, và nội dung marketing</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Phân tích & Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm text-muted-foreground">Chuyển đổi</p>
                  <p className="text-3xl font-bold">3.2%</p>
                  <p className="text-xs text-green-600">+0.5% so với tháng trước</p>
                </div>
                <div>
                  <p className="mb-2 text-sm text-muted-foreground">Giá trị đơn hàng TB</p>
                  <p className="text-3xl font-bold">1,850,000đ</p>
                  <p className="text-xs text-green-600">+12% so với tháng trước</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
