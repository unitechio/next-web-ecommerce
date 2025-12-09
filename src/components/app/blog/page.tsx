"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Search, Calendar } from "lucide-react"
import Link from "next/link"
import { Pagination } from "@/components/pagination"
import { ProductFilters, type FilterState } from "@/components/product-filters"

const ITEMS_PER_PAGE = 6

// Mock blog data
const blogData = [
  {
    id: 1,
    title: "Cách tối ưu hóa quy trình bán hàng với CRM",
    excerpt: "Khám phá những cách tốt nhất để sử dụng CRM để tăng tỷ lệ chuyển đổi bán hàng của bạn.",
    category: "CRM",
    author: "Nguyễn Văn A",
    date: "2024-12-01",
    readTime: 5,
    image: "/blog-crm-optimization.jpg",
    tags: ["CRM", "Sales", "Optimization"],
  },
  {
    id: 2,
    title: "Hướng dẫn toàn diện về Analytics cho E-commerce",
    excerpt: "Tìm hiểu cách sử dụng phân tích dữ liệu để tăng doanh số bán hàng trực tuyến.",
    category: "Analytics",
    author: "Trần Thị B",
    date: "2024-11-28",
    readTime: 8,
    image: "/blog-analytics-ecommerce.jpg",
    tags: ["Analytics", "E-commerce", "Data"],
  },
  {
    id: 3,
    title: "Marketing Automation: Tiết kiệm thời gian, tăng hiệu suất",
    excerpt: "Công cụ tự động hóa marketing giúp bạn quản lý chiến dịch hiệu quả hơn.",
    category: "Marketing",
    author: "Lê Văn C",
    date: "2024-11-25",
    readTime: 6,
    image: "/blog-marketing-automation.jpg",
    tags: ["Marketing", "Automation", "Efficiency"],
  },
  {
    id: 4,
    title: "ERP: Giải pháp toàn diện cho quản lý doanh nghiệp",
    excerpt: "Khám phá cách hệ thống ERP có thể chuyển đổi cách quản lý doanh nghiệp của bạn.",
    category: "ERP",
    author: "Phạm Văn D",
    date: "2024-11-20",
    readTime: 10,
    image: "/blog-erp-management.jpg",
    tags: ["ERP", "Management", "Enterprise"],
  },
  {
    id: 5,
    title: "HRM hiện đại: Quản lý nhân sự trong kỷ nguyên số",
    excerpt: "Cách công nghệ HRM giúp tối ưu hóa quy trình tuyển dụng và quản lý nhân sự.",
    category: "HRM",
    author: "Ngô Thị E",
    date: "2024-11-15",
    readTime: 7,
    image: "/blog-hrm-digital.jpg",
    tags: ["HRM", "HR", "Digital"],
  },
  {
    id: 6,
    title: "Bảo mật dữ liệu: 5 bước cần thiết cho doanh nghiệp",
    excerpt: "Hướng dẫn toàn diện về bảo vệ dữ liệu nhạy cảm của công ty bạn.",
    category: "Security",
    author: "Dương Văn F",
    date: "2024-11-10",
    readTime: 9,
    image: "/blog-security-data.jpg",
    tags: ["Security", "Data Protection", "Enterprise"],
  },
]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("newest")
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 10000000],
    categories: [],
    ratings: [],
    inStock: false,
    onSale: false,
  })

  const filteredPosts = useMemo(() => {
    return blogData.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(post.category)

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, filters])

  const sortedPosts = useMemo(() => {
    const sorted = [...filteredPosts]
    switch (sortBy) {
      case "oldest":
        return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      case "popular":
        return sorted.sort((a, b) => b.readTime - a.readTime)
      default:
        return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }
  }, [filteredPosts, sortBy])

  const totalPages = Math.ceil(sortedPosts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const displayedPosts = sortedPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const categories = Array.from(new Set(blogData.map((p) => p.category)))

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
              Kiến thức và mẹo từ chuyên gia
            </h1>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed md:text-xl">
              Cập nhật tin tức mới nhất về công nghệ, kinh doanh và xu hướng ngành.
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

      {/* Blog Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <ProductFilters categories={categories} maxPrice={10000000} minPrice={0} onFilterChange={setFilters} />
            </div>

            {/* Blog Grid */}
            <div className="lg:col-span-3">
              {/* Sort & Results */}
              <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
                <p className="text-sm text-muted-foreground">
                  Tìm thấy <span className="font-semibold text-foreground">{sortedPosts.length}</span> bài viết
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Sắp xếp theo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Mới nhất</SelectItem>
                    <SelectItem value="oldest">Cũ nhất</SelectItem>
                    <SelectItem value="popular">Phổ biến</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {displayedPosts.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-lg text-muted-foreground">
                    Không tìm thấy bài viết phù hợp. Vui lòng thử tìm kiếm khác.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-8 md:grid-cols-2 mb-8">
                    {displayedPosts.map((post) => (
                      <Card key={post.id} className="overflow-hidden transition-all hover:shadow-lg group">
                        <div className="relative aspect-video overflow-hidden bg-secondary/20">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-110"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="mb-3 flex items-center gap-2">
                            <Badge variant="secondary">{post.category}</Badge>
                            <span className="text-xs text-muted-foreground">{post.readTime} phút đọc</span>
                          </div>
                          <Link href={`/blog/${post.id}`}>
                            <h3 className="mb-2 text-lg font-semibold hover:text-accent transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                          </Link>
                          <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {new Date(post.date).toLocaleDateString("vi-VN")}
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/blog/${post.id}`} className="gap-1">
                                Đọc tiếp
                                <ArrowRight className="h-3 w-3" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
