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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Clock, AlertCircle } from "lucide-react"

interface Ticket {
  id: string
  title: string
  description: string
  status: "open" | "in-progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  assignee: string
  reporter: string
  createdAt: string
  dueDate: string
  resolvedAt?: string
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "TKT-001",
      title: "Bug trong tính năng thanh toán",
      description: "Lỗi xảy ra khi thanh toán qua Stripe",
      status: "in-progress",
      priority: "urgent",
      assignee: "Nguyễn Hồng",
      reporter: "Khách hàng A",
      createdAt: "2024-12-01",
      dueDate: "2024-12-03",
    },
    {
      id: "TKT-002",
      title: "Thêm tính năng export PDF",
      description: "Khách hàng yêu cầu export đơn hàng thành PDF",
      status: "open",
      priority: "medium",
      assignee: "Trần Minh",
      reporter: "Khách hàng B",
      createdAt: "2024-12-02",
      dueDate: "2024-12-05",
    },
    {
      id: "TKT-003",
      title: "Cập nhật tài liệu API",
      description: "Tài liệu API cần được cập nhật cho v2.0",
      status: "resolved",
      priority: "low",
      assignee: "Lê Phương",
      reporter: "Team Lead",
      createdAt: "2024-11-28",
      dueDate: "2024-12-04",
      resolvedAt: "2024-12-04",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("open")
  const [filterPriority, setFilterPriority] = useState<string>("low")
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Ticket>>({
    title: "",
    description: "",
    status: "open",
    priority: "medium",
    assignee: "",
    dueDate: "",
  })

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !filterStatus || ticket.status === filterStatus
    const matchesPriority = !filterPriority || ticket.priority === filterPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleAddTicket = () => {
    if (editingId) {
      setTickets(tickets.map((t) => (t.id === editingId ? { ...t, ...formData } : t)))
      setEditingId(null)
    } else {
      const newTicket: Ticket = {
        id: `TKT-${String(tickets.length + 1).padStart(3, "0")}`,
        title: formData.title || "",
        description: formData.description || "",
        status: (formData.status as any) || "open",
        priority: (formData.priority as any) || "medium",
        assignee: formData.assignee || "",
        reporter: "Admin",
        createdAt: new Date().toISOString().split("T")[0],
        dueDate: formData.dueDate || "",
      }
      setTickets([...tickets, newTicket])
    }
    setFormData({ title: "", description: "", status: "open", priority: "medium", assignee: "", dueDate: "" })
    setIsOpen(false)
  }

  const handleEditTicket = (ticket: Ticket) => {
    setEditingId(ticket.id)
    setFormData(ticket)
    setIsOpen(true)
  }

  const handleDeleteTicket = (id: string) => {
    setTickets(tickets.filter((t) => t.id !== id))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "destructive"
      case "high":
        return "secondary"
      case "medium":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "closed":
        return "secondary"
      case "resolved":
        return "default"
      case "in-progress":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản lý Tickets</h1>
          <p className="text-muted-foreground">Theo dõi và xử lý các vấn đề từ khách hàng</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingId(null)
                setFormData({
                  title: "",
                  description: "",
                  status: "open",
                  priority: "medium",
                  assignee: "",
                  dueDate: "",
                })
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Tạo Ticket
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Chỉnh sửa Ticket" : "Tạo Ticket mới"}</DialogTitle>
              <DialogDescription>
                {editingId ? "Cập nhật thông tin ticket" : "Nhập thông tin ticket mới"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Tiêu đề</Label>
                <Input
                  id="title"
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Mô tả vấn đề..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Chi tiết vấn đề..."
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Độ ưu tiên</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Thấp</SelectItem>
                      <SelectItem value="medium">Bình thường</SelectItem>
                      <SelectItem value="high">Cao</SelectItem>
                      <SelectItem value="urgent">Khẩn cấp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Mở</SelectItem>
                      <SelectItem value="in-progress">Đang xử lý</SelectItem>
                      <SelectItem value="resolved">Đã giải quyết</SelectItem>
                      <SelectItem value="closed">Đóng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assignee">Gán cho</Label>
                  <Input
                    id="assignee"
                    value={formData.assignee || ""}
                    onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                    placeholder="Tên người xử lý"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Hạn chót</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate || ""}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleAddTicket} className="w-full">
                {editingId ? "Cập nhật" : "Tạo mới"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Danh sách Tickets</CardTitle>
          <div className="flex gap-2">
            <Input
              placeholder="Tìm kiếm ticket..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Mở</SelectItem>
                <SelectItem value="in-progress">Đang xử lý</SelectItem>
                <SelectItem value="resolved">Đã giải quyết</SelectItem>
                <SelectItem value="closed">Đóng</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Độ ưu tiên" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Thấp</SelectItem>
                <SelectItem value="medium">Bình thường</SelectItem>
                <SelectItem value="high">Cao</SelectItem>
                <SelectItem value="urgent">Khẩn cấp</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTickets.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Không có tickets phù hợp</p>
            ) : (
              filteredTickets.map((ticket) => (
                <div key={ticket.id} className="border rounded-lg p-4 hover:bg-accent/5 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-bold text-sm">{ticket.id}</p>
                        <Badge variant={getPriorityColor(ticket.priority)}>
                          {ticket.priority === "urgent" && <AlertCircle className="mr-1 h-3 w-3" />}
                          {ticket.priority === "urgent"
                            ? "Khẩn cấp"
                            : ticket.priority === "high"
                              ? "Cao"
                              : ticket.priority === "medium"
                                ? "Bình thường"
                                : "Thấp"}
                        </Badge>
                        <Badge variant={getStatusColor(ticket.status)}>
                          {ticket.status === "open"
                            ? "Mở"
                            : ticket.status === "in-progress"
                              ? "Đang xử lý"
                              : ticket.status === "resolved"
                                ? "Đã giải quyết"
                                : "Đóng"}
                        </Badge>
                      </div>
                      <h3 className="font-semibold mb-2">{ticket.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{ticket.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <p className="text-muted-foreground">Gán cho:</p>
                          <p className="font-medium">{ticket.assignee || "Chưa gán"}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Báo cáo bởi:</p>
                          <p className="font-medium">{ticket.reporter}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Tạo: {ticket.createdAt}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Hạn chót: {ticket.dueDate}
                        </div>
                        {ticket.resolvedAt && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Giải quyết: {ticket.resolvedAt}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditTicket(ticket)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteTicket(ticket.id)}>
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
    </div>
  )
}
