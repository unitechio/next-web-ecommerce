import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Video, Download, BookOpen, Search, Calendar } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Tài nguyên | VietTech",
  description: "Whitepapers, webinars, datasheets và tài liệu hướng dẫn cho doanh nghiệp",
}

export default function ResourcesPage() {
  const whitepapers = [
    {
      title: "Chuyển đổi số trong doanh nghiệp Việt Nam 2024",
      description: "Nghiên cứu chuyên sâu về xu hướng chuyển đổi số và cách thức áp dụng hiệu quả",
      category: "Digital Transformation",
      pages: 45,
      date: "Dec 2024",
    },
    {
      title: "ROI của việc đầu tư vào hệ thống CRM",
      description: "Phân tích chi tiết lợi ích đầu tư và các chỉ số đo lường hiệu quả",
      category: "CRM Strategy",
      pages: 32,
      date: "Nov 2024",
    },
    {
      title: "Bảo mật dữ liệu trong thời đại Cloud",
      description: "Hướng dẫn toàn diện về bảo mật dữ liệu và tuân thủ quy định",
      category: "Security",
      pages: 56,
      date: "Oct 2024",
    },
  ]

  const webinars = [
    {
      title: "Tối ưu hóa quy trình bán hàng với AI",
      speaker: "Nguyễn Văn A - CEO VietTech",
      duration: "45 phút",
      date: "15 Jan 2025",
      thumbnail: "/ai-business-concept.png",
    },
    {
      title: "Xây dựng văn hóa data-driven trong tổ chức",
      speaker: "Trần Thị B - Head of Analytics",
      duration: "60 phút",
      date: "20 Jan 2025",
      thumbnail: "/data-analytics-visualization.png",
    },
    {
      title: "Enterprise Security Best Practices",
      speaker: "Lê Văn C - Security Expert",
      duration: "50 phút",
      date: "25 Jan 2025",
      thumbnail: "/cybersecurity-network.png",
    },
  ]

  const datasheets = [
    {
      name: "VietTech CRM Datasheet",
      description: "Thông số kỹ thuật và tính năng chi tiết",
      size: "2.5 MB",
      format: "PDF",
    },
    {
      name: "VietTech Analytics Technical Specs",
      description: "Kiến trúc hệ thống và khả năng tích hợp",
      size: "3.1 MB",
      format: "PDF",
    },
    {
      name: "VietTech ERP Implementation Guide",
      description: "Hướng dẫn triển khai và cấu hình",
      size: "4.8 MB",
      format: "PDF",
    },
  ]

  const caseStudies = [
    {
      company: "VinGroup",
      industry: "Tập đoàn đa ngành",
      result: "Tăng 45% hiệu suất bán hàng",
      image: "/digital-transformation-concept.png",
    },
    {
      company: "Viettel",
      industry: "Viễn thông",
      result: "Giảm 60% thời gian xử lý đơn hàng",
      image: "/cloud-computing-concept.png",
    },
    {
      company: "FPT",
      industry: "Công nghệ",
      result: "Nâng cao 80% độ hài lòng khách hàng",
      image: "/analytics-dashboard.png",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4">Trung tâm tri thức</Badge>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-balance md:text-6xl">
              Tài nguyên & Học liệu
            </h1>
            <p className="mb-8 text-xl text-muted-foreground leading-relaxed">
              Truy cập whitepapers, webinars, case studies và datasheets để hiểu rõ hơn về giải pháp của chúng tôi
            </p>
            <div className="flex gap-4 max-w-2xl mx-auto">
              <Input placeholder="Tìm kiếm tài liệu, video, case study..." className="flex-1" />
              <Button size="lg">
                <Search className="mr-2 h-5 w-5" />
                Tìm kiếm
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Tabs */}
      <section className="py-12 md:py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="whitepapers" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
              <TabsTrigger value="whitepapers">Whitepapers</TabsTrigger>
              <TabsTrigger value="webinars">Webinars</TabsTrigger>
              <TabsTrigger value="datasheets">Datasheets</TabsTrigger>
              <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
            </TabsList>

            <TabsContent value="whitepapers" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {whitepapers.map((paper, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="secondary" className="w-fit mb-2">
                        {paper.category}
                      </Badge>
                      <CardTitle className="text-xl">{paper.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{paper.description}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <span>{paper.pages} trang</span>
                        <span>{paper.date}</span>
                      </div>
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Tải xuống
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="webinars" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {webinars.map((webinar, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-video overflow-hidden bg-secondary/20">
                      <img
                        src={webinar.thumbnail || "/placeholder.svg"}
                        alt={webinar.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90">
                          <Video className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{webinar.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">{webinar.speaker}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Video className="h-4 w-4" />
                          {webinar.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {webinar.date}
                        </span>
                      </div>
                      <Button className="w-full bg-transparent" variant="outline">
                        Đăng ký tham gia
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="datasheets" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {datasheets.map((sheet, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
                        <FileText className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="font-semibold mb-2 text-lg">{sheet.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{sheet.description}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <Badge variant="outline">{sheet.format}</Badge>
                        <span>{sheet.size}</span>
                      </div>
                      <Button className="w-full" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Tải xuống
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="case-studies" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {caseStudies.map((study, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-video overflow-hidden bg-secondary/20">
                      <img
                        src={study.image || "/placeholder.svg"}
                        alt={study.company}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-2">
                        {study.industry}
                      </Badge>
                      <h3 className="font-bold text-xl mb-2">{study.company}</h3>
                      <p className="text-accent font-semibold mb-4">{study.result}</p>
                      <Button variant="outline" className="w-full bg-transparent">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Đọc case study
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-none">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Cần tư vấn chuyên sâu?</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                Đội ngũ chuyên gia của chúng tôi sẵn sàng giúp bạn tìm ra giải pháp phù hợp nhất
              </p>
              <Button size="lg" asChild>
                <Link href="/contact">Liên hệ ngay</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
