"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function QuoteRequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    toast({
      title: "Yêu cầu báo giá đã được gửi!",
      description: "Chúng tôi sẽ gửi báo giá chi tiết trong vòng 48 giờ",
    })
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-20">
        <Card className="mx-auto max-w-2xl text-center">
          <CardContent className="p-12">
            <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-green-600" />
            <h2 className="mb-4 text-3xl font-bold">Cảm ơn bạn!</h2>
            <p className="mb-6 text-lg text-muted-foreground">
              Yêu cầu báo giá của bạn đã được gửi thành công. Chúng tôi sẽ gửi báo giá chi tiết trong vòng 48 giờ.
            </p>
            <Button asChild>
              <a href="/">Về trang chủ</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Yêu cầu báo giá Enterprise</h1>
          <p className="text-lg text-muted-foreground">
            Cung cấp thông tin chi tiết để nhận báo giá phù hợp với nhu cầu của bạn
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Thông tin doanh nghiệp</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="contact-name">Người liên hệ *</Label>
                  <Input id="contact-name" required placeholder="Nguyễn Văn A" />
                </div>
                <div>
                  <Label htmlFor="email">Email công ty *</Label>
                  <Input id="email" type="email" required placeholder="email@company.com" />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="phone">Số điện thoại *</Label>
                  <Input id="phone" required placeholder="0912345678" />
                </div>
                <div>
                  <Label htmlFor="company">Tên công ty *</Label>
                  <Input id="company" required placeholder="Tên công ty" />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="industry">Ngành nghề</Label>
                  <Select>
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Chọn ngành" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="finance">Tài chính - Ngân hàng</SelectItem>
                      <SelectItem value="retail">Bán lẻ</SelectItem>
                      <SelectItem value="telecom">Viễn thông</SelectItem>
                      <SelectItem value="healthcare">Y tế</SelectItem>
                      <SelectItem value="education">Giáo dục</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="users">Số lượng người dùng dự kiến</Label>
                  <Input id="users" type="number" placeholder="100" />
                </div>
              </div>

              <div>
                <Label className="mb-3 block">Sản phẩm quan tâm *</Label>
                <div className="space-y-3">
                  {[
                    "VietTech CRM",
                    "VietTech Analytics",
                    "VietTech HRM",
                    "VietTech ERP",
                    "VietTech Marketing",
                    "Tất cả sản phẩm",
                  ].map((product) => (
                    <div key={product} className="flex items-center space-x-2">
                      <Checkbox id={product} />
                      <label htmlFor={product} className="text-sm font-medium leading-none cursor-pointer">
                        {product}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-3 block">Yêu cầu đặc biệt</Label>
                <div className="space-y-3">
                  {["SSO/SAML", "On-premise deployment", "Custom integrations", "Dedicated support", "SLA cao cấp"].map(
                    (req) => (
                      <div key={req} className="flex items-center space-x-2">
                        <Checkbox id={req} />
                        <label htmlFor={req} className="text-sm font-medium leading-none cursor-pointer">
                          {req}
                        </label>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="timeline">Thời gian triển khai dự kiến</Label>
                <Select>
                  <SelectTrigger id="timeline">
                    <SelectValue placeholder="Chọn thời gian" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Ngay lập tức</SelectItem>
                    <SelectItem value="1-3">1-3 tháng</SelectItem>
                    <SelectItem value="3-6">3-6 tháng</SelectItem>
                    <SelectItem value="6+">6+ tháng</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="requirements">Yêu cầu chi tiết</Label>
                <Textarea
                  id="requirements"
                  placeholder="Mô tả chi tiết về nhu cầu, quy mô, yêu cầu kỹ thuật..."
                  className="min-h-[150px]"
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu báo giá"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
