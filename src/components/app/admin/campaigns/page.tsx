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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, TrendingUp } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface Campaign {
  id: string
  name: string
  type: "seasonal" | "product-launch" | "flash-sale" | "loyalty" | "referral"
  startDate: string
  endDate: string
  budget: number
  status: "planning" | "ongoing" | "completed" | "archived"
  description: string
  targetAudience: string
  metrics: {
    impressions: number
    clicks: number
    conversions: number
    revenue: number
    costPerAcquisition: number
    roi: number
  }
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "CAM-001",
      name: "Black Friday 2024",
      type: "seasonal",
      startDate: "2024-11-01",
      endDate: "2024-11-30",
      budget: 50000000,
      status: "completed",
      description: "Chiến dịch Black Friday với giảm giá lên đến 50%",
      targetAudience: "B2C, Regular customers",
      metrics: {
        impressions: 500000,
        clicks: 45000,
        conversions: 3500,
        revenue: 280000000,
        costPerAcquisition: 14285,
        roi: 460,
      },
    },
    {
      id: "CAM-002",
      name: "VietTech CRM Launch",
      type: "product-launch",
      startDate: "2024-12-01",
      endDate: "2024-12-15",
      budget: 30000000,
      status: "ongoing",
      description: "Khởi động sản phẩm CRM mới với demo miễn phí",
      targetAudience: "B2B, Enterprise",
      metrics: {
        impressions: 280000,
        clicks: 12000,
        conversions: 250,
        revenue: 90000000,
        costPerAcquisition: 120000,
        roi: 200,
      },
    },
    {
      id: "CAM-003",
      name: "Flash Sale - Sinh nhật công ty",
      type: "flash-sale",
      startDate: "2024-12-05",
      endDate: "2024-12-07",
      budget: 20000000,
      status: "completed",
      description: "Giảm giá 30% trong 3 ngày sinh nhật công ty",
      targetAudience: "All customers",
      metrics: {
        impressions: 350000,
        clicks: 28000,
        conversions: 2100,
        revenue: 170000000,
        costPerAcquisition: 9523,
        roi: 750,
      },
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Campaign>>({
    name: "",
    type: "seasonal",
    startDate: "",
    endDate: "",
    budget: 0,
    status: "planning",
    description: "",
    targetAudience: "",
  })

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddCampaign = () => {
    if (editingId) {
      setCampaigns(campaigns.map((c) => (c.id === editingId ? { ...c, ...formData } : c)))
      setEditingId(null)
    } else {
      const newCampaign: Campaign = {
        id: `CAM-${String(campaigns.length + 1).padStart(3, "0")}`,
        name: formData.name || "",
        type: (formData.type as any) || "seasonal",
        startDate: formData.startDate || "",
        endDate: formData.endDate || "",
        budget: formData.budget || 0,
        status: (formData.status as any) || "planning",
        description: formData.description || "",
        targetAudience: formData.targetAudience || "",
        metrics: {
          impressions: 0,
          clicks: 0,
          conversions: 0,
          revenue: 0,
          costPerAcquisition: 0,
          roi: 0,
        },
      }
      setCampaigns([...campaigns, newCampaign])
    }
    setFormData({
      name: "",
      type: "seasonal",
      startDate: "",
      endDate: "",
      budget: 0,
      status: "planning",
      description: "",
      targetAudience: "",
    })
    setIsOpen(false)
  }

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter((c) => c.id !== id))
  }

  const handleEditCampaign = (campaign: Campaign) => {
    setEditingId(campaign.id)
    setFormData(campaign)
    setIsOpen(true)
  }

  const getCampaignTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      seasonal: "Theo mùa",
      "product-launch": "Ra mắt sản phẩm",
      "flash-sale": "Flash Sale",
      loyalty: "Chương trình thành viên",
      referral: "Giới thiệu bạn bè",
    }
    return types[type] || type
  }

  const getCampaignTypeColor = (type: string) => {
    switch (type) {
      case "seasonal":
        return "bg-blue-50 text-blue-700 border border-blue-200"
      case "product-launch":
        return "bg-green-50 text-green-700 border border-green-200"
      case "flash-sale":
        return "bg-red-50 text-red-700 border border-red-200"
      case "loyalty":
        return "bg-purple-50 text-purple-700 border border-purple-200"
      case "referral":
        return "bg-orange-50 text-orange-700 border border-orange-200"
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200"
    }
  }

  const conversionFunnelData = selectedCampaign
    ? [
        { name: "Impressions", value: selectedCampaign.metrics.impressions },
        { name: "Clicks", value: selectedCampaign.metrics.clicks },
        { name: "Conversions", value: selectedCampaign.metrics.conversions },
      ]
    : []

  const profitData = selectedCampaign
    ? [
        {
          name: "Profit",
          revenue: selectedCampaign.metrics.revenue,
          cost: selectedCampaign.metrics.revenue / (1 + selectedCampaign.metrics.roi / 100),
        },
      ]
    : []

  const roiPieData =
    selectedCampaign && selectedCampaign.metrics.roi > 0
      ? [
          {
            name: "Lợi nhuận",
            value: selectedCampaign.metrics.roi,
            fill: "hsl(var(--chart-2))",
          },
          {
            name: "Chi phí",
            value: 100,
            fill: "hsl(var(--chart-3))",
          },
        ]
      : []

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản lý Event & Campaign</h1>
          <p className="text-muted-foreground">Quản lý các chiến dịch marketing và sự kiện</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingId(null)
                setFormData({
                  name: "",
                  type: "seasonal",
                  startDate: "",
                  endDate: "",
                  budget: 0,
                  status: "planning",
                  description: "",
                  targetAudience: "",
                })
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Tạo campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? "Chỉnh sửa campaign" : "Tạo campaign mới"}</DialogTitle>
              <DialogDescription>
                {editingId ? "Cập nhật thông tin campaign" : "Nhập thông tin campaign mới"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="name">Tên campaign</Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Black Friday 2024"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Loại</Label>
                <select
                  id="type"
                  value={formData.type || "seasonal"}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="seasonal">Theo mùa</option>
                  <option value="product-launch">Ra mắt sản phẩm</option>
                  <option value="flash-sale">Flash Sale</option>
                  <option value="loyalty">Chương trình thành viên</option>
                  <option value="referral">Giới thiệu bạn bè</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái</Label>
                <select
                  id="status"
                  value={formData.status || "planning"}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="planning">Lên kế hoạch</option>
                  <option value="ongoing">Đang chạy</option>
                  <option value="completed">Hoàn thành</option>
                  <option value="archived">Lưu trữ</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Ngày bắt đầu</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate || ""}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Ngày kết thúc</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate || ""}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Ngân sách (đ)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget || 0}
                  onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                  placeholder="50000000"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Mô tả chi tiết campaign..."
                  rows={3}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="targetAudience">Đối tượng mục tiêu</Label>
                <Input
                  id="targetAudience"
                  value={formData.targetAudience || ""}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  placeholder="B2C, Regular customers"
                />
              </div>
            </div>
            <Button onClick={handleAddCampaign} className="w-full mt-4">
              {editingId ? "Cập nhật" : "Tạo mới"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Các campaign ({filteredCampaigns.length})</CardTitle>
            <Input
              placeholder="Tìm kiếm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48"
            />
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredCampaigns.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Không có campaign nào</p>
              ) : (
                filteredCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedCampaign?.id === campaign.id ? "bg-accent border-primary" : "hover:bg-accent/5"
                    }`}
                    onClick={() => setSelectedCampaign(campaign)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-sm">{campaign.id}</p>
                          <Badge className={getCampaignTypeColor(campaign.type)} variant="outline">
                            {getCampaignTypeLabel(campaign.type)}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-sm">{campaign.name}</h3>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditCampaign(campaign)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteCampaign(campaign.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                      <div className="text-muted-foreground">
                        <p>
                          {campaign.startDate} - {campaign.endDate}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            campaign.status === "ongoing"
                              ? "default"
                              : campaign.status === "completed"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {campaign.status === "ongoing"
                            ? "Đang chạy"
                            : campaign.status === "completed"
                              ? "Hoàn thành"
                              : campaign.status === "planning"
                                ? "Lên kế hoạch"
                                : "Lưu trữ"}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <p>Ngân sách: {campaign.budget.toLocaleString("vi-VN")}đ</p>
                      <p>ROI: {campaign.metrics.roi}%</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {selectedCampaign && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Chi tiết: {selectedCampaign.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Doanh thu</p>
                  <p className="text-lg font-bold">{(selectedCampaign.metrics.revenue / 1000000).toFixed(1)}M đ</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Ngân sách</p>
                  <p className="text-lg font-bold">{(selectedCampaign.budget / 1000000).toFixed(1)}M đ</p>
                </div>
                <div>
                  <p className="text-muted-foreground">ROI</p>
                  <p className="text-lg font-bold text-green-600">{selectedCampaign.metrics.roi}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">CPA</p>
                  <p className="text-lg font-bold">
                    {(selectedCampaign.metrics.costPerAcquisition / 1000).toFixed(0)}K đ
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Impressions</p>
                  <p className="font-semibold">{(selectedCampaign.metrics.impressions / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Clicks</p>
                  <p className="font-semibold">{(selectedCampaign.metrics.clicks / 1000).toFixed(1)}K</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Conversions</p>
                  <p className="font-semibold">{selectedCampaign.metrics.conversions}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">CTR</p>
                  <p className="font-semibold">
                    {((selectedCampaign.metrics.clicks / selectedCampaign.metrics.impressions) * 100).toFixed(2)}%
                  </p>
                </div>
              </div>

              <div>
                <p className="text-muted-foreground text-xs mb-2">Đối tượng: {selectedCampaign.targetAudience}</p>
                <p className="text-sm text-foreground">{selectedCampaign.description}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {selectedCampaign && (
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={conversionFunnelData} layout="vertical" margin={{ top: 5, right: 30, left: 100 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={90} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="hsl(var(--chart-1))" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Revenue vs Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={profitData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="revenue" fill="hsl(var(--chart-2))" name="Doanh thu" />
                    <Bar dataKey="cost" fill="hsl(var(--chart-3))" name="Chi phí" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">ROI %</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-5xl font-bold text-green-600 mb-2">{selectedCampaign.metrics.roi}%</p>
                <p className="text-muted-foreground">Return on Investment</p>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600 mx-auto mb-1" />
                  <p className="text-sm text-green-700">Hiệu suất tuyệt vời</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
