"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

export function ROICalculator() {
  const [employees, setEmployees] = useState(100)
  const [currentCost, setCurrentCost] = useState(50000000)
  const [timeSpent, setTimeSpent] = useState(20)

  // Calculations
  const vietTechCost = employees * 200000 * 12 // 200k/user/month
  const timeSaved = timeSpent * 0.4 // Save 40% time
  const productivityGain = (employees * 50000000 * timeSaved) / 100 / 12 // Avg salary impact
  const totalSavings = currentCost - vietTechCost + productivityGain
  const roi = ((totalSavings / vietTechCost) * 100).toFixed(0)

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardContent className="p-6">
          <h3 className="mb-6 text-xl font-semibold">Thông tin của bạn</h3>

          <div className="space-y-6">
            <div>
              <Label>Số lượng nhân viên: {employees}</Label>
              <Slider
                value={[employees]}
                onValueChange={(value) => setEmployees(value[0])}
                min={50}
                max={5000}
                step={50}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="current-cost">Chi phí công nghệ hiện tại (VNĐ/năm)</Label>
              <Input
                id="current-cost"
                type="number"
                value={currentCost}
                onChange={(e) => setCurrentCost(Number(e.target.value))}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Thời gian xử lý thủ công (% giờ làm): {timeSpent}%</Label>
              <Slider
                value={[timeSpent]}
                onValueChange={(value) => setTimeSpent(value[0])}
                min={0}
                max={50}
                step={5}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-accent/10">
        <CardContent className="p-6">
          <h3 className="mb-6 text-xl font-semibold">Kết quả ROI</h3>

          <div className="space-y-4">
            <div className="flex justify-between border-b pb-3">
              <span className="text-muted-foreground">Chi phí VietTech/năm</span>
              <span className="font-semibold">{vietTechCost.toLocaleString("vi-VN")} đ</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-muted-foreground">Tiết kiệm chi phí</span>
              <span className="font-semibold text-green-600">
                {(currentCost - vietTechCost).toLocaleString("vi-VN")} đ
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-muted-foreground">Tăng năng suất</span>
              <span className="font-semibold text-green-600">{productivityGain.toLocaleString("vi-VN")} đ</span>
            </div>

            <div className="mt-6 rounded-lg bg-accent p-6 text-center">
              <div className="text-sm text-accent-foreground/80">ROI dự kiến</div>
              <div className="text-5xl font-bold text-accent-foreground">{roi}%</div>
              <div className="mt-2 text-sm text-accent-foreground/80">Hoàn vốn trong 8-12 tháng</div>
            </div>

            <div className="mt-4 text-xs text-muted-foreground">
              * Ước tính dựa trên dữ liệu trung bình từ khách hàng hiện tại
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
