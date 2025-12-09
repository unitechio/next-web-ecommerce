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
import { Plus, Edit, Trash2, Mail, MessageSquare, Star } from "lucide-react"

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  message: string
  status: "new" | "replied" | "archived"
  submittedAt: string
}

interface Feedback {
  id: string
  customerName: string
  email: string
  rating: number
  message: string
  productName: string
  submittedAt: string
  status: "pending" | "reviewed" | "archived"
}

export default function ContactFeedbackPage() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "C-001",
      name: "Nguyễn Văn A",
      email: "a@example.com",
      phone: "0901234567",
      message: "Tôi muốn hỏi về giá doanh nghiệp",
      status: "new",
      submittedAt: "2024-12-05 10:30",
    },
    {
      id: "C-002",
      name: "Trần Thị B",
      email: "b@example.com",
      phone: "0909876543",
      message: "Yêu cầu tư vấn triển khai hệ thống",
      status: "replied",
      submittedAt: "2024-12-04 14:15",
    },
  ])

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: "F-001",
      customerName: "Lê Văn C",
      email: "c@example.com",
      rating: 5,
      message: "Sản phẩm tuyệt vời! Rất hài lòng với dịch vụ hỗ trợ",
      productName: "VietTech CRM",
      submittedAt: "2024-12-05",
      status: "reviewed",
    },
    {
      id: "F-002",
      customerName: "Phạm Thanh D",
      email: "d@example.com",
      rating: 4,
      message: "Sản phẩm tốt nhưng cần cải thiện giao diện",
      productName: "VietTech Analytics",
      submittedAt: "2024-12-04",
      status: "pending",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("contact")
  const [contactForm, setContactForm] = useState<Partial<Contact>>({
    name: "",
    email: "",
    phone: "",
    message: "",
    status: "new",
  })
  const [feedbackForm, setFeedbackForm] = useState<Partial<Feedback>>({
    customerName: "",
    email: "",
    rating: 5,
    message: "",
    productName: "",
    status: "pending",
  })

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredFeedbacks = feedbacks.filter(
    (feedback) =>
      feedback.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddContact = () => {
    if (editingId) {
      setContacts(contacts.map((c) => (c.id === editingId ? { ...c, ...contactForm } : c)))
      setEditingId(null)
    } else {
      const newContact: Contact = {
        id: `C-${String(contacts.length + 1).padStart(3, "0")}`,
        name: contactForm.name || "",
        email: contactForm.email || "",
        phone: contactForm.phone || "",
        message: contactForm.message || "",
        status: (contactForm.status as any) || "new",
        submittedAt: new Date().toLocaleString("vi-VN"),
      }
      setContacts([...contacts, newContact])
    }
    setContactForm({ name: "", email: "", phone: "", message: "", status: "new" })
    setIsOpen(false)
  }

  const handleAddFeedback = () => {
    if (editingId) {
      setFeedbacks(feedbacks.map((f) => (f.id === editingId ? { ...f, ...feedbackForm } : f)))
      setEditingId(null)
    } else {
      const newFeedback: Feedback = {
        id: `F-${String(feedbacks.length + 1).padStart(3, "0")}`,
        customerName: feedbackForm.customerName || "",
        email: feedbackForm.email || "",
        rating: feedbackForm.rating || 5,
        message: feedbackForm.message || "",
        productName: feedbackForm.productName || "",
        submittedAt: new Date().toISOString().split("T")[0],
        status: (feedbackForm.status as any) || "pending",
      }
      setFeedbacks([...feedbacks, newFeedback])
    }
    setFeedbackForm({
      customerName: "",
      email: "",
      rating: 5,
      message: "",
      productName: "",
      status: "pending",
    })
    setIsOpen(false)
  }

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((c) => c.id !== id))
  }

  const handleDeleteFeedback = (id: string) => {
    setFeedbacks(feedbacks.filter((f) => f.id !== id))
  }

  const handleEditContact = (contact: Contact) => {
    setActiveTab("contact")
    setEditingId(contact.id)
    setContactForm(contact)
    setIsOpen(true)
  }

  const handleEditFeedback = (feedback: Feedback) => {
    setActiveTab("feedback")
    setEditingId(feedback.id)
    setFeedbackForm(feedback)
    setIsOpen(true)
  }

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản lý Contact & Feedback</h1>
          <p className="text-muted-foreground">Quản lý liên hệ từ khách hàng và đánh giá sản phẩm</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingId(null)
                if (activeTab === "contact") {
                  setContactForm({ name: "", email: "", phone: "", message: "", status: "new" })
                } else {
                  setFeedbackForm({
                    customerName: "",
                    email: "",
                    rating: 5,
                    message: "",
                    productName: "",
                    status: "pending",
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
                {activeTab === "contact"
                  ? editingId
                    ? "Chỉnh sửa liên hệ"
                    : "Thêm liên hệ mới"
                  : editingId
                    ? "Chỉnh sửa feedback"
                    : "Thêm feedback mới"}
              </DialogTitle>
              <DialogDescription>
                {activeTab === "contact" ? "Quản lý thông tin liên hệ từ khách hàng" : "Quản lý đánh giá sản phẩm"}
              </DialogDescription>
            </DialogHeader>

            {activeTab === "contact" ? (
              <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ tên</Label>
                  <Input
                    id="name"
                    value={contactForm.name || ""}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactForm.email || ""}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="a@example.com"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="phone">Điện thoại</Label>
                  <Input
                    id="phone"
                    value={contactForm.phone || ""}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="0901234567"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="message">Nội dung</Label>
                  <Textarea
                    id="message"
                    value={contactForm.message || ""}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Nội dung liên hệ..."
                    rows={4}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <select
                    id="status"
                    value={contactForm.status || "new"}
                    onChange={(e) => setContactForm({ ...contactForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="new">Mới</option>
                    <option value="replied">Đã trả lời</option>
                    <option value="archived">Lưu trữ</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Tên khách hàng</Label>
                  <Input
                    id="customerName"
                    value={feedbackForm.customerName || ""}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, customerName: e.target.value })}
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email2">Email</Label>
                  <Input
                    id="email2"
                    type="email"
                    value={feedbackForm.email || ""}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                    placeholder="a@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productName">Sản phẩm</Label>
                  <Input
                    id="productName"
                    value={feedbackForm.productName || ""}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, productName: e.target.value })}
                    placeholder="VietTech CRM"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Xếp hạng (1-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={feedbackForm.rating || 5}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, rating: Number(e.target.value) })}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="message2">Nội dung đánh giá</Label>
                  <Textarea
                    id="message2"
                    value={feedbackForm.message || ""}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                    placeholder="Đánh giá chi tiết..."
                    rows={4}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="status2">Trạng thái</Label>
                  <select
                    id="status2"
                    value={feedbackForm.status || "pending"}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="pending">Chờ duyệt</option>
                    <option value="reviewed">Đã duyệt</option>
                    <option value="archived">Lưu trữ</option>
                  </select>
                </div>
              </div>
            )}

            <Button onClick={activeTab === "contact" ? handleAddContact : handleAddFeedback} className="w-full mt-4">
              {editingId ? "Cập nhật" : "Thêm mới"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="contact" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="contact">
            <Mail className="mr-2 h-4 w-4" />
            Contact Us
          </TabsTrigger>
          <TabsTrigger value="feedback">
            <MessageSquare className="mr-2 h-4 w-4" />
            Feedback
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Danh sách liên hệ ({filteredContacts.length})</CardTitle>
              <Input
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredContacts.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Không có liên hệ nào</p>
                ) : (
                  filteredContacts.map((contact) => (
                    <div key={contact.id} className="border rounded-lg p-4 hover:bg-accent/5 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="font-bold">{contact.id}</p>
                            <Badge
                              variant={
                                contact.status === "new"
                                  ? "destructive"
                                  : contact.status === "replied"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {contact.status === "new"
                                ? "Mới"
                                : contact.status === "replied"
                                  ? "Đã trả lời"
                                  : "Lưu trữ"}
                            </Badge>
                          </div>
                          <h3 className="font-semibold">{contact.name}</h3>
                          <div className="text-sm text-muted-foreground mb-2">
                            <p>Email: {contact.email}</p>
                            <p>Điện thoại: {contact.phone}</p>
                            <p>Ngày: {contact.submittedAt}</p>
                          </div>
                          <p className="text-sm">{contact.message}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditContact(contact)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteContact(contact.id)}>
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

        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Danh sách feedback ({filteredFeedbacks.length})</CardTitle>
              <Input
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredFeedbacks.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Không có feedback nào</p>
                ) : (
                  filteredFeedbacks.map((feedback) => (
                    <div key={feedback.id} className="border rounded-lg p-4 hover:bg-accent/5 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="font-bold">{feedback.id}</p>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <Badge
                              variant={
                                feedback.status === "pending"
                                  ? "secondary"
                                  : feedback.status === "reviewed"
                                    ? "default"
                                    : "outline"
                              }
                            >
                              {feedback.status === "pending"
                                ? "Chờ duyệt"
                                : feedback.status === "reviewed"
                                  ? "Đã duyệt"
                                  : "Lưu trữ"}
                            </Badge>
                          </div>
                          <h3 className="font-semibold">{feedback.customerName}</h3>
                          <div className="text-sm text-muted-foreground mb-2">
                            <p>Sản phẩm: {feedback.productName}</p>
                            <p>Email: {feedback.email}</p>
                            <p>Ngày: {feedback.submittedAt}</p>
                          </div>
                          <p className="text-sm">{feedback.message}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditFeedback(feedback)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteFeedback(feedback.id)}>
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
