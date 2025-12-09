import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sparkles, Bug, Zap, Shield } from "lucide-react"

export const metadata = {
  title: "Changelog | VietTech",
  description: "Cập nhật tính năng và cải tiến sản phẩm mới nhất",
}

export default function ChangelogPage() {
  const releases = [
    {
      version: "3.2.0",
      date: "15 Jan 2025",
      type: "feature",
      changes: [
        {
          type: "feature",
          icon: Sparkles,
          title: "AI-powered Analytics Dashboard",
          description: "Bảng điều khiển phân tích mới với khả năng dự đoán xu hướng bằng AI",
        },
        {
          type: "feature",
          icon: Zap,
          title: "Real-time Collaboration",
          description: "Cộng tác thời gian thực với đồng nghiệp trên cùng một dự án",
        },
        {
          type: "improvement",
          icon: Zap,
          title: "Tăng tốc tải trang 40%",
          description: "Tối ưu hóa hiệu suất với lazy loading và code splitting",
        },
      ],
    },
    {
      version: "3.1.5",
      date: "2 Jan 2025",
      type: "bugfix",
      changes: [
        {
          type: "bugfix",
          icon: Bug,
          title: "Sửa lỗi export CSV",
          description: "Khắc phục vấn đề export dữ liệu lớn gây timeout",
        },
        {
          type: "security",
          icon: Shield,
          title: "Bảo mật nâng cao",
          description: "Cập nhật các dependencies và vá lỗ hổng bảo mật",
        },
      ],
    },
    {
      version: "3.1.0",
      date: "15 Dec 2024",
      type: "feature",
      changes: [
        {
          type: "feature",
          icon: Sparkles,
          title: "Dark Mode",
          description: "Hỗ trợ giao diện tối để làm việc thoải mái vào ban đêm",
        },
        {
          type: "feature",
          icon: Sparkles,
          title: "Mobile App Integration",
          description: "Tích hợp với mobile app cho iOS và Android",
        },
        {
          type: "improvement",
          icon: Zap,
          title: "Cải thiện UI/UX",
          description: "Làm mới giao diện với thiết kế hiện đại hơn",
        },
      ],
    },
    {
      version: "3.0.0",
      date: "1 Dec 2024",
      type: "major",
      changes: [
        {
          type: "feature",
          icon: Sparkles,
          title: "Architecture Redesign",
          description: "Thiết kế lại kiến trúc hoàn toàn với microservices",
        },
        {
          type: "feature",
          icon: Sparkles,
          title: "API v3",
          description: "API mới với GraphQL và REST endpoints cải tiến",
        },
        {
          type: "improvement",
          icon: Zap,
          title: "Performance Boost",
          description: "Tăng 300% tốc độ xử lý so với phiên bản cũ",
        },
      ],
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "feature":
        return "default"
      case "bugfix":
        return "destructive"
      case "major":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getChangeIcon = (type: string) => {
    switch (type) {
      case "feature":
        return Sparkles
      case "bugfix":
        return Bug
      case "security":
        return Shield
      case "improvement":
        return Zap
      default:
        return Sparkles
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4">Cập nhật liên tục</Badge>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-balance md:text-6xl">Changelog</h1>
            <p className="mb-8 text-xl text-muted-foreground leading-relaxed">
              Theo dõi các tính năng mới, cải tiến và sửa lỗi trong từng phiên bản
            </p>
          </div>
        </div>
      </section>

      {/* Changelog Timeline */}
      <section className="py-12 md:py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-8">
            {releases.map((release, index) => (
              <Card key={release.version} className="overflow-hidden">
                <CardHeader className="bg-secondary/30">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <CardTitle className="text-2xl">v{release.version}</CardTitle>
                      <Badge variant={getTypeColor(release.type)}>
                        {release.type === "major"
                          ? "Major Release"
                          : release.type === "feature"
                            ? "New Features"
                            : "Bug Fixes"}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">{release.date}</span>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {release.changes.map((change, idx) => {
                      const Icon = change.icon
                      return (
                        <div key={idx}>
                          <div className="flex gap-4">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1">{change.title}</h3>
                              <p className="text-sm text-muted-foreground leading-relaxed">{change.description}</p>
                            </div>
                          </div>
                          {idx < release.changes.length - 1 && <Separator className="mt-4" />}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-none">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Nhận thông báo cập nhật</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                Đăng ký để nhận email thông báo khi có phiên bản mới
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-background"
                />
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Đăng ký
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
