"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Search } from "lucide-react"

interface Product {
  id: number
  name: string
  category: string
  description: string
  price: number
  originalPrice: number
  discount: number
  stock: number
  image: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "VietTech CRM",
      category: "Quản lý khách hàng",
      description: "Quản lý quan hệ khách hàng toàn diện",
      price: 1275000,
      originalPrice: 1500000,
      discount: 15,
      stock: 50,
      image: "/crm-software-dashboard.jpg",
    },
    {
      id: 2,
      name: "VietTech Analytics",
      category: "Phân tích dữ liệu",
      description: "Phân tích dữ liệu chuyên sâu với AI",
      price: 1700000,
      originalPrice: 2000000,
      discount: 15,
      stock: 35,
      image: "/analytics-dashboard.png",
    },
    {
      id: 3,
      name: "VietTech Marketing",
      category: "Marketing tự động",
      description: "Công cụ marketing tự động hóa",
      price: 960000,
      originalPrice: 1200000,
      discount: 20,
      stock: 100,
      image: "/marketing-automation-concept.png",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    category: "",
    description: "",
    price: 0,
    originalPrice: 0,
    discount: 0,
    stock: 0,
    image: "",
  })

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddProduct = () => {
    if (editingId) {
      setProducts(products.map((p) => (p.id === editingId ? { ...p, ...formData } : p)))
      setEditingId(null)
    } else {
      const newProduct: Product = {
        id: Math.max(...products.map((p) => p.id), 0) + 1,
        name: formData.name || "",
        category: formData.category || "",
        description: formData.description || "",
        price: formData.price || 0,
        originalPrice: formData.originalPrice || 0,
        discount: formData.discount || 0,
        stock: formData.stock || 0,
        image: formData.image || "",
      }
      setProducts([...products, newProduct])
    }
    setFormData({
      name: "",
      category: "",
      description: "",
      price: 0,
      originalPrice: 0,
      discount: 0,
      stock: 0,
      image: "",
    })
    setIsOpen(false)
  }

  const handleEditProduct = (product: Product) => {
    setEditingId(product.id)
    setFormData(product)
    setIsOpen(true)
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản lý Sản phẩm</h1>
          <p className="text-muted-foreground">Thêm, sửa, xóa sản phẩm</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingId(null)
                setFormData({
                  name: "",
                  category: "",
                  description: "",
                  price: 0,
                  originalPrice: 0,
                  discount: 0,
                  stock: 0,
                  image: "",
                })
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Thêm sản phẩm
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</DialogTitle>
              <DialogDescription>
                {editingId ? "Cập nhật thông tin sản phẩm" : "Nhập thông tin sản phẩm mới"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="name">Tên sản phẩm</Label>
                <Input
                  id="name"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="VietTech CRM"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Danh mục</Label>
                <Input
                  id="category"
                  value={formData.category || ""}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Quản lý khách hàng"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Mô tả chi tiết sản phẩm..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Giá bán (đ)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price || 0}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  placeholder="1000000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="originalPrice">Giá gốc (đ)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  value={formData.originalPrice || 0}
                  onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                  placeholder="1200000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount">Giảm giá (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  value={formData.discount || 0}
                  onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                  placeholder="15"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Tồn kho</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock || 0}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  placeholder="50"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="image">Ảnh sản phẩm</Label>
                <Input
                  id="image"
                  value={formData.image || ""}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/product-image.jpg"
                />
              </div>
            </div>
            <Button onClick={handleAddProduct} className="w-full mt-4">
              {editingId ? "Cập nhật" : "Thêm mới"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Danh sách sản phẩm ({filteredProducts.length})</CardTitle>
          <div className="flex gap-2">
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
            <Button variant="outline">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">ID</th>
                  <th className="text-left py-3 px-4 font-semibold">Tên sản phẩm</th>
                  <th className="text-left py-3 px-4 font-semibold">Danh mục</th>
                  <th className="text-right py-3 px-4 font-semibold">Giá bán</th>
                  <th className="text-right py-3 px-4 font-semibold">Giá gốc</th>
                  <th className="text-center py-3 px-4 font-semibold">Giảm giá</th>
                  <th className="text-right py-3 px-4 font-semibold">Tồn kho</th>
                  <th className="text-center py-3 px-4 font-semibold">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-accent/5 transition-colors">
                    <td className="py-3 px-4">{product.id}</td>
                    <td className="py-3 px-4">
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{product.description}</p>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">{product.category}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-semibold">{product.price.toLocaleString("vi-VN")}đ</td>
                    <td className="py-3 px-4 text-right text-muted-foreground line-through">
                      {product.originalPrice.toLocaleString("vi-VN")}đ
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant="outline" className="bg-red-50 text-red-700">
                        -{product.discount}%
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Badge variant={product.stock > 20 ? "default" : product.stock > 0 ? "secondary" : "destructive"}>
                        {product.stock} cái
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditProduct(product)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteProduct(product.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
