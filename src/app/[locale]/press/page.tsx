import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, ExternalLink, Calendar, Building2 } from "lucide-react"

export const metadata = {
  title: "Press & Awards | VietTech",
  description: "Tin tức báo chí và giải thưởng của VietTech",
}

export default function PressPage() {
  const awards = [
    {
      title: "Top 10 Startup Công nghệ 2024",
      organization: "Vietnam Tech Awards",
      year: "2024",
      image: "/abstract-geometric-shapes.png",
    },
    {
      title: "Best B2B SaaS Platform",
      organization: "Asia SaaS Conference",
      year: "2024",
      image: "/ai-business-concept.png",
    },
    {
      title: "Innovation Award",
      organization: "Vietnam Digital Transformation Forum",
      year: "2023",
      image: "/digital-transformation-concept.png",
    },
    {
      title: "Customer Choice Award",
      organization: "G2 Crowd",
      year: "2023",
      image: "/analytics-dashboard.png",
    },
  ]

  const pressReleases = [
    {
      title: "VietTech ra mắt nền tảng AI Analytics mới",
      date: "15 Jan 2025",
      excerpt:
        "VietTech công bố nền tảng phân tích dữ liệu dựa trên AI giúp doanh nghiệp đưa ra quyết định chính xác hơn",
      source: "VnExpress",
    },
    {
      title: "VietTech huy động 50 triệu USD vòng Series B",
      date: "10 Dec 2024",
      excerpt: "Startup công nghệ VietTech hoàn tất vòng gọi vốn Series B với sự tham gia của các quỹ đầu tư hàng đầu",
      source: "Tech in Asia",
    },
    {
      title: "Đối tác chiến lược với Microsoft Azure",
      date: "20 Nov 2024",
      excerpt: "VietTech trở thành đối tác Gold của Microsoft Azure để cung cấp giải pháp cloud tốt nhất",
      source: "ICT News",
    },
  ]

  const mediaLogos = [
    { name: "VnExpress", logo: "/placeholder-logo.svg" },
    { name: "Tech in Asia", logo: "/placeholder-logo.svg" },
    { name: "ICT News", logo: "/placeholder-logo.svg" },
    { name: "Forbes Vietnam", logo: "/placeholder-logo.svg" },
    { name: "Vietnam Investment Review", logo: "/placeholder-logo.svg" },
    { name: "E27", logo: "/placeholder-logo.svg" },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4">Tin tức & Giải thưởng</Badge>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-balance md:text-6xl">
              Press & Awards
            </h1>
            <p className="mb-8 text-xl text-muted-foreground leading-relaxed">
              Những thành tựu và sự công nhận từ cộng đồng công nghệ
            </p>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-12 md:py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Giải thưởng</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">Những vinh dự chúng tôi tự hào đạt được</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {awards.map((award, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-square overflow-hidden bg-secondary/20">
                  <img
                    src={award.image || "/placeholder.svg"}
                    alt={award.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="mb-2">{award.year}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10 mb-4">
                    <Award className="h-6 w-6 text-yellow-500" />
                  </div>
                  <h3 className="font-semibold mb-2 text-lg leading-snug">{award.title}</h3>
                  <p className="text-sm text-muted-foreground">{award.organization}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tin tức gần đây</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">Cập nhật mới nhất về VietTech</p>
          </div>
          <div className="mx-auto max-w-4xl space-y-6">
            {pressReleases.map((release, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <Badge variant="outline">{release.source}</Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {release.date}
                        </span>
                      </div>
                      <h3 className="font-semibold text-xl mb-2">{release.title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{release.excerpt}</p>
                      <Button variant="link" className="p-0 h-auto">
                        Đọc thêm
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-12 md:py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Đưa tin bởi</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              VietTech được đề cập trên các phương tiện truyền thông hàng đầu
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {mediaLogos.map((media, index) => (
              <div key={index} className="flex items-center justify-center">
                <img
                  src={media.logo || "/placeholder.svg"}
                  alt={media.name}
                  className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit CTA */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-none">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Media Kit</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                Tải xuống logo, ảnh và tài liệu dành cho báo chí
              </p>
              <Button size="lg">Tải Media Kit</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
