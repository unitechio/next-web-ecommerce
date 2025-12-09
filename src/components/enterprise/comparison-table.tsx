import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import Link from "next/link"

export function ComparisonTable() {
  const features = [
    { name: "Số người dùng", starter: "5", pro: "20", enterprise: "Không giới hạn" },
    { name: "Lưu trữ", starter: "10GB", pro: "100GB", enterprise: "Không giới hạn" },
    { name: "API calls/tháng", starter: "1,000", pro: "50,000", enterprise: "Không giới hạn" },
    { name: "Hỗ trợ", starter: "Email", pro: "Email & Chat", enterprise: "24/7 + CSM" },
    { name: "SSO/SAML", starter: false, pro: false, enterprise: true },
    { name: "Custom deployment", starter: false, pro: false, enterprise: true },
    { name: "SLA", starter: "95%", pro: "99%", enterprise: "99.99%" },
    { name: "Audit logs", starter: false, pro: "30 ngày", enterprise: "Không giới hạn" },
    { name: "Advanced analytics", starter: false, pro: true, enterprise: true },
    { name: "White-label", starter: false, pro: false, enterprise: true },
    { name: "Đào tạo", starter: false, pro: "Online", enterprise: "On-site" },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left font-semibold">Tính năng</th>
            <th className="p-4 text-center">
              <div className="mb-2 text-lg font-semibold">Starter</div>
              <div className="text-2xl font-bold">500K</div>
              <div className="text-sm text-muted-foreground">đ/tháng</div>
            </th>
            <th className="p-4 text-center">
              <div className="mb-2">
                <Badge variant="secondary">Phổ biến</Badge>
              </div>
              <div className="text-lg font-semibold">Professional</div>
              <div className="text-2xl font-bold">1.5M</div>
              <div className="text-sm text-muted-foreground">đ/tháng</div>
            </th>
            <th className="p-4 text-center">
              <div className="mb-2 text-lg font-semibold">Enterprise</div>
              <div className="text-2xl font-bold">Liên hệ</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={index} className="border-b">
              <td className="p-4">{feature.name}</td>
              <td className="p-4 text-center">
                {typeof feature.starter === "boolean" ? (
                  feature.starter ? (
                    <Check className="mx-auto h-5 w-5 text-accent" />
                  ) : (
                    <X className="mx-auto h-5 w-5 text-muted-foreground" />
                  )
                ) : (
                  <span>{feature.starter}</span>
                )}
              </td>
              <td className="p-4 text-center">
                {typeof feature.pro === "boolean" ? (
                  feature.pro ? (
                    <Check className="mx-auto h-5 w-5 text-accent" />
                  ) : (
                    <X className="mx-auto h-5 w-5 text-muted-foreground" />
                  )
                ) : (
                  <span>{feature.pro}</span>
                )}
              </td>
              <td className="p-4 text-center">
                {typeof feature.enterprise === "boolean" ? (
                  feature.enterprise ? (
                    <Check className="mx-auto h-5 w-5 text-accent" />
                  ) : (
                    <X className="mx-auto h-5 w-5 text-muted-foreground" />
                  )
                ) : (
                  <span className="font-semibold">{feature.enterprise}</span>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td className="p-4"></td>
            <td className="p-4 text-center">
              <Button variant="outline" asChild>
                <Link href="/pricing">Bắt đầu</Link>
              </Button>
            </td>
            <td className="p-4 text-center">
              <Button asChild>
                <Link href="/pricing">Bắt đầu</Link>
              </Button>
            </td>
            <td className="p-4 text-center">
              <Button asChild>
                <Link href="/enterprise/quote">Liên hệ</Link>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
