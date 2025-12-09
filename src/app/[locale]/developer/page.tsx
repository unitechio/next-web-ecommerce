"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code2, BookOpen, Globe, Zap, Shield, Users } from "lucide-react"
import Link from "next/link"

export default function DeveloperDocsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="secondary">
              Developer Docs
            </Badge>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-balance md:text-5xl">
              API Documentation & Resources
            </h1>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed md:text-xl">
              Hướng dẫn toàn diện để tích hợp VietTech vào ứng dụng của bạn. Bắt đầu ngay hôm nay!
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button className="gap-2">
                <Code2 className="h-4 w-4" />
                Bắt đầu với API
              </Button>
              <Button variant="outline" asChild>
                <Link href="#documentation">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Xem tài liệu
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Khởi động nhanh</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Globe,
                title: "REST API",
                description: "API RESTful đầy đủ với JSON responses",
                link: "#rest-api",
              },
              {
                icon: Zap,
                title: "Webhooks",
                description: "Nhận thông báo real-time từ VietTech",
                link: "#webhooks",
              },
              {
                icon: Shield,
                title: "Authentication",
                description: "OAuth 2.0 và API Key authentication",
                link: "#auth",
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <Link key={index} href={feature.link}>
                  <Card className="h-full transition-all hover:shadow-lg hover:border-accent/50 cursor-pointer">
                    <CardContent className="pt-6">
                      <Icon className="mb-4 h-8 w-8 text-accent" />
                      <h3 className="mb-2 font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section id="documentation" className="bg-secondary/20 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-3xl font-bold">Tài liệu API</h2>

          <Tabs defaultValue="rest" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="rest">REST API</TabsTrigger>
              <TabsTrigger value="webhook">Webhooks</TabsTrigger>
              <TabsTrigger value="sdk">SDKs</TabsTrigger>
            </TabsList>

            <TabsContent value="rest" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>GET /api/products</CardTitle>
                  <CardDescription>Lấy danh sách tất cả sản phẩm</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Query Parameters:</h4>
                      <div className="bg-secondary/50 p-3 rounded text-sm font-mono">
                        <div>page: number - Số trang (mặc định: 1)</div>
                        <div>limit: number - Số sản phẩm/trang (mặc định: 20)</div>
                        <div>category: string - Lọc theo danh mục</div>
                        <div>search: string - Tìm kiếm sản phẩm</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Example Response:</h4>
                      <pre className="bg-secondary/50 p-4 rounded text-sm overflow-x-auto">
                        {`{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "VietTech CRM",
      "price": 1275000,
      "category": "Quản lý khách hàng",
      "featured": true
    }
  ],
  "pagination": {
    "page": 1,
    "total": 50,
    "limit": 20
  }
}`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>POST /api/orders</CardTitle>
                  <CardDescription>Tạo đơn hàng mới</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Request Body:</h4>
                      <pre className="bg-secondary/50 p-4 rounded text-sm overflow-x-auto">
                        {`{
  "customer_id": "cust_123",
  "items": [
    {
      "product_id": 1,
      "quantity": 1,
      "price": 1275000
    }
  ],
  "payment_method": "card",
  "shipping_address": {
    "street": "123 Main St",
    "city": "HCMC",
    "country": "Vietnam"
  }
}`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>GET /api/customers/:id</CardTitle>
                  <CardDescription>Lấy thông tin khách hàng</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-secondary/50 p-4 rounded text-sm">
                    <p className="mb-3">
                      <strong>Path Parameter:</strong> id (string) - ID khách hàng
                    </p>
                    <p>
                      <strong>Authentication:</strong> Bearer token hoặc API Key required
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="webhook" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Webhook Events</CardTitle>
                  <CardDescription>VietTech gửi webhook cho các sự kiện quan trọng</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { event: "order.created", description: "Đơn hàng mới được tạo" },
                    { event: "order.paid", description: "Đơn hàng đã thanh toán" },
                    { event: "order.shipped", description: "Đơn hàng đã gửi" },
                    { event: "customer.created", description: "Khách hàng mới đăng ký" },
                  ].map((webhook, i) => (
                    <div key={i} className="border-b last:border-b-0 pb-4 last:pb-0">
                      <p className="font-mono text-sm font-semibold text-accent">{webhook.event}</p>
                      <p className="text-sm text-muted-foreground">{webhook.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sdk" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Official SDKs</CardTitle>
                  <CardDescription>Chúng tôi cung cấp SDK chính thức cho các ngôn ngữ phổ biến</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      { lang: "Python", url: "https://pypi.org/project/viettech/" },
                      { lang: "Node.js", url: "https://www.npmjs.com/package/viettech" },
                      { lang: "PHP", url: "https://packagist.org/packages/viettech/sdk" },
                      { lang: "Java", url: "https://mvnrepository.com/artifact/com.viettech/sdk" },
                    ].map((sdk, i) => (
                      <Link key={i} href={sdk.url} target="_blank">
                        <div className="border border-border/50 rounded-lg p-4 hover:border-accent/50 transition-colors">
                          <p className="font-semibold">{sdk.lang}</p>
                          <p className="text-sm text-muted-foreground">npm / pip / composer / maven</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Support & Resources */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-3xl font-bold">Hỗ trợ & Tài nguyên</h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Users,
                title: "Community Forum",
                description: "Thảo luận với các developer khác",
              },
              {
                icon: BookOpen,
                title: "Tutorials & Guides",
                description: "Hướng dẫn từng bước cho các trường hợp sử dụng",
              },
              {
                icon: Code2,
                title: "Code Examples",
                description: "Ví dụ mã hoàn chỉnh cho tất cả các tính năng",
              },
              {
                icon: Zap,
                title: "Status Page",
                description: "Theo dõi trạng thái hệ thống VietTech API",
              },
            ].map((resource, i) => {
              const Icon = resource.icon
              return (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <Icon className="mb-4 h-8 w-8 text-accent" />
                    <h3 className="mb-2 font-semibold">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-r from-primary via-primary/80 to-primary/60">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-accent/20 to-transparent p-12 text-center backdrop-blur-sm border border-accent/20">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl text-primary-foreground text-balance">
              Sẵn sàng tích hợp?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-primary-foreground/90">
              Nhận khóa API miễn phí và bắt đầu xây dựng với VietTech ngay hôm nay. Hỗ trợ 24/7 từ đội ngũ của chúng
              tôi.
            </p>
            <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Lấy khóa API miễn phí
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
