import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Award, Heart } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Về chúng tôi - VietTech",
  description: "Tìm hiểu về hành trình và sứ mệnh của VietTech",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-secondary/20 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="secondary">
              Về VietTech
            </Badge>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-balance md:text-5xl">
              Xây dựng tương lai số cho doanh nghiệp Việt
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed md:text-xl">
              Chúng tôi tin rằng công nghệ là chìa khóa để mở ra những cơ hội
              phát triển vô hạn cho mọi doanh nghiệp.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-3xl font-bold md:text-4xl">
              Câu chuyện của chúng tôi
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                VietTech được thành lập vào năm 2020 với mục tiêu mang đến những
                giải pháp công nghệ tiên tiến nhất cho các doanh nghiệp Việt
                Nam. Chúng tôi bắt đầu từ một nhóm nhỏ các kỹ sư đam mê công
                nghệ, và đã phát triển thành một trong những công ty hàng đầu
                trong lĩnh vực chuyển đổi số.
              </p>
              <p>
                Với hơn 10,000 khách hàng trên toàn quốc, chúng tôi tự hào đã
                góp phần giúp các doanh nghiệp tối ưu hóa quy trình làm việc,
                tăng năng suất và mở rộng thị trường. Sự thành công của khách
                hàng chính là động lực lớn nhất để chúng tôi không ngừng đổi mới
                và phát triển.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Hành trình phát triển
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Từ một startup nhỏ đến nay, chúng tôi đã đi được một chặng đường
              dài.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-8">
            {[
              {
                year: "2020",
                title: "Thành lập VietTech",
                description: "Công ty được thành lập với 10 nhân viên",
              },
              {
                year: "2021",
                title: "Ra mắt CRM",
                description:
                  "Sản phẩm CRM đầu tiên được phát hành, có 100 khách hàng",
              },
              {
                year: "2022",
                title: "Mở rộng sản phẩm",
                description: "Thêm Analytics, Marketing, HRM - tổng 50K users",
              },
              {
                year: "2023",
                title: "Đạt 10K khách hàng",
                description: "Trở thành lựa chọn hàng đầu của SME Việt Nam",
              },
              {
                year: "2024",
                title: "Ra mắt ERP",
                description:
                  "Phát hành ERP toàn diện, nhận giải Best SaaS Platform",
              },
            ].map((milestone, index) => (
              <div key={index} className="relative flex gap-6 pb-8">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground font-semibold">
                    {milestone.year.substring(2)}
                  </div>
                  {index < 4 && <div className="h-16 w-0.5 bg-border/50" />}
                </div>
                <div className="flex-1 pt-1.5">
                  <h3 className="font-semibold text-lg">{milestone.title}</h3>
                  <p className="mt-1 text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary/20 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Giá trị cốt lõi
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Những giá trị này định hình cách chúng tôi làm việc và phục vụ
              khách hàng.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Target className="h-8 w-8" />,
                title: "Đổi mới",
                description:
                  "Luôn tiên phong trong việc áp dụng công nghệ mới nhất.",
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Khách hàng trung tâm",
                description: "Thành công của khách hàng là ưu tiên hàng đầu.",
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Chất lượng",
                description:
                  "Cam kết cung cấp sản phẩm và dịch vụ chất lượng cao.",
              },
              {
                icon: <Heart className="h-8 w-8" />,
                title: "Trách nhiệm",
                description:
                  "Hành động có trách nhiệm với cộng đồng và môi trường.",
              },
            ].map((value, index) => (
              <Card key={index} className="transition-all hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    {value.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-secondary/20 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { number: "10K+", label: "Khách hàng" },
              { number: "99.9%", label: "Uptime" },
              { number: "50M+", label: "Giao dịch" },
              { number: "30+", label: "Đối tác toàn cầu" },
            ].map((achievement, i) => (
              <div key={i} className="text-center">
                <div className="mb-2 text-4xl font-bold text-accent md:text-5xl">
                  {achievement.number}
                </div>
                <p className="text-muted-foreground">{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Đội ngũ lãnh đạo
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Những con người tài năng và đam mê đứng sau sự thành công của
              VietTech.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Nguyễn Văn A",
                role: "CEO & Founder",
                image: "/professional-ceo.jpg",
              },
              {
                name: "Trần Thị B",
                role: "CTO",
                image: "/professional-cto.jpg",
              },
              {
                name: "Lê Văn C",
                role: "Head of Product",
                image: "/professional-product-manager.png",
              },
            ].map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden transition-all hover:shadow-lg"
              >
                <div className="aspect-square overflow-hidden bg-secondary/20">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="h-full w-full object-cover transition-transform hover:scale-110"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Culture & CTA */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Văn hóa công ty
            </h2>
          </div>

          <div className="mb-12 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: "🚀",
                title: "Đổi mới",
                description:
                  "Chúng tôi không ngừng đổi mới và phát triển công nghệ mới nhất.",
              },
              {
                icon: "👥",
                title: "Hợp tác",
                description:
                  "Làm việc nhóm, tôn trọng và hỗ trợ lẫn nhau để đạt thành công chung.",
              },
              {
                icon: "🎯",
                title: "Chất lượng",
                description:
                  "Cam kết cung cấp sản phẩm và dịch vụ chất lượng cao nhất cho khách hàng.",
              },
            ].map((culture, i) => (
              <div
                key={i}
                className="rounded-lg border border-border/50 bg-card p-8 text-center"
              >
                <div className="mb-4 text-5xl">{culture.icon}</div>
                <h3 className="mb-2 font-semibold text-lg">{culture.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {culture.description}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-linear-to-r from-primary/10 to-accent/10 p-12 text-center border border-accent/20">
            <h3 className="mb-4 text-2xl font-bold">
              Tham gia đội ngũ VietTech
            </h3>
            <p className="mb-6 text-muted-foreground">
              Nếu bạn đam mê công nghệ và muốn tạo tác động, hãy ứng tuyển vào
              đội ngũ của chúng tôi ngay hôm nay.
            </p>
            <button className="rounded-full bg-accent px-8 py-3 text-accent-foreground font-medium transition-all hover:shadow-lg hover:shadow-accent/30">
              Xem các cơ hội nghề nghiệp
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
