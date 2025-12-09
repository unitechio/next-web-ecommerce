"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, ArrowRight, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const blogPosts = [
  {
    id: 1,
    title: "Xu hướng chuyển đổi số trong năm 2025",
    excerpt:
      "Khám phá những xu hướng công nghệ nổi bật sẽ định hình cách thức hoạt động của doanh nghiệp trong năm 2025.",
    category: "Chuyển đổi số",
    author: "Nguyễn Văn A",
    date: "15 Tháng 1, 2025",
    readTime: "5 phút",
    image: "/digital-transformation-concept.png",
    featured: true,
  },
  {
    id: 2,
    title: "AI và Machine Learning trong doanh nghiệp",
    excerpt: "Cách các doanh nghiệp đang áp dụng AI và Machine Learning để tối ưu hóa quy trình và tăng doanh thu.",
    category: "AI & ML",
    author: "Trần Thị B",
    date: "12 Tháng 1, 2025",
    readTime: "7 phút",
    image: "/ai-business-concept.png",
    featured: false,
  },
  {
    id: 3,
    title: "10 mẹo tối ưu hóa CRM cho doanh nghiệp",
    excerpt: "Hướng dẫn chi tiết về cách sử dụng CRM hiệu quả để cải thiện mối quan hệ khách hàng và tăng doanh số.",
    category: "CRM",
    author: "Lê Văn C",
    date: "10 Tháng 1, 2025",
    readTime: "6 phút",
    image: "/crm-optimization.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "Bảo mật dữ liệu trong kỷ nguyên số",
    excerpt: "Tìm hiểu về các biện pháp bảo mật quan trọng để bảo vệ dữ liệu doanh nghiệp khỏi các mối đe dọa.",
    category: "Bảo mật",
    author: "Phạm Thị D",
    date: "8 Tháng 1, 2025",
    readTime: "8 phút",
    image: "/cybersecurity-network.png",
    featured: true,
  },
  {
    id: 5,
    title: "Cloud Computing: Lợi ích và thách thức",
    excerpt: "Phân tích ưu nhược điểm của việc di chuyển hạ tầng IT lên cloud và cách thức triển khai hiệu quả.",
    category: "Cloud",
    author: "Hoàng Văn E",
    date: "5 Tháng 1, 2025",
    readTime: "6 phút",
    image: "/cloud-computing-concept.png",
    featured: false,
  },
  {
    id: 6,
    title: "Marketing automation: Tự động hóa hiệu quả",
    excerpt: "Cách sử dụng công cụ marketing automation để tiết kiệm thời gian và tăng ROI cho chiến dịch.",
    category: "Marketing",
    author: "Đỗ Thị F",
    date: "3 Tháng 1, 2025",
    readTime: "5 phút",
    image: "/marketing-automation-concept.png",
    featured: false,
  },
  {
    id: 7,
    title: "Data Analytics: Từ dữ liệu đến quyết định",
    excerpt: "Hướng dẫn khai thác sức mạnh của phân tích dữ liệu để đưa ra quyết định kinh doanh thông minh.",
    category: "Analytics",
    author: "Vũ Văn G",
    date: "1 Tháng 1, 2025",
    readTime: "7 phút",
    image: "/data-analytics-visualization.png",
    featured: false,
  },
  {
    id: 8,
    title: "Remote work: Quản lý nhóm từ xa hiệu quả",
    excerpt: "Chiến lược và công cụ giúp quản lý đội ngũ làm việc từ xa một cách hiệu quả và năng suất.",
    category: "Quản lý",
    author: "Bùi Thị H",
    date: "29 Tháng 12, 2024",
    readTime: "6 phút",
    image: "/remote-work-setup.png",
    featured: false,
  },
]

const ITEMS_PER_PAGE = 6

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const displayedPosts = filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-secondary/20 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="secondary">
              Blog
            </Badge>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-balance md:text-5xl">
              Kiến thức và xu hướng công nghệ
            </h1>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed md:text-xl">
              Cập nhật những tin tức mới nhất, hướng dẫn chi tiết và insights về công nghệ doanh nghiệp.
            </p>

            {/* Search */}
            <div className="relative mx-auto max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm bài viết..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          {displayedPosts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">
                Không tìm thấy bài viết phù hợp. Vui lòng thử tìm kiếm khác.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {displayedPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden transition-all hover:shadow-lg group">
                    <div className="relative aspect-video overflow-hidden bg-secondary/20">
                      {post.featured && <Badge className="absolute right-4 top-4 z-10">Nổi bật</Badge>}
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-3">
                        {post.category}
                      </Badge>
                      <h3 className="mb-2 text-xl font-semibold line-clamp-2">{post.title}</h3>
                      <p className="mb-4 text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
                      <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{post.author}</span>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/blogs/${post.id}`}>
                            Đọc thêm
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Trước
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Sau
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-secondary/20 py-20">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-2xl">
            <CardContent className="p-8 text-center">
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">Đăng ký nhận bản tin</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Nhận những bài viết mới nhất, insights và tips công nghệ ngay trong hộp thư của bạn.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input type="email" placeholder="Email của bạn" className="flex-1" />
                <Button>Đăng ký</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
