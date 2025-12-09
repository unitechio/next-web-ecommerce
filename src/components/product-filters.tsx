"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { X } from "lucide-react"

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void
  categories: string[]
  maxPrice: number
  minPrice: number
}

export interface FilterState {
  priceRange: [number, number]
  categories: string[]
  ratings: number[]
  inStock: boolean
  onSale: boolean
}

export function ProductFilters({ onFilterChange, categories, maxPrice, minPrice }: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [minPrice, maxPrice],
    categories: [],
    ratings: [],
    inStock: false,
    onSale: false,
  })

  const handlePriceChange = (value: number[]) => {
    const newFilters = { ...filters, priceRange: [value[0], value[1]] as [number, number] }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]
    const newFilters = { ...filters, categories: newCategories }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleRatingToggle = (rating: number) => {
    const newRatings = filters.ratings.includes(rating)
      ? filters.ratings.filter((r) => r !== rating)
      : [...filters.ratings, rating]
    const newFilters = { ...filters, ratings: newRatings }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleReset = () => {
    const newFilters: FilterState = {
      priceRange: [minPrice, maxPrice],
      categories: [],
      ratings: [],
      inStock: false,
      onSale: false,
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.ratings.length > 0 ||
    filters.inStock ||
    filters.onSale ||
    filters.priceRange[0] !== minPrice ||
    filters.priceRange[1] !== maxPrice

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Bộ lọc</CardTitle>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={handleReset} className="h-auto p-0">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div>
            <h3 className="mb-4 font-semibold text-sm">Khoảng giá</h3>
            <Slider
              min={minPrice}
              max={maxPrice}
              step={100000}
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              className="w-full"
            />
            <div className="mt-3 flex justify-between text-sm text-muted-foreground">
              <span>{(filters.priceRange[0] / 1000000).toFixed(1)}M</span>
              <span>{(filters.priceRange[1] / 1000000).toFixed(1)}M</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-3 font-semibold text-sm">Danh mục</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="rounded border border-input"
                  />
                  <span className="text-sm">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Ratings */}
          <div>
            <h3 className="mb-3 font-semibold text-sm">Đánh giá</h3>
            <div className="space-y-2">
              {[5, 4, 3].map((rating) => (
                <label key={rating} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.ratings.includes(rating)}
                    onChange={() => handleRatingToggle(rating)}
                    className="rounded border border-input"
                  />
                  <span className="text-sm">
                    {"⭐".repeat(rating)} ({rating} sao trở lên)
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Stock & Sale */}
          <div className="space-y-2 border-t pt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => {
                  const newFilters = { ...filters, inStock: e.target.checked }
                  setFilters(newFilters)
                  onFilterChange(newFilters)
                }}
                className="rounded border border-input"
              />
              <span className="text-sm">Còn hàng</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.onSale}
                onChange={(e) => {
                  const newFilters = { ...filters, onSale: e.target.checked }
                  setFilters(newFilters)
                  onFilterChange(newFilters)
                }}
                className="rounded border border-input"
              />
              <span className="text-sm">Đang giảm giá</span>
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
