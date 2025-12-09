// ... existing imports ...
import type { Product } from "./product" // Assuming Product is declared in another file

export interface ExtendedProduct extends Product {
  stock?: number
  specs?: Record<string, string>
  videoUrl?: string
  configurableOptions?: {
    [key: string]: Array<{
      label: string
      value: number
      price: number
    }>
  }
  bundleWith?: number[]
  relatedProducts?: number[]
  /* Added detailed product information fields */
  features?: string[]
  benefits?: string[]
  useCases?: string[]
  targetAudience?: string[]
  roi?: string
  implementation?: string
  reviews?: Array<{
    author: string
    rating: number
    text: string
  }>
  comparison?: {
    feature: string
    viettech: string
    competitor: string
  }[]
}

export const productsData: ExtendedProduct[] = [
  {
    id: 1,
    name: "VietTech CRM",
    category: "Quản lý khách hàng",
    description: "Quản lý quan hệ khách hàng toàn diện, tự động hóa quy trình bán hàng và chăm sóc khách hàng.",
    price: 1275000,
    originalPrice: 1500000,
    discount: 15,
    image: "/crm-software-dashboard.jpg",
    featured: true,
    stock: 50,
    /* Added comprehensive product details */
    features: [
      "Quản lý contact 360 độ với lịch sử tương tác",
      "Sales pipeline trực quan với drag-drop kanban",
      "Tự động hóa email marketing và follow-up",
      "Dự báo doanh số AI-powered",
      "Tích hợp Zalo, Facebook, SMS",
      "Mobile app đầy đủ tính năng",
      "Report & Analytics real-time",
    ],
    benefits: [
      "Tăng tỷ lệ chuyển đổi 35%",
      "Giảm thời gian sales cycle 40%",
      "Tăng customer lifetime value 50%",
      "ROI 300% trong 6 tháng",
    ],
    useCases: [
      "Công ty bán hàng B2B",
      "Doanh nghiệp bất động sản",
      "Tư vấn và dịch vụ chuyên nghiệp",
      "Startup trong giai đoạn tăng trưởng",
    ],
    targetAudience: ["SME", "Enterprise", "Startup", "Reseller"],
    roi: "300% trong 6 tháng",
    implementation: "2-4 tuần",
    reviews: [
      {
        author: "Nguyễn Văn A - CEO TechCorp",
        rating: 5,
        text: "CRM VietTech đã giúp team sales của chúng tôi tăng productivity 40%. Giao diện thân thiện, dễ sử dụng.",
      },
      {
        author: "Trần Thị B - Sales Manager",
        rating: 5,
        text: "Tuyệt vời! Automation email tiết kiệm cho chúng tôi 5 tiếng/ngày. Highly recommended!",
      },
    ],
    specs: {
      users: "100 users",
      storage: "500GB",
      support: "24/7 Premium",
      api: "Unlimited API calls",
    },
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    configurableOptions: {
      users: [
        { label: "50 users", value: 50, price: 0 },
        { label: "100 users", value: 100, price: 200000 },
        { label: "250 users", value: 250, price: 500000 },
        { label: "Unlimited", value: -1, price: 1000000 },
      ],
      storage: [
        { label: "100GB", value: 100, price: 0 },
        { label: "500GB", value: 500, price: 100000 },
        { label: "1TB", value: 1000, price: 250000 },
        { label: "5TB", value: 5000, price: 600000 },
      ],
    },
    bundleWith: [2, 3],
    relatedProducts: [2, 4, 5],
  },
  // ... existing products data, with similar enhanced details ...
  {
    id: 2,
    name: "VietTech Analytics",
    category: "Phân tích dữ liệu",
    description: "Phân tích dữ liệu chuyên sâu với AI, tạo báo cáo và dự đoán xu hướng kinh doanh.",
    price: 1700000,
    originalPrice: 2000000,
    discount: 15,
    image: "/analytics-dashboard.png",
    featured: true,
    features: ["Real-time dashboards", "AI predictive analytics", "Custom reports", "Data visualization"],
    benefits: ["Quyết định dựa trên dữ liệu", "Phát hiện cơ hội mới", "Tối ưu hóa chi phí"],
    useCases: ["Retail", "E-commerce", "Financial Services"],
    targetAudience: ["Enterprise", "Mid-market"],
    roi: "250% trong 6 tháng",
    implementation: "3-5 tuần",
  },
  {
    id: 3,
    name: "VietTech Marketing",
    category: "Marketing tự động",
    description: "Công cụ marketing tự động hóa, email marketing, và quản lý chiến dịch đa kênh.",
    price: 960000,
    originalPrice: 1200000,
    discount: 20,
    image: "/marketing-automation-concept.png",
    featured: false,
    features: ["Email marketing", "Social media scheduling", "Lead nurturing", "Campaign analytics"],
    benefits: ["Tăng engagement 60%", "Giảm churn 25%", "ROI cao"],
    useCases: ["SaaS", "E-commerce", "Service providers"],
    targetAudience: ["SME", "Startup"],
    roi: "280% trong 6 tháng",
    implementation: "2-3 tuần",
  },
  {
    id: 4,
    name: "VietTech HRM",
    category: "Quản lý nhân sự",
    description: "Quản lý nhân sự toàn diện từ tuyển dụng, đào tạo đến đánh giá hiệu suất.",
    price: 1530000,
    originalPrice: 1800000,
    discount: 15,
    image: "/hrm-software.jpg",
    featured: false,
    features: ["Recruitment", "Payroll", "Performance management", "Learning management"],
    benefits: ["Giảm turnover 20%", "Tăng employee satisfaction", "Tối ưu payroll"],
    useCases: ["Manufacturing", "Retail", "Services"],
    targetAudience: ["SME", "Enterprise"],
    roi: "320% trong 6 tháng",
    implementation: "4-6 tuần",
  },
  {
    id: 5,
    name: "VietTech ERP",
    category: "Hoạch định nguồn lực",
    description: "Hệ thống hoạch định nguồn lực doanh nghiệp tích hợp, quản lý toàn bộ quy trình.",
    price: 2975000,
    originalPrice: 3500000,
    discount: 15,
    image: "/erp-system.jpg",
    featured: true,
    features: ["Inventory management", "Finance", "Supply chain", "Production planning"],
    benefits: ["Tối ưu inventory 30%", "Giảm cost 20%", "Tăng efficiency"],
    useCases: ["Manufacturing", "Wholesale", "Distribution"],
    targetAudience: ["Enterprise", "Large SME"],
    roi: "350% trong 6 tháng",
    implementation: "8-12 tuần",
  },
  {
    id: 6,
    name: "VietTech E-commerce",
    category: "Thương mại điện tử",
    description: "Nền tảng thương mại điện tử hoàn chỉnh, tích hợp thanh toán và vận chuyển.",
    price: 2000000,
    originalPrice: 2500000,
    discount: 20,
    image: "/ecommerce-platform-concept.png",
    featured: false,
    features: ["Multi-channel selling", "Inventory sync", "Payment gateway", "Shipping integration"],
    benefits: ["Tăng sales 50%", "Omnichannel experience", "Quản lý tập trung"],
    useCases: ["Retail", "Fashion", "Electronics"],
    targetAudience: ["SME", "Startup"],
    roi: "400% trong 6 tháng",
    implementation: "3-6 tuần",
  },
]
