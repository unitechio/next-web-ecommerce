"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "./auth-context"

export type MembershipTier = "Silver" | "Gold" | "Platinum" | "Titanium"

interface LoyaltyData {
  points: number
  tier: MembershipTier
  totalSpent: number
  ordersCount: number
  benefits: string[]
}

interface LoyaltyContextType {
  loyaltyData: LoyaltyData
  addPoints: (points: number) => void
  redeemPoints: (points: number) => number
  getTierBenefits: (tier: MembershipTier) => string[]
  getDiscountRate: () => number
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined)

const TIER_THRESHOLDS = {
  Silver: 0,
  Gold: 5000000,
  Platinum: 15000000,
  Titanium: 50000000,
}

const TIER_BENEFITS = {
  Silver: ["Tích điểm thưởng 1%", "Hỗ trợ khách hàng cơ bản"],
  Gold: ["Tích điểm thưởng 2%", "Giảm giá 5%", "Hỗ trợ ưu tiên", "Miễn phí vận chuyển"],
  Platinum: ["Tích điểm thưởng 3%", "Giảm giá 10%", "Hỗ trợ VIP 24/7", "Quà tặng đặc biệt", "Early access"],
  Titanium: [
    "Tích điểm thưởng 5%",
    "Giảm giá 15%",
    "Account Manager riêng",
    "Tư vấn miễn phí",
    "Ưu tiên tối đa",
    "Exclusive events",
  ],
}

export function LoyaltyProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [loyaltyData, setLoyaltyData] = useState<LoyaltyData>({
    points: 0,
    tier: "Silver",
    totalSpent: 0,
    ordersCount: 0,
    benefits: TIER_BENEFITS.Silver,
  })

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`loyalty_${user.id}`)
      if (saved) {
        setLoyaltyData(JSON.parse(saved))
      }
    }
  }, [user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`loyalty_${user.id}`, JSON.stringify(loyaltyData))
    }
  }, [loyaltyData, user])

  const calculateTier = (totalSpent: number): MembershipTier => {
    if (totalSpent >= TIER_THRESHOLDS.Titanium) return "Titanium"
    if (totalSpent >= TIER_THRESHOLDS.Platinum) return "Platinum"
    if (totalSpent >= TIER_THRESHOLDS.Gold) return "Gold"
    return "Silver"
  }

  const addPoints = (amount: number) => {
    const pointsEarned = Math.floor(amount * 0.01)
    const newTotalSpent = loyaltyData.totalSpent + amount
    const newTier = calculateTier(newTotalSpent)

    setLoyaltyData((prev) => ({
      ...prev,
      points: prev.points + pointsEarned,
      totalSpent: newTotalSpent,
      ordersCount: prev.ordersCount + 1,
      tier: newTier,
      benefits: TIER_BENEFITS[newTier],
    }))

    if (newTier !== loyaltyData.tier) {
      toast({
        title: `🎉 Chúc mừng nâng hạng ${newTier}!`,
        description: `Bạn đã đạt hạng thành viên ${newTier}`,
      })
    }
  }

  const redeemPoints = (points: number): number => {
    if (loyaltyData.points < points) {
      toast({
        title: "Không đủ điểm",
        description: "Bạn không có đủ điểm để đổi",
        variant: "destructive",
      })
      return 0
    }

    const discount = points * 100
    setLoyaltyData((prev) => ({
      ...prev,
      points: prev.points - points,
    }))

    toast({
      title: "Đổi điểm thành công",
      description: `Đã đổi ${points} điểm thành ${discount.toLocaleString("vi-VN")}đ`,
    })

    return discount
  }

  const getTierBenefits = (tier: MembershipTier) => TIER_BENEFITS[tier]

  const getDiscountRate = () => {
    const rates = { Silver: 0, Gold: 0.05, Platinum: 0.1, Titanium: 0.15 }
    return rates[loyaltyData.tier]
  }

  return (
    <LoyaltyContext.Provider value={{ loyaltyData, addPoints, redeemPoints, getTierBenefits, getDiscountRate }}>
      {children}
    </LoyaltyContext.Provider>
  )
}

export function useLoyalty() {
  const context = useContext(LoyaltyContext)
  if (!context) {
    throw new Error("useLoyalty must be used within LoyaltyProvider")
  }
  return context
}
