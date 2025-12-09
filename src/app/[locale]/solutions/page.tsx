import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Smartphone, ShoppingBag, Heart, Landmark, Factory, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Giải pháp theo ngành | VietTech",
  description: "Giải pháp công nghệ được tùy chỉnh cho từng ngành nghề cụ thể",
}

export default function SolutionsPage() {
  const industries = [
    {
      icon: Building2,
      name: "Bất động sản",
      slug: "real-estate",
      description: "Quản lý dự án, khách hàng và giao dịch BĐS hiệu quả",
      benefits: ["CRM chuyên biệt", "Quản lý lead tự động", "Portal khách hàng", "Báo cáo chi tiết"],
      caseStudy: "Vingroup tăng 45% tỷ lệ chuyển đổi",
    },
    {
      icon: Smartphone,
      name: "Viễn thông",
      slug: "telecom",
      description: "Nền tảng quản lý thuê bao và dịch vụ telco",
      benefits: ["Billing tự động", "Quản lý thuê bao", "Analytics dữ liệu", "Customer care 24/7"],
      caseStudy: "Viettel giảm 60% thời gian xử lý",
    },
    {
      icon: ShoppingBag,
      name: "Bán lẻ",
      slug: "retail",
      description: "Giải pháp omnichannel và quản lý chuỗi bán lẻ",
      benefits: ["POS tích hợp", "Quản lý kho", "Loyalty program", "Analytics bán hàng"],
      caseStudy: "Mobile World tăng 35% doanh thu",
    },
    {
      icon: Heart,
      name: "Y tế",
      slug: "healthcare",
      description: "Hệ thống quản lý bệnh viện và hồ sơ bệnh án điện tử",
      benefits: ["EMR/EHR", "Đặt lịch khám", "Quản lý thuốc", "Bảo mật cao"],
      caseStudy: "Vinmec nâng cao 80% trải nghiệm",
    },
    {
      icon: Landmark,
      name: "Tài chính - Ngân hàng",
      slug: "finance",
      description: "Core banking và fintech solutions",
      benefits: ["Digital banking", "Risk management", "Compliance", "Fraud detection"],
      caseStudy: "Techcombank số hóa 100% quy trình",
    },
    {
      icon: Factory,
      name: "Sản xuất",
      slug: "manufacturing",
      description: "ERP và MES cho nhà máy thông minh",
      benefits: ["Production planning", "Quality control", "Supply chain", "IoT integration"],
      caseStudy: "Vinfast tối ưu 50% hiệu suất",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4">Giải pháp chuyên biệt</Badge>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-balance md:text-6xl">
              Giải pháp cho từng ngành nghề
            </h1>
            <p className="mb-8 text-xl text-muted-foreground leading-relaxed">
              Chúng tôi hiểu rõ nhu cầu riêng của từng ngành và cung cấp giải pháp được tùy chỉnh phù hợp
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-12 md:py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => {
              const Icon = industry.icon
              return (
                <Card key={industry.slug} className="hover:shadow-lg transition-all hover:scale-105">
                  <CardHeader>
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 mb-4">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{industry.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{industry.description}</p>
                    <div className="space-y-2 mb-6">
                      {industry.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-accent/10 p-4 rounded-lg mb-4">
                      <p className="text-sm font-semibold text-accent">{industry.caseStudy}</p>
                    </div>
                    <Button className="w-full" asChild>
                      <Link href={`/solutions/${industry.slug}`}>
                        Tìm hiểu thêm
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tại sao chọn VietTech?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Chúng tôi không chỉ cung cấp công nghệ, mà còn là đối tác chiến lược trong hành trình chuyển đổi số
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Chuyên môn sâu",
                description: "10+ năm kinh nghiệm triển khai cho các doanh nghiệp lớn tại Việt Nam",
              },
              {
                title: "Tùy chỉnh linh hoạt",
                description: "Giải pháp được thiết kế riêng cho quy trình và văn hóa doanh nghiệp của bạn",
              },
              {
                title: "Hỗ trợ tận tâm",
                description: "Đội ngũ hỗ trợ 24/7 với thời gian phản hồi dưới 30 phút",
              },
            ].map((feature, idx) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-none">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Sẵn sàng bắt đầu?</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                Đặt lịch tư vấn miễn phí với chuyên gia của chúng tôi để tìm hiểu giải pháp phù hợp
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button size="lg" asChild>
                  <Link href="/enterprise/demo">Đặt lịch demo</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/enterprise/quote">Yêu cầu báo giá</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
