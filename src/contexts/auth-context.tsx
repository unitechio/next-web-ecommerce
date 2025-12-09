"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: number
  name: string
  email: string
  avatar?: string
  role: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const isAdminUser = email === "admin@viettech.com" || email === "admin@example.com"

    const mockUser: User = {
      id: isAdminUser ? 999 : 1,
      name: isAdminUser ? "Admin VietTech" : "Người dùng VietTech",
      email,
      avatar: "/placeholder.svg?height=100&width=100",
      role: isAdminUser ? "admin" : "user",
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    setIsLoading(false)

    toast({
      title: "Đăng nhập thành công",
      description: `Chào mừng trở lại, ${mockUser.name}!`,
    })
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: Math.floor(Math.random() * 1000),
      name,
      email,
      avatar: "/placeholder.svg?height=100&width=100",
      role: "user",
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    setIsLoading(false)

    toast({
      title: "Đăng ký thành công",
      description: `Chào mừng ${name} đến với VietTech!`,
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    toast({
      title: "Đã đăng xuất",
      description: "Hẹn gặp lại bạn!",
    })
  }

  const isAdmin = user?.role === "admin"

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
