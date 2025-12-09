"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { FileText, Send, Loader2 } from "lucide-react"
import { productsData } from "@/lib/products-data"

export default function QuotePage() {
  const { items } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<number[]>(items.map((i) => i.id))
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: user?.name || "",
    email: user?.email || "",
    phone: "",
    requirements: "",
    timeline: "",
  })

  const handleGeneratePDF = async () => {
    setIsGenerating(true)

    // Simulate PDF generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Đã tạo báo giá!",
      description: "Báo giá PDF đã được tạo thành công. Đang tải xuống...",
    })

    setIsGenerating(false)

    // In a real app, this would trigger PDF download
    console.log("PDF Generated with data:", {
      ...formData,
      selectedProducts: productsData.filter((p) => selectedProducts.includes(p.id)),
    })
  }

  const handleSendEmail = async () => {
    toast({
      title: "Đã gửi báo giá!",
      description: "Báo giá đã được gửi đến email của bạn.",
    })
  }

  const totalPrice = productsData.filter((p) => selectedProducts.includes(p.id)).reduce((sum, p) => sum + p.price, 0)

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Tạo báo giá tự động</h1>
        <p className="text-muted-foreground">
          Chọn sản phẩm và điền thông tin để tạo bảng báo giá chuyên nghiệp dạng PDF
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin khách hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Tên công ty *</Label>
                  <Input
                    id="companyName"
                    placeholder="VietTech Solutions"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Người liên hệ *</Label>
                  <Input
                    id="contactPerson"
                    placeholder="Nguyễn Văn A"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại *</Label>
                  <Input
                    id="phone"
                    placeholder="0123456789"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="requirements">Yêu cầu đặc biệt</Label>
                <Textarea
                  id="requirements"
                  placeholder="Mô tả yêu cầu, nhu cầu đặc biệt của bạn..."
                  rows={4}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline">Thời gian triển khai mong muốn</Label>
                <Input
                  id="timeline"
                  placeholder="Ví dụ: Trong vòng 1 tháng"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chọn sản phẩm</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {productsData.map((product) => (
                <div key={product.id} className="flex items-start space-x-3 rounded-lg border p-4">
                  <Checkbox
                    id={`product-${product.id}`}
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedProducts([...selectedProducts, product.id])
                      } else {
                        setSelectedProducts(selectedProducts.filter((id) => id !== product.id))
                      }
                    }}
                  />
                  <div className="flex-1">
                    <Label htmlFor={`product-${product.id}`} className="cursor-pointer">
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-sm text-muted-foreground">{product.description}</div>
                      <div className="mt-2">
                        <Badge variant="secondary">{product.category}</Badge>
                        <span className="ml-2 font-bold text-accent">
                          {product.price.toLocaleString("vi-VN")}đ/tháng
                        </span>
                      </div>
                    </Label>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Tóm tắt báo giá</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Số sản phẩm đã chọn</div>
                <div className="text-2xl font-bold">{selectedProducts.length}</div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Tổng chi phí hàng tháng</div>
                <div className="text-3xl font-bold text-accent">{totalPrice.toLocaleString("vi-VN")}đ</div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Thanh toán hàng năm (Tiết kiệm 15%)</div>
                <div className="text-xl font-bold">{(totalPrice * 12 * 0.85).toLocaleString("vi-VN")}đ</div>
              </div>

              <div className="pt-4 space-y-2">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleGeneratePDF}
                  disabled={isGenerating || selectedProducts.length === 0}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Đang tạo PDF...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-5 w-5" />
                      Tạo báo giá PDF
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  size="lg"
                  onClick={handleSendEmail}
                  disabled={selectedProducts.length === 0}
                >
                  <Send className="mr-2 h-5 w-5" />
                  Gửi qua Email
                </Button>
              </div>

              <div className="pt-4 border-t text-xs text-muted-foreground space-y-1">
                <p>✓ Bao gồm thông tin chi tiết sản phẩm</p>
                <p>✓ Hình ảnh và diagram minh họa</p>
                <p>✓ Chính sách hỗ trợ và SLA</p>
                <p>✓ Thời gian triển khai dự kiến</p>
                <p>✓ Điều khoản thanh toán</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
