"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Upload, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { useToast } from "@/hooks/use-toast"

export default function DemoRequestPage() {
  const [date, setDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    toast({
      title: "Yêu cầu đã được gửi!",
      description: "Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ",
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
              Yêu cầu demo của bạn đã được gửi thành công. Đội ngũ chuyên gia của chúng tôi sẽ liên hệ với bạn trong
              vòng 24 giờ.
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
          <h1 className="mb-4 text-4xl font-bold">Đặt lịch demo trực tiếp</h1>
          <p className="text-lg text-muted-foreground">
            Hãy để chuyên gia của chúng tôi hướng dẫn bạn qua các tính năng Enterprise
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Thông tin đặt lịch</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Họ và tên *</Label>
                  <Input id="name" required placeholder="Nguyễn Văn A" />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" required placeholder="email@company.com" />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="phone">Số điện thoại *</Label>
                  <Input id="phone" required placeholder="0912345678" />
                </div>
                <div>
                  <Label htmlFor="company">Công ty *</Label>
                  <Input id="company" required placeholder="Tên công ty" />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="role">Vị trí công việc</Label>
                  <Select>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Chọn vị trí" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ceo">CEO/Founder</SelectItem>
                      <SelectItem value="cto">CTO/Tech Lead</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="employees">Số lượng nhân viên</Label>
                  <Select>
                    <SelectTrigger id="employees">
                      <SelectValue placeholder="Chọn quy mô" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-50">1-50</SelectItem>
                      <SelectItem value="51-200">51-200</SelectItem>
                      <SelectItem value="201-500">201-500</SelectItem>
                      <SelectItem value="500+">500+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Ngày mong muốn</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: vi }) : <span>Chọn ngày</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="message">Ghi chú hoặc câu hỏi</Label>
                <Textarea
                  id="message"
                  placeholder="Cho chúng tôi biết những gì bạn quan tâm..."
                  className="min-h-[120px]"
                />
              </div>

              <div>
                <Label htmlFor="rfp">Tải lên RFP/Tài liệu (tùy chọn)</Label>
                <div className="mt-2 flex items-center gap-4">
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    <Upload className="mr-2 h-4 w-4" />
                    Chọn file
                  </Button>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">PDF, DOC, DOCX - Tối đa 10MB</p>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Đang gửi..." : "Đặt lịch demo"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
