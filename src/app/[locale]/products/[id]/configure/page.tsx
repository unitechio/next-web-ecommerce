"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { useParams, useRouter } from "next/navigation"
import { productsData, type ExtendedProduct } from "@/lib/products-data"
import { useState, useEffect } from "react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { Check, TrendingUp, Zap, Users } from "lucide-react"
import Link from "next/link"

export default function ProductConfiguratorPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const product = productsData.find((p) => p.id === Number(params.id)) as ExtendedProduct | undefined

  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({})
  const [totalPrice, setTotalPrice] = useState(0)
  const [performanceScore, setPerformanceScore] = useState(0)

  useEffect(() => {
    if (!product?.configurableOptions) return

    let price = product.price
    let performance = 50

    Object.entries(selectedOptions).forEach(([key, index]) => {
      const option = product.configurableOptions?.[key]?.[index]
      if (option) {
        price += option.price
        performance += (option.price / 100000) * 5
      }
    })

    setTotalPrice(price)
    setPerformanceScore(Math.min(100, performance))
  }, [selectedOptions, product])

  if (!product?.configurableOptions) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Sản phẩm này không hỗ trợ cấu hình tùy chỉnh</h1>
        <Button asChild>
          <Link href={`/products/${params.id}`}>Quay lại chi tiết sản phẩm</Link>
        </Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    const configuredProduct = {
      ...product,
      price: totalPrice,
      name: `${product.name} (Tùy chỉnh)`,
    }
    addToCart(configuredProduct)
    router.push("/cart")
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="mb-8">
        <Badge className="mb-4">Cấu hình tùy chỉnh</Badge>
        <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
        <p className="text-muted-foreground">{product.description}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Configuration Options */}
        <div className="lg:col-span-2 space-y-6">
          {Object.entries(product.configurableOptions).map(([optionKey, options]) => (
            <Card key={optionKey}>
              <CardHeader>
                <CardTitle className="capitalize">{optionKey}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedOptions[optionKey]?.toString() || "0"}
                  onValueChange={(value) =>
                    setSelectedOptions((prev) => ({
                      ...prev,
                      [optionKey]: Number.parseInt(value),
                    }))
                  }
                >
                  <div className="space-y-3">
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border p-4 hover:bg-secondary/50 cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value={index.toString()} id={`${optionKey}-${index}`} />
                          <Label htmlFor={`${optionKey}-${index}`} className="flex-1 cursor-pointer">
                            <span className="font-semibold">{option.label}</span>
                            {option.price > 0 && (
                              <span className="ml-2 text-sm text-muted-foreground">
                                +{option.price.toLocaleString("vi-VN")}đ
                              </span>
                            )}
                          </Label>
                        </div>
                        {selectedOptions[optionKey] === index && <Check className="h-5 w-5 text-primary" />}
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          ))}

          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Hiệu suất dự kiến</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="mb-2 flex justify-between">
                  <span className="font-medium">Hiệu suất tổng thể</span>
                  <span className="text-sm text-muted-foreground">{Math.round(performanceScore)}%</span>
                </div>
                <Progress value={performanceScore} className="h-3" />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-3 rounded-lg border p-4">
                  <Zap className="h-8 w-8 text-primary" />
                  <div>
                    <div className="text-2xl font-bold">{Math.round(performanceScore * 0.8)}%</div>
                    <div className="text-xs text-muted-foreground">Tốc độ</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-4">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <div className="text-2xl font-bold">{Math.round(performanceScore * 0.9)}%</div>
                    <div className="text-xs text-muted-foreground">Đồng thời</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  <div>
                    <div className="text-2xl font-bold">{Math.round(performanceScore * 0.95)}%</div>
                    <div className="text-xs text-muted-foreground">Mở rộng</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Price Summary */}
        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Tóm tắt cấu hình</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Gói cơ bản</span>
                  <span>{product.price.toLocaleString("vi-VN")}đ</span>
                </div>
                {Object.entries(selectedOptions).map(([key, index]) => {
                  const option = product.configurableOptions?.[key]?.[index]
                  if (!option || option.price === 0) return null
                  return (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-muted-foreground capitalize">
                        {key}: {option.label}
                      </span>
                      <span>+{option.price.toLocaleString("vi-VN")}đ</span>
                    </div>
                  )
                })}
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Tổng cộng</span>
                <span className="text-accent">{totalPrice.toLocaleString("vi-VN")}đ/tháng</span>
              </div>

              <Button className="w-full" size="lg" onClick={handleAddToCart}>
                Thêm vào giỏ hàng
              </Button>

              <Button variant="outline" className="w-full bg-transparent" size="lg">
                Tải bảng chi tiết (PDF)
              </Button>

              <div className="space-y-2 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Dùng thử miễn phí 14 ngày</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Hủy bất cứ lúc nào</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Hỗ trợ kỹ thuật 24/7</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
