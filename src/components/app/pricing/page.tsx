import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Bảng giá - VietTech",
  description: "Chọn gói dịch vụ phù hợp với nhu cầu của bạn",
}

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "500,000",
      description: "Hoàn hảo cho các doanh nghiệp nhỏ và startup",
      features: [
        { text: "5 người dùng", included: true },
        { text: "Lưu trữ 10GB", included: true },
        { text: "Hỗ trợ email", included: true },
        { text: "Báo cáo cơ bản", included: true },
        { text: "Tích hợp API", included: false },
        { text: "Hỗ trợ 24/7", included: false },
        { text: "Đào tạo chuyên sâu", included: false },
        { text: "Custom branding", included: false },
      ],
      featured: false,
    },
    {
      name: "Professional",
      price: "1,500,000",
      description: "Dành cho các doanh nghiệp đang phát triển",
      features: [
        { text: "20 người dùng", included: true },
        { text: "Lưu trữ 100GB", included: true },
        { text: "Hỗ trợ email & chat", included: true },
        { text: "Báo cáo nâng cao", included: true },
        { text: "Tích hợp API", included: true },
        { text: "Hỗ trợ 24/7", included: true },
        { text: "Đào tạo chuyên sâu", included: false },
        { text: "Custom branding", included: false },
      ],
      featured: true,
    },
    {
      name: "Enterprise",
      price: "Liên hệ",
      description: "Giải pháp toàn diện cho doanh nghiệp lớn",
      features: [
        { text: "Không giới hạn người dùng", included: true },
        { text: "Lưu trữ không giới hạn", included: true },
        { text: "Hỗ trợ ưu tiên", included: true },
        { text: "Báo cáo tùy chỉnh", included: true },
        { text: "Tích hợp API", included: true },
        { text: "Hỗ trợ 24/7", included: true },
        { text: "Đào tạo chuyên sâu", included: true },
        { text: "Custom branding", included: true },
      ],
      featured: false,
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-secondary/20 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="secondary">
              Bảng giá
            </Badge>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-balance md:text-5xl">
              Chọn gói dịch vụ phù hợp với bạn
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed md:text-xl">
              Linh hoạt, minh bạch và không có chi phí ẩn. Nâng cấp hoặc hạ cấp bất cứ lúc nào.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden transition-all hover:shadow-xl ${
                  plan.featured ? "border-accent shadow-lg scale-105" : ""
                }`}
              >
                {plan.featured && (
                  <div className="absolute right-0 top-0 bg-accent px-4 py-1 text-sm font-semibold text-accent-foreground">
                    Phổ biến nhất
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                    <p className="text-muted-foreground leading-relaxed">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    {plan.price === "Liên hệ" ? (
                      <div className="text-3xl font-bold">Liên hệ</div>
                    ) : (
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="ml-2 text-muted-foreground">đ/tháng</span>
                      </div>
                    )}
                  </div>

                  <Button className="mb-8 w-full" variant={plan.featured ? "default" : "outline"} size="lg" asChild>
                    <Link href="/contact">{plan.price === "Liên hệ" ? "Liên hệ bán hàng" : "Bắt đầu dùng thử"}</Link>
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="h-5 w-5 flex-shrink-0 text-accent" />
                        ) : (
                          <X className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                        )}
                        <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary/20 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Câu hỏi thường gặp</h2>
            <div className="space-y-6">
              {[
                {
                  question: "Tôi có thể thay đổi gói dịch vụ không?",
                  answer:
                    "Có, bạn có thể nâng cấp hoặc hạ cấp gói dịch vụ bất cứ lúc nào. Thay đổi sẽ có hiệu lực ngay lập tức.",
                },
                {
                  question: "Có cam kết thời gian sử dụng tối thiểu không?",
                  answer:
                    "Không có cam kết dài hạn. Bạn có thể hủy bất cứ lúc nào và chỉ trả tiền cho thời gian đã sử dụng.",
                },
                {
                  question: "Các phương thức thanh toán được chấp nhận?",
                  answer: "Chúng tôi chấp nhận chuyển khoản ngân hàng, thẻ tín dụng/ghi nợ và các ví điện tử phổ biến.",
                },
                {
                  question: "Có hỗ trợ dùng thử miễn phí không?",
                  answer: "Có, tất cả các gói đều có 14 ngày dùng thử miễn phí, không cần thẻ tín dụng.",
                },
              ].map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-lg font-semibold">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
