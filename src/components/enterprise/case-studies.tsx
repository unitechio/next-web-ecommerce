import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Clock } from "lucide-react"

export function CaseStudies() {
  const cases = [
    {
      company: "VietBank Corp",
      industry: "Ngân hàng",
      logo: "VB",
      results: [
        { label: "Tăng năng suất", value: "+45%", icon: TrendingUp },
        { label: "Tiết kiệm thời gian", value: "120h/tháng", icon: Clock },
        { label: "Người dùng", value: "2,500+", icon: Users },
      ],
      quote: "VietTech đã giúp chúng tôi tự động hóa 80% quy trình, giảm thiểu sai sót và tăng trải nghiệm khách hàng.",
      author: "Nguyễn Văn A",
      position: "CTO",
    },
    {
      company: "TeleViet",
      industry: "Viễn thông",
      logo: "TV",
      results: [
        { label: "ROI", value: "380%", icon: TrendingUp },
        { label: "Giảm chi phí", value: "-35%", icon: Clock },
        { label: "Khách hàng hài lòng", value: "98%", icon: Users },
      ],
      quote: "Nền tảng vững chắc, đội ngũ hỗ trợ tuyệt vời. Chúng tôi đã mở rộng ra 3 nước trong 6 tháng.",
      author: "Trần Thị B",
      position: "VP Operations",
    },
    {
      company: "RetailMax",
      industry: "Bán lẻ",
      logo: "RM",
      results: [
        { label: "Tăng doanh thu", value: "+52%", icon: TrendingUp },
        { label: "Tích hợp", value: "15+ hệ thống", icon: Clock },
        { label: "Cửa hàng", value: "200+", icon: Users },
      ],
      quote: "VietTech đã thống nhất toàn bộ dữ liệu của 200 cửa hàng, giúp chúng tôi ra quyết định nhanh hơn.",
      author: "Lê Văn C",
      position: "CEO",
    },
  ]

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {cases.map((study, index) => (
        <Card key={index} className="transition-all hover:shadow-xl">
          <CardContent className="p-6">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-accent text-accent-foreground">{study.logo}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{study.company}</h3>
                    <Badge variant="secondary" className="mt-1">
                      {study.industry}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-4">
              {study.results.map((result, idx) => (
                <div key={idx} className="text-center">
                  <result.icon className="mx-auto mb-1 h-5 w-5 text-accent" />
                  <div className="text-lg font-bold">{result.value}</div>
                  <div className="text-xs text-muted-foreground">{result.label}</div>
                </div>
              ))}
            </div>

            <blockquote className="mb-4 border-l-2 border-accent pl-4 italic text-muted-foreground leading-relaxed">
              "{study.quote}"
            </blockquote>

            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{study.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{study.author}</div>
                <div className="text-sm text-muted-foreground">{study.position}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
