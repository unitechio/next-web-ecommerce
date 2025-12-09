"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Check, Star, Shield, Zap, Users, Settings, CheckCircle, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { productsData, type ExtendedProduct } from "@/lib/products-data"
import { useCart } from "@/contexts/cart-context"
import { useState } from "react"

export default function ProductDetailPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const product = productsData.find((p) => p.id === Number(params.id)) as ExtendedProduct | undefined

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
        <Button asChild>
          <Link href="/products">Quay lại trang sản phẩm</Link>
        </Button>
      </div>
    )
  }

  const features = [
    {
      icon: Zap,
      title: "Hiệu suất cao",
      description: "Xử lý nhanh chóng với công nghệ cloud tiên tiến",
    },
    {
      icon: Shield,
      title: "Bảo mật tối ưu",
      description: "Mã hóa dữ liệu và bảo vệ thông tin khách hàng",
    },
    {
      icon: Users,
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ chuyên gia sẵn sàng hỗ trợ mọi lúc",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Product Hero */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Product Image/Video */}
            <div className="relative aspect-video lg:aspect-square overflow-hidden rounded-lg bg-secondary/20">
              {product.discount && (
                <Badge className="absolute left-4 top-4 z-10 bg-red-500 hover:bg-red-600 text-lg px-4 py-2">
                  GIẢM {product.discount}%
                </Badge>
              )}
              {product.featured && <Badge className="absolute right-4 top-4 z-10 text-lg px-4 py-2">Nổi bật</Badge>}
              {product.videoUrl ? (
                <iframe
                  src={product.videoUrl}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              )}
              {product.stock !== undefined && (
                <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-sm">
                  {product.stock > 0 ? `Còn ${product.stock} license` : "Hết hàng"}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <Badge variant="secondary" className="mb-4 w-fit">
                {product.category}
              </Badge>
              <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-balance md:text-5xl">
                {product.name}
              </h1>
              <p className="mb-6 text-lg text-muted-foreground leading-relaxed">{product.description}</p>

              {/* Price */}
              <div className="mb-6">
                {product.originalPrice && (
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl text-muted-foreground line-through">
                      {product.originalPrice.toLocaleString("vi-VN")}đ
                    </span>
                    <Badge variant="destructive">
                      Tiết kiệm {(product.originalPrice - product.price).toLocaleString("vi-VN")}đ
                    </Badge>
                  </div>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-accent">{product.price.toLocaleString("vi-VN")}đ</span>
                  <span className="text-muted-foreground">/ tháng</span>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center border rounded-lg">
                  <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    -
                  </Button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}>
                    +
                  </Button>
                </div>
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) {
                      addToCart(product)
                    }
                    setQuantity(1)
                  }}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Thêm vào giỏ hàng
                </Button>
              </div>

              {product.configurableOptions && (
                <Button variant="outline" size="lg" className="mb-4 bg-transparent" asChild>
                  <Link href={`/products/${product.id}/configure`}>
                    <Settings className="mr-2 h-5 w-5" />
                    Tùy chỉnh cấu hình
                  </Link>
                </Button>
              )}

              {/* Benefits */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Dùng thử miễn phí 14 ngày</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Hủy bất cứ lúc nào</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Hỗ trợ kỹ thuật 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features Showcase Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Những tính năng nổi bật</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {product.features?.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg border border-border/50 p-4 hover:border-accent/50 transition-colors"
              >
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Benefits and Use Cases Section */}
      <section className="py-12 md:py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold mb-6">Lợi ích chính</h3>
              <ul className="space-y-4">
                {product.benefits?.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
              {product.roi && (
                <div className="mt-8 p-6 rounded-lg bg-accent/10 border border-accent/30">
                  <p className="text-sm text-muted-foreground mb-2">Dự kiến ROI</p>
                  <p className="text-2xl font-bold text-accent">{product.roi}</p>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Đối tượng khách hàng</h3>
              <div className="flex flex-wrap gap-3">
                {product.targetAudience?.map((audience, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/30 text-sm font-medium"
                  >
                    {audience}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-bold mt-8 mb-6">Trường hợp sử dụng</h3>
              <ul className="space-y-3">
                {product.useCases?.map((useCase, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Customer Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Đánh giá từ khách hàng</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-border/50 p-6 hover:border-accent/50 transition-colors"
                >
                  <div className="flex gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{review.text}"</p>
                  <p className="font-semibold text-sm">— {review.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Separator />

      {product.specs && (
        <section className="py-12 bg-secondary/20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Thông số kỹ thuật</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Object.entries(product.specs).map(([key, value]) => (
                <Card key={key}>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground capitalize mb-1">{key}</div>
                    <div className="font-semibold">{value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Product Details Tabs */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="features">Tính năng</TabsTrigger>
              <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold">Giới thiệu sản phẩm</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.name} là giải pháp công nghệ tiên tiến được thiết kế đặc biệt cho các doanh nghiệp hiện
                    đại. Với giao diện thân thiện và tính năng mạnh mẽ, sản phẩm giúp tối ưu hóa quy trình làm việc và
                    nâng cao hiệu suất kinh doanh.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Được phát triển bởi đội ngũ chuyên gia hàng đầu, {product.name} tích hợp công nghệ AI và machine
                    learning để mang đến trải nghiệm tốt nhất cho người dùng. Hệ thống bảo mật đa lớp đảm bảo dữ liệu
                    của bạn luôn được an toàn tuyệt đối.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-8">
              <div className="grid gap-6 md:grid-cols-3">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={`/abstract-geometric-shapes.png?height=48&width=48&query=user${i}`}
                          alt="User"
                          className="h-12 w-12 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">Khách hàng #{i}</span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            Sản phẩm rất tuyệt vời, giúp công việc của tôi trở nên dễ dàng và hiệu quả hơn rất nhiều.
                            Đội ngũ hỗ trợ cũng rất nhiệt tình và chuyên nghiệp.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12 md:py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Sản phẩm liên quan</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {productsData
              .filter((p) => p.id !== product.id)
              .slice(0, 3)
              .map((relatedProduct) => (
                <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/products/${relatedProduct.id}`}>
                    <div className="relative aspect-video overflow-hidden bg-secondary/20">
                      {relatedProduct.discount && (
                        <Badge className="absolute left-4 top-4 z-10 bg-red-500">-{relatedProduct.discount}%</Badge>
                      )}
                      <img
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        className="h-full w-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
                      <div className="text-accent font-bold">{relatedProduct.price.toLocaleString("vi-VN")}đ/tháng</div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}
