import { ArrowRight, Zap, Shield, TrendingUp, Users, Globe, Smartphone, Play } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-40">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-block">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                <Zap className="h-4 w-4" />
                Nền tảng công nghệ hàng đầu 2025
              </span>
            </div>
            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-balance md:text-7xl animate-fade-in-up">
              Giải pháp công nghệ{" "}
              <span className="bg-gradient-to-r from-accent via-accent/80 to-accent/60 bg-clip-text text-transparent">
                toàn diện
              </span>{" "}
              cho doanh nghiệp
            </h1>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed animate-fade-in-up md:text-xl">
              Tối ưu hóa quy trình, tăng năng suất, và thúc đẩy tăng trưởng bền vững với công nghệ AI và cloud hiện đại.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up">
              <button className="group relative inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-accent-foreground font-medium transition-all hover:shadow-lg hover:shadow-accent/30">
                Bắt đầu miễn phí
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="group inline-flex items-center gap-3 rounded-full bg-secondary px-8 py-3 font-medium transition-all hover:bg-secondary/80">
                <Play className="h-5 w-5 fill-accent text-accent" />
                Xem demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl text-balance">Tại sao chọn VietTech?</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Chúng tôi cung cấp giải pháp toàn diện với công nghệ tiên tiến nhất cho doanh nghiệp hiện đại.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "Hiệu suất cao",
                description: "Tối ưu hóa tốc độ với công nghệ cloud hiện đại, xử lý tức thời.",
              },
              {
                icon: Shield,
                title: "Bảo mật tuyệt đối",
                description: "Mã hóa end-to-end, tuân thủ ISO 27001 và tiêu chuẩn quốc tế.",
              },
              {
                icon: TrendingUp,
                title: "Tăng trưởng bền vững",
                description: "Mở rộng quy mô dễ dàng theo nhu cầu của doanh nghiệp.",
              },
              {
                icon: Users,
                title: "Hợp tác hiệu quả",
                description: "Công cụ cộng tác nhóm mạnh mẽ, tăng năng suất 40%.",
              },
              {
                icon: Globe,
                title: "Đa nền tảng",
                description: "Truy cập mọi lúc mọi nơi từ mọi thiết bị, hoàn toàn đồng bộ.",
              },
              {
                icon: Smartphone,
                title: "Giao diện tối ưu",
                description: "Thiết kế hiện đại, UX tuyệt vời, dễ sử dụng cho mọi đối tượng.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group rounded-lg border border-border/50 bg-card p-8 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl text-balance">Khách hàng nói gì về chúng tôi?</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Hàng nghìn doanh nghiệp đã tin tưởng VietTech để tăng trưởng và phát triển bền vững.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Nguyễn Văn A",
                role: "CEO - TechCorp Vietnam",
                company: "Công ty Cổ phần Công nghệ",
                testimonial:
                  "VietTech CRM đã giúp team sales của chúng tôi tăng productivity 40% chỉ trong 2 tháng. Công cụ tuyệt vời!",
                rating: 5,
              },
              {
                name: "Trần Thị B",
                role: "Sales Manager - E-commerce Plus",
                company: "E-commerce Plus",
                testimonial:
                  "Marketing Automation của VietTech tiết kiệm cho chúng tôi 5 tiếng làm việc mỗi ngày. ROI thực sự tuyệt vời!",
                rating: 5,
              },
              {
                name: "Lê Văn C",
                role: "Director - Manufacturing Pro",
                company: "Manufacturing Pro",
                testimonial:
                  "ERP VietTech tích hợp tốt, dễ sử dụng. Quản lý inventory hiệu quả hơn 30% so với hệ thống cũ.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="rounded-lg border border-border/50 bg-card p-8">
                <div className="mb-4 flex gap-1">
                  {"⭐".split("").map((_, i) => (
                    <span key={i}>{"⭐".repeat(testimonial.rating)}</span>
                  ))}
                </div>
                <p className="mb-6 leading-relaxed text-muted-foreground italic">"{testimonial.testimonial}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-accent">{testimonial.role}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="bg-secondary/20 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl text-balance">Áp dụng cho mọi ngành</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              VietTech được sử dụng bởi các doanh nghiệp từ nhiều ngành khác nhau.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "🏢", name: "Bất động sản", description: "Quản lý dự án, khách hàng, hợp đồng" },
              { icon: "🏭", name: "Sản xuất", description: "Lên kế hoạch sản xuất, quản lý kho" },
              { icon: "🛍️", name: "Bán lẻ", description: "Quản lý kênh bán, inventory, khách hàng" },
              { icon: "🏥", name: "Y tế", description: "Quản lý bệnh nhân, lịch hẹn, tài chính" },
              { icon: "🎓", name: "Giáo dục", description: "Quản lý học sinh, điểm, học phí" },
              { icon: "🚚", name: "Logistics", description: "Vận chuyển, kho, theo dõi đơn hàng" },
              { icon: "💼", name: "Dịch vụ chuyên môn", description: "Tư vấn, dự án, billing" },
              { icon: "🏦", name: "Tài chính", description: "Kế toán, khoá sổ, báo cáo" },
            ].map((useCase, index) => (
              <div
                key={index}
                className="rounded-lg border border-border/50 bg-card p-6 text-center transition-all hover:shadow-lg hover:border-accent/50"
              >
                <div className="mb-3 text-4xl">{useCase.icon}</div>
                <h3 className="mb-2 font-semibold">{useCase.name}</h3>
                <p className="text-sm text-muted-foreground">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners & Awards */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Đối tác & Giải thưởng</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-6 font-semibold text-lg">Những đối tác hàng đầu</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {["Microsoft Partner", "Google Cloud Premier", "AWS Advanced Partner", "Salesforce Partner"].map(
                  (partner, i) => (
                    <div key={i} className="rounded-lg border border-border/50 bg-secondary/30 p-4 text-center">
                      <p className="text-sm font-medium">{partner}</p>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div>
              <h3 className="mb-6 font-semibold text-lg">Giải thưởng nhận được</h3>
              <div className="space-y-3">
                {[
                  "🏆 Best SaaS Platform 2024",
                  "🥇 Top 10 Enterprise Software",
                  "⭐ 4.9/5 Stars on G2",
                  "🎯 Leader in Gartner Magic Quadrant",
                ].map((award, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="rounded-full bg-accent/10 p-2">{award.split(" ")[0]}</div>
                    <p className="text-sm">{award.substring(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border/20 bg-secondary/20 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { value: "10K+", label: "Khách hàng tin tưởng" },
              { value: "99.9%", label: "Uptime guarantee" },
              { value: "50M+", label: "Giao dịch xử lý" },
              { value: "24/7", label: "Hỗ trợ premium" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 text-4xl font-bold text-accent md:text-5xl">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-accent/20 to-transparent p-12 text-center backdrop-blur-sm border border-accent/20">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl text-primary-foreground text-balance">
              Sẵn sàng bắt đầu chuyển đổi số?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-primary-foreground/90">
              Hàng nghìn doanh nghiệp đã tin tưởng VietTech để tăng trưởng bền vững. Hãy trở thành một phần của cộng
              đồng ngày hôm nay.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="rounded-full bg-primary-foreground px-8 py-3 font-medium text-primary transition-all hover:shadow-lg hover:shadow-primary-foreground/30">
                Liên hệ ngay
              </button>
              <button className="rounded-full border border-primary-foreground px-8 py-3 font-medium text-primary-foreground transition-all hover:bg-primary-foreground/10">
                Khám phá sản phẩm
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
