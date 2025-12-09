import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, TrendingUp, Shield, Users, Zap, ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import { ROICalculator } from "@/components/enterprise/roi-calculator"
import { ComparisonTable } from "@/components/enterprise/comparison-table"
import { CaseStudies } from "@/components/enterprise/case-studies"

export const metadata = {
  title: "Enterprise Solutions - VietTech",
  description: "Giải pháp toàn diện cho doanh nghiệp lớn với ROI cao và hỗ trợ tận tâm",
}

export default function EnterprisePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-background py-20 md:py-32">
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 animate-fade-in" variant="secondary">
              Enterprise Solutions
            </Badge>
            <h1 className="mb-6 animate-fade-in-up text-4xl font-bold leading-tight tracking-tight text-balance md:text-6xl">
              Giải pháp doanh nghiệp toàn diện cho tổ chức lớn
            </h1>
            <p className="mb-8 animate-fade-in-up text-lg text-muted-foreground leading-relaxed md:text-xl animation-delay-100">
              Tăng trưởng bền vững với nền tảng được thiết kế cho quy mô doanh nghiệp, bảo mật cấp độ enterprise và hỗ
              trợ 24/7
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up animation-delay-200">
              <Button size="lg" asChild className="group">
                <Link href="/enterprise/demo">
                  <Play className="mr-2 h-5 w-5" />
                  Xem demo trực tiếp
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#contact-sales">Liên hệ chuyên gia</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </section>

      {/* Stats */}
      <section className="border-y bg-secondary/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { label: "Khách hàng Enterprise", value: "500+", icon: Users },
              { label: "Uptime đảm bảo", value: "99.99%", icon: Shield },
              { label: "ROI trung bình", value: "340%", icon: TrendingUp },
              { label: "Triển khai thành công", value: "98%", icon: Zap },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="mx-auto mb-2 h-8 w-8 text-accent" />
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Tính năng dành riêng cho Enterprise</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Giải pháp được thiết kế đặc biệt cho nhu cầu của tổ chức lớn
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "SSO & SAML",
                description: "Tích hợp với Okta, Azure AD, Google Workspace",
                icon: Shield,
              },
              {
                title: "API không giới hạn",
                description: "Rate limit cao, webhook tùy chỉnh",
                icon: Zap,
              },
              {
                title: "Multi-tenant",
                description: "Quản lý nhiều workspace với RBAC chi tiết",
                icon: Users,
              },
              {
                title: "Dedicated support",
                description: "CSM riêng, SLA ưu tiên, hotline 24/7",
                icon: Shield,
              },
              {
                title: "Custom deployment",
                description: "On-premise, private cloud hoặc hybrid",
                icon: TrendingUp,
              },
              {
                title: "Audit logs",
                description: "Tracking đầy đủ, compliance reports",
                icon: Shield,
              },
            ].map((feature, index) => (
              <Card key={index} className="transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <feature.icon className="mb-4 h-10 w-10 text-accent" />
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="bg-secondary/20 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Tính toán ROI của bạn</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Xem mức tiết kiệm và lợi nhuận khi sử dụng VietTech Enterprise
            </p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">So sánh gói dịch vụ</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Tìm gói phù hợp với quy mô và nhu cầu của bạn
            </p>
          </div>
          <ComparisonTable />
        </div>
      </section>

      {/* Case Studies */}
      <section className="bg-secondary/20 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Câu chuyện thành công</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Khách hàng Enterprise của chúng tôi đạt được những kết quả ấn tượng
            </p>
          </div>
          <CaseStudies />
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Tài liệu & Nguồn lực</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Enterprise Whitepaper",
                description: "Tổng quan về kiến trúc và bảo mật",
                type: "PDF • 2.4MB",
                icon: Download,
              },
              {
                title: "Security & Compliance",
                description: "SOC2, ISO 27001, GDPR compliance",
                type: "PDF • 1.8MB",
                icon: Download,
              },
              {
                title: "Implementation Guide",
                description: "Hướng dẫn triển khai từng bước",
                type: "PDF • 3.1MB",
                icon: Download,
              },
            ].map((resource, index) => (
              <Card key={index} className="transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <resource.icon className="mb-4 h-8 w-8 text-accent" />
                  <h3 className="mb-2 text-lg font-semibold">{resource.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{resource.type}</span>
                    <Button variant="ghost" size="sm">
                      Tải xuống
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="contact-sales"
        className="bg-gradient-to-br from-accent/20 via-background to-accent/20 py-20 md:py-32"
      >
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-3xl border-accent/50 bg-card/50 backdrop-blur">
            <CardContent className="p-8 md:p-12">
              <div className="text-center">
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">Sẵn sàng bắt đầu?</h2>
                <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
                  Đặt lịch với đội ngũ chuyên gia của chúng tôi để tìm hiểu cách VietTech có thể giúp tổ chức của bạn
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button size="lg" asChild>
                    <Link href="/enterprise/demo">Đặt lịch demo</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/enterprise/quote">Yêu cầu báo giá</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
