"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Search, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useState, useMemo } from "react"
import { productsData } from "@/lib/products-data"
import { useCart } from "@/contexts/cart-context"
import { Pagination } from "@/components/pagination"
import { ProductFilters, type FilterState } from "@/components/product-filters"

const ITEMS_PER_PAGE = 6

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("newest")
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 3000000],
    categories: [],
    ratings: [],
    inStock: false,
    onSale: false,
  })
  const { addToCart } = useCart()

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]

      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category)

      const matchesRating = filters.ratings.length === 0 // Can add rating field

      const matchesStock = !filters.inStock || (product.stock ?? 0) > 0

      const matchesOnSale = !filters.onSale || (product.discount ?? 0) > 0

      return matchesSearch && matchesPrice && matchesCategory && matchesRating && matchesStock && matchesOnSale
    })
  }, [searchTerm, filters])

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price)
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price)
      case "discount":
        return sorted.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0))
      case "featured":
        return sorted.sort((a, b) => (b.featured ? 1 : -1) - (a.featured ? 1 : -1))
      default:
        return sorted
    }
  }, [filteredProducts, sortBy])

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const displayedProducts = sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const priceStats = useMemo(() => {
    if (productsData.length === 0) return { min: 0, max: 0 }
    const prices = productsData.map((p) => p.price)
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    }
  }, [])

  const categories = Array.from(new Set(productsData.map((p) => p.category)))

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-secondary/20 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="secondary">
              Sản phẩm
            </Badge>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-balance md:text-5xl">
              Giải pháp công nghệ cho mọi nhu cầu
            </h1>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed md:text-xl">
              Khám phá bộ sản phẩm đa dạng được thiết kế để giúp doanh nghiệp của bạn tăng trưởng và phát triển bền
              vững.
            </p>

            {/* Search */}
            <div className="relative mx-auto max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm sản phẩm..."
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

      {/* Products Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <ProductFilters
                categories={categories}
                maxPrice={priceStats.max}
                minPrice={priceStats.min}
                onFilterChange={setFilters}
              />
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Sort & Results */}
              <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
                <p className="text-sm text-muted-foreground">
                  Tìm thấy <span className="font-semibold text-foreground">{sortedProducts.length}</span> sản phẩm
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Sắp xếp theo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Mới nhất</SelectItem>
                    <SelectItem value="price-low">Giá: Thấp → Cao</SelectItem>
                    <SelectItem value="price-high">Giá: Cao → Thấp</SelectItem>
                    <SelectItem value="discount">Giảm giá cao nhất</SelectItem>
                    <SelectItem value="featured">Nổi bật</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {displayedProducts.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-lg text-muted-foreground">
                    Không tìm thấy sản phẩm phù hợp. Vui lòng thử tìm kiếm khác.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-8 md:grid-cols-2 mb-8">
                    {displayedProducts.map((product) => (
                      <Card key={product.id} className="overflow-hidden transition-all hover:shadow-lg group">
                        <div className="relative aspect-video overflow-hidden bg-secondary/20">
                          {product.discount && (
                            <Badge className="absolute left-4 top-4 z-10 bg-red-500 hover:bg-red-600">
                              -{product.discount}%
                            </Badge>
                          )}
                          {product.featured && <Badge className="absolute right-4 top-4 z-10">Nổi bật</Badge>}
                          <Link href={`/products/${product.id}`}>
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="h-full w-full object-cover transition-transform group-hover:scale-110"
                            />
                          </Link>
                        </div>
                        <CardContent className="p-6">
                          <Badge variant="secondary" className="mb-3">
                            {product.category}
                          </Badge>
                          <Link href={`/products/${product.id}`}>
                            <h3 className="mb-2 text-xl font-semibold hover:text-accent transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="mb-4 text-muted-foreground leading-relaxed">{product.description}</p>
                          <div className="flex items-center justify-between">
                            <div>
                              {product.originalPrice && (
                                <div className="text-sm text-muted-foreground line-through">
                                  {product.originalPrice.toLocaleString("vi-VN")}đ
                                </div>
                              )}
                              <div className="text-2xl font-bold text-accent">
                                {product.price.toLocaleString("vi-VN")}đ
                              </div>
                              <div className="text-sm text-muted-foreground">/ tháng</div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="icon" onClick={() => addToCart(product)}>
                                <ShoppingCart className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" asChild>
                                <Link href={`/products/${product.id}`}>
                                  <ArrowRight className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
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
