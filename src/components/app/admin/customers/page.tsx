"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Plus, Filter, Download } from "lucide-react"

interface Customer {
  id: number
  name: string
  email: string
  type: "B2B" | "B2C"
  company?: string
  phone: string
  status: "active" | "inactive" | "pending"
  lifetime_value: number
  orders: number
  created_at: string
  discount_tier: "standard" | "silver" | "gold" | "platinum"
  industry?: string
}

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "B2B" | "B2C">("all")
  const [showModal, setShowModal] = useState(false)

  // Mock data
  const customers: Customer[] = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "a@techcorp.com",
      type: "B2B",
      company: "TechCorp Vietnam",
      phone: "+84 28 1234 5678",
      status: "active",
      lifetime_value: 150000000,
      orders: 45,
      created_at: "2023-01-15",
      discount_tier: "platinum",
      industry: "Technology",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "b@example.com",
      type: "B2C",
      phone: "+84 91 234 5678",
      status: "active",
      lifetime_value: 5000000,
      orders: 12,
      created_at: "2023-06-20",
      discount_tier: "gold",
    },
    {
      id: 3,
      name: "Lê Minh C",
      email: "c@company.com",
      type: "B2B",
      company: "ABC Company",
      phone: "+84 28 9876 5432",
      status: "active",
      lifetime_value: 80000000,
      orders: 28,
      created_at: "2023-03-10",
      discount_tier: "gold",
      industry: "Retail",
    },
  ]

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || customer.type === filterType
    return matchesSearch && matchesType
  })

  const b2bCustomers = customers.filter((c) => c.type === "B2B")
  const b2cCustomers = customers.filter((c) => c.type === "B2C")

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "platinum":
        return "bg-purple-500/20 text-purple-700 border-purple-500/30"
      case "gold":
        return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30"
      case "silver":
        return "bg-gray-500/20 text-gray-700 border-gray-500/30"
      default:
        return "bg-blue-500/20 text-blue-700 border-blue-500/30"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-700 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30"
      default:
        return "bg-red-500/20 text-red-700 border-red-500/30"
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý khách hàng</h1>
          <p className="text-muted-foreground">Quản lý B2B và B2C với chiến lược khác nhau</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm khách hàng
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Tổng khách hàng</div>
            <div className="text-3xl font-bold">{customers.length}</div>
            <div className="text-xs text-green-600 mt-2">+{Math.floor(customers.length * 0.1)} tháng này</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Khách hàng B2B</div>
            <div className="text-3xl font-bold">{b2bCustomers.length}</div>
            <div className="text-xs text-muted-foreground mt-2">
              {((b2bCustomers.length / customers.length) * 100).toFixed(0)}% tổng
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Khách hàng B2C</div>
            <div className="text-3xl font-bold">{b2cCustomers.length}</div>
            <div className="text-xs text-muted-foreground mt-2">
              {((b2cCustomers.length / customers.length) * 100).toFixed(0)}% tổng
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground mb-1">Doanh thu total</div>
            <div className="text-3xl font-bold">
              {(customers.reduce((sum, c) => sum + c.lifetime_value, 0) / 1000000).toFixed(0)}M
            </div>
            <div className="text-xs text-green-600 mt-2">Lifetime value</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm khách hàng..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Loại khách hàng
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterType("all")}>Tất cả</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType("B2B")}>B2B</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterType("B2C")}>B2C</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Xuất Excel
        </Button>
      </div>

      {/* Tabs for B2B and B2C */}
      <div className="space-y-6">
        {/* B2B Section */}
        <Card>
          <CardHeader>
            <CardTitle>Khách hàng B2B</CardTitle>
            <CardDescription>Quản lý khách hàng doanh nghiệp với chiến lược marketing và giá đặc biệt</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Tên công ty</th>
                    <th className="text-left py-3 px-4 font-semibold">Liên hệ</th>
                    <th className="text-left py-3 px-4 font-semibold">Ngành</th>
                    <th className="text-left py-3 px-4 font-semibold">Đơn hàng</th>
                    <th className="text-left py-3 px-4 font-semibold">LTV</th>
                    <th className="text-left py-3 px-4 font-semibold">Tier</th>
                    <th className="text-left py-3 px-4 font-semibold">Trạng thái</th>
                    <th className="text-left py-3 px-4 font-semibold">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers
                    .filter((c) => c.type === "B2B")
                    .map((customer) => (
                      <tr key={customer.id} className="border-b hover:bg-secondary/50">
                        <td className="py-3 px-4 font-medium">{customer.company}</td>
                        <td className="py-3 px-4 text-muted-foreground">{customer.name}</td>
                        <td className="py-3 px-4 text-muted-foreground">{customer.industry}</td>
                        <td className="py-3 px-4">{customer.orders}</td>
                        <td className="py-3 px-4 font-semibold">{(customer.lifetime_value / 1000000).toFixed(0)}M</td>
                        <td className="py-3 px-4">
                          <Badge className={getTierColor(customer.discount_tier)}>{customer.discount_tier}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                              <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                              <DropdownMenuItem>Nâng hạng</DropdownMenuItem>
                              <DropdownMenuItem>Gửi email</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* B2C Section */}
        <Card>
          <CardHeader>
            <CardTitle>Khách hàng B2C</CardTitle>
            <CardDescription>Quản lý khách hàng cá nhân với chương trình loyalty và giá ưu đãi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Tên khách hàng</th>
                    <th className="text-left py-3 px-4 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 font-semibold">Điện thoại</th>
                    <th className="text-left py-3 px-4 font-semibold">Đơn hàng</th>
                    <th className="text-left py-3 px-4 font-semibold">LTV</th>
                    <th className="text-left py-3 px-4 font-semibold">Tier</th>
                    <th className="text-left py-3 px-4 font-semibold">Trạng thái</th>
                    <th className="text-left py-3 px-4 font-semibold">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers
                    .filter((c) => c.type === "B2C")
                    .map((customer) => (
                      <tr key={customer.id} className="border-b hover:bg-secondary/50">
                        <td className="py-3 px-4 font-medium">{customer.name}</td>
                        <td className="py-3 px-4 text-muted-foreground">{customer.email}</td>
                        <td className="py-3 px-4 text-muted-foreground">{customer.phone}</td>
                        <td className="py-3 px-4">{customer.orders}</td>
                        <td className="py-3 px-4 font-semibold">{(customer.lifetime_value / 1000000).toFixed(1)}M</td>
                        <td className="py-3 px-4">
                          <Badge className={getTierColor(customer.discount_tier)}>{customer.discount_tier}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                              <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                              <DropdownMenuItem>Nâng hạng loyalty</DropdownMenuItem>
                              <DropdownMenuItem>Gửi offer</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
