"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")

  if (!user) {
    router.push("/login")
    return null
  }

  const handleSave = () => {
    toast({
      title: "Đã lưu thay đổi",
      description: "Thông tin tài khoản của bạn đã được cập nhật.",
    })
    setIsEditing(false)
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl mb-2">Tài khoản của tôi</h1>
          <p className="text-muted-foreground">Quản lý thông tin cá nhân và cài đặt tài khoản</p>
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline">Thay đổi ảnh</Button>
                <p className="text-sm text-muted-foreground mt-2">JPG, PNG hoặc GIF. Tối đa 2MB.</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="flex gap-4">
              {isEditing ? (
                <>
                  <Button onClick={handleSave}>Lưu thay đổi</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Hủy
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Chỉnh sửa</Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Security Card */}
        <Card>
          <CardHeader>
            <CardTitle>Bảo mật</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Mật khẩu</div>
                <div className="text-sm text-muted-foreground">Thay đổi mật khẩu của bạn</div>
              </div>
              <Button variant="outline">Đổi mật khẩu</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Xác thực hai yếu tố</div>
                <div className="text-sm text-muted-foreground">Tăng cường bảo mật tài khoản</div>
              </div>
              <Button variant="outline">Kích hoạt</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
