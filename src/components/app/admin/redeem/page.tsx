"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Gift, Ticket, Copy } from "lucide-react"

interface Coupon {
  id: string
  code: string
  type: "percentage" | "fixed"
  value: number
  minPurchase: number
  maxUses: number
  usedCount: number
  expiryDate: string
  status: "active" | "expired" | "inactive"
  description: string
}

interface RedeemPoint {
  id: string
  customerName: string
  email: string
  points: number
  redeemedAt: string
  expiryDate: string
  status: "active" | "redeemed" | "expired"
  reward: string
}

export default function RedeemPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: "C-001",
      code: "SAVE20",
      type: "percentage",
      value: 20,
      minPurchase: 1000000,
      maxUses: 100,
      usedCount: 45,
      expiryDate: "2024-12-31",
      status: "active",
      description: "Giảm 20% cho đơn hàng từ 1M đồng",
    },
    {
      id: "C-002",
      code: "FLAT500K",
      type: "fixed",
      value: 500000,
      minPurchase: 2000000,
      maxUses: 50,
      usedCount: 28,
      expiryDate: "2024-12-15",
      status: "active",
      description: "Giảm 500K cho đơn hàng từ 2M đồng",
    },
    {
      id: "C-003",
      code: "NEWYEAR10",
      type: "percentage",
      value: 10,
      minPurchase: 500000,
      maxUses: 200,
      usedCount: 5,
      expiryDate: "2024-11-30",
      status: "expired",
      description: "Giảm 10% cho khách hàng mới",
    },
  ])

  const [redeemPoints, setRedeemPoints] = useState<RedeemPoint[]>([
    {
      id: "R-001",
      customerName: "Nguyễn Văn A",
      email: "a@example.com",
      points: 5000,
      redeemedAt: "2024-12-05",
      expiryDate: "2025-06-05",
      status: "active",
      reward: "Voucher 500K",
    },
    {
      id: "R-002",
      customerName: "Trần Thị B",
      email: "b@example.com",
      points: 2500,
      redeemedAt: "2024-12-01",
      expiryDate: "2024-12-15",
      status: "active",
      reward: "Voucher 250K",
    },
    {
      id: "R-003",
      customerName: "Lê Văn C",
      email: "c@example.com",
      points: 1000,
      redeemedAt: "2024-11-20",
      expiryDate: "2024-11-30",
      status: "expired",
      reward: "Voucher 100K",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("coupons")
  const [couponForm, setCouponForm] = useState<Partial<Coupon>>({
    code: "",
    type: "percentage",
    value: 0,
    minPurchase: 0,
    maxUses: 0,
    description: "",
    expiryDate: "",
    status: "active",
  })
  const [redeemForm, setRedeemForm] = useState<Partial<RedeemPoint>>({
    customerName: "",
    email: "",
    points: 0,
    reward: "",
    status: "active",
  })

  const filteredCoupons = coupons.filter(
    (coupon) =>
      coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredRedeemPoints = redeemPoints.filter(
    (point) =>
      point.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      point.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddCoupon = () => {
    if (editingId) {
      setCoupons(coupons.map((c) => (c.id === editingId ? { ...c, ...couponForm, usedCount: c.usedCount } : c)))
      setEditingId(null)
    } else {
      const newCoupon: Coupon = {
        id: `C-${String(coupons.length + 1).padStart(3, "0")}`,
        code: couponForm.code || "",
        type: (couponForm.type as any) || "percentage",
        value: couponForm.value || 0,
        minPurchase: couponForm.minPurchase || 0,
        maxUses: couponForm.maxUses || 0,
        usedCount: 0,
        expiryDate: couponForm.expiryDate || "",
        status: (couponForm.status as any) || "active",
        description: couponForm.description || "",
      }
      setCoupons([...coupons, newCoupon])
    }
    setCouponForm({
      code: "",
      type: "percentage",
      value: 0,
      minPurchase: 0,
      maxUses: 0,
      description: "",
      expiryDate: "",
      status: "active",
    })
    setIsOpen(false)
  }

  const handleAddRedeem = () => {
    if (editingId) {
      setRedeemPoints(redeemPoints.map((r) => (r.id === editingId ? { ...r, ...redeemForm } : r)))
      setEditingId(null)
    } else {
      const newRedeem: RedeemPoint = {
        id: `R-${String(redeemPoints.length + 1).padStart(3, "0")}`,
        customerName: redeemForm.customerName || "",
        email: redeemForm.email || "",
        points: redeemForm.points || 0,
        redeemedAt: new Date().toISOString().split("T")[0],
        expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        status: (redeemForm.status as any) || "active",
        reward: redeemForm.reward || "",
      }
      setRedeemPoints([...redeemPoints, newRedeem])
    }
    setRedeemForm({
      customerName: "",
      email: "",
      points: 0,
      reward: "",
      status: "active",
    })
    setIsOpen(false)
  }

  const handleDeleteCoupon = (id: string) => {
    setCoupons(coupons.filter((c) => c.id !== id))
  }

  const handleDeleteRedeem = (id: string) => {
    setRedeemPoints(redeemPoints.filter((r) => r.id !== id))
  }

  const handleEditCoupon = (coupon: Coupon) => {
    setActiveTab("coupons")
    setEditingId(coupon.id)
    setCouponForm(coupon)
    setIsOpen(true)
  }

  const handleEditRedeem = (redeem: RedeemPoint) => {
    setActiveTab("points")
    setEditingId(redeem.id)
    setRedeemForm(redeem)
    setIsOpen(true)
  }

  const handleCopyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code)
    alert("Đã sao chép: " + code)
  }

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản lý Redeem & Coupons</h1>
          <p className="text-muted-foreground">Quản lý mã giảm giá và điểm thưởng</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingId(null)
                if (activeTab === "coupons") {
                  setCouponForm({
                    code: "",
                    type: "percentage",
                    value: 0,
                    minPurchase: 0,
                    maxUses: 0,
                    description: "",
                    expiryDate: "",
                    status: "active",
                  })
                } else {
                  setRedeemForm({
                    customerName: "",
                    email: "",
                    points: 0,
                    reward: "",
                    status: "active",
                  })
                }
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Thêm mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {activeTab === "coupons"
                  ? editingId
                    ? "Chỉnh sửa coupon"
                    : "Thêm coupon mới"
                  : editingId
                    ? "Chỉnh sửa điểm thưởng"
                    : "Thêm điểm thưởng mới"}
              </DialogTitle>
              <DialogDescription>
                {activeTab === "coupons" ? "Quản lý mã giảm giá" : "Quản lý điểm thưởng khách hàng"}
              </DialogDescription>
            </DialogHeader>

            {activeTab === "coupons" ? (
              <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  <Label htmlFor="code">Mã coupon</Label>
                  <Input
                    id="code"
                    value={couponForm.code || ""}
                    onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                    placeholder="SAVE20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Loại</Label>
                  <select
                    id="type"
                    value={couponForm.type || "percentage"}
                    onChange={(e) => setCouponForm({ ...couponForm, type: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="percentage">Phần trăm (%)</option>
                    <option value="fixed">Cố định (đ)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Giá trị</Label>
                  <Input
                    id="value"
                    type="number"
                    value={couponForm.value || 0}
                    onChange={(e) => setCouponForm({ ...couponForm, value: Number(e.target.value) })}
                    placeholder="20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minPurchase">Mua tối thiểu (đ)</Label>
                  <Input
                    id="minPurchase"
                    type="number"
                    value={couponForm.minPurchase || 0}
                    onChange={(e) => setCouponForm({ ...couponForm, minPurchase: Number(e.target.value) })}
                    placeholder="1000000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxUses">Số lần dùng tối đa</Label>
                  <Input
                    id="maxUses"
                    type="number"
                    value={couponForm.maxUses || 0}
                    onChange={(e) => setCouponForm({ ...couponForm, maxUses: Number(e.target.value) })}
                    placeholder="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Ngày hết hạn</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={couponForm.expiryDate || ""}
                    onChange={(e) => setCouponForm({ ...couponForm, expiryDate: e.target.value })}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    value={couponForm.description || ""}
                    onChange={(e) => setCouponForm({ ...couponForm, description: e.target.value })}
                    placeholder="Mô tả coupon..."
                    rows={3}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <select
                    id="status"
                    value={couponForm.status || "active"}
                    onChange={(e) => setCouponForm({ ...couponForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Tạm dừng</option>
                    <option value="expired">Hết hạn</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Tên khách hàng</Label>
                  <Input
                    id="customerName"
                    value={redeemForm.customerName || ""}
                    onChange={(e) => setRedeemForm({ ...redeemForm, customerName: e.target.value })}
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={redeemForm.email || ""}
                    onChange={(e) => setRedeemForm({ ...redeemForm, email: e.target.value })}
                    placeholder="a@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="points">Điểm</Label>
                  <Input
                    id="points"
                    type="number"
                    value={redeemForm.points || 0}
                    onChange={(e) => setRedeemForm({ ...redeemForm, points: Number(e.target.value) })}
                    placeholder="5000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reward">Phần thưởng</Label>
                  <Input
                    id="reward"
                    value={redeemForm.reward || ""}
                    onChange={(e) => setRedeemForm({ ...redeemForm, reward: e.target.value })}
                    placeholder="Voucher 500K"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="status2">Trạng thái</Label>
                  <select
                    id="status2"
                    value={redeemForm.status || "active"}
                    onChange={(e) => setRedeemForm({ ...redeemForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="redeemed">Đã dùng</option>
                    <option value="expired">Hết hạn</option>
                  </select>
                </div>
              </div>
            )}

            <Button onClick={activeTab === "coupons" ? handleAddCoupon : handleAddRedeem} className="w-full mt-4">
              {editingId ? "Cập nhật" : "Thêm mới"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="coupons" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="coupons">
            <Ticket className="mr-2 h-4 w-4" />
            Coupons
          </TabsTrigger>
          <TabsTrigger value="points">
            <Gift className="mr-2 h-4 w-4" />
            Redeem Points
          </TabsTrigger>
        </TabsList>

        <TabsContent value="coupons" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Danh sách coupons ({filteredCoupons.length})</CardTitle>
              <Input
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Mã</th>
                      <th className="text-left py-3 px-4 font-semibold">Loại & Giá trị</th>
                      <th className="text-left py-3 px-4 font-semibold">Mô tả</th>
                      <th className="text-center py-3 px-4 font-semibold">Dùng</th>
                      <th className="text-center py-3 px-4 font-semibold">Mua tối thiểu</th>
                      <th className="text-center py-3 px-4 font-semibold">Hết hạn</th>
                      <th className="text-center py-3 px-4 font-semibold">Trạng thái</th>
                      <th className="text-center py-3 px-4 font-semibold">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCoupons.map((coupon) => (
                      <tr key={coupon.id} className="border-b hover:bg-accent/5 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <code className="font-bold text-primary">{coupon.code}</code>
                            <Button size="sm" variant="ghost" onClick={() => handleCopyCouponCode(coupon.code)}>
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {coupon.type === "percentage"
                            ? `${coupon.value}%`
                            : `${coupon.value.toLocaleString("vi-VN")}đ`}
                        </td>
                        <td className="py-3 px-4 text-xs line-clamp-2">{coupon.description}</td>
                        <td className="py-3 px-4 text-center">
                          {coupon.usedCount}/{coupon.maxUses}
                        </td>
                        <td className="py-3 px-4 text-center">{coupon.minPurchase.toLocaleString("vi-VN")}đ</td>
                        <td className="py-3 px-4 text-center text-sm">{coupon.expiryDate}</td>
                        <td className="py-3 px-4 text-center">
                          <Badge
                            variant={
                              coupon.status === "active"
                                ? "default"
                                : coupon.status === "inactive"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {coupon.status === "active"
                              ? "Hoạt động"
                              : coupon.status === "inactive"
                                ? "Tạm dừng"
                                : "Hết hạn"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex justify-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEditCoupon(coupon)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleDeleteCoupon(coupon.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="points" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Danh sách redeem points ({filteredRedeemPoints.length})</CardTitle>
              <Input
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredRedeemPoints.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Không có redeem points nào</p>
                ) : (
                  filteredRedeemPoints.map((point) => (
                    <div key={point.id} className="border rounded-lg p-4 hover:bg-accent/5 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="font-bold">{point.id}</p>
                            <Badge
                              variant={
                                point.status === "active"
                                  ? "default"
                                  : point.status === "redeemed"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {point.status === "active"
                                ? "Hoạt động"
                                : point.status === "redeemed"
                                  ? "Đã dùng"
                                  : "Hết hạn"}
                            </Badge>
                          </div>
                          <h3 className="font-semibold">{point.customerName}</h3>
                          <div className="text-sm text-muted-foreground mb-2">
                            <p>Email: {point.email}</p>
                            <p>Điểm: {point.points.toLocaleString()}</p>
                            <p>Phần thưởng: {point.reward}</p>
                            <p>Hạn dùng: {point.expiryDate}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditRedeem(point)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteRedeem(point.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
