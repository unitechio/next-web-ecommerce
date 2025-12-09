import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold md:text-5xl">Chính sách bảo mật</h1>
          <p className="text-muted-foreground">Cập nhật lần cuối: 15 tháng 1, 2025</p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-6">
            <section className="space-y-3">
              <h2 className="text-2xl font-bold">1. Giới thiệu</h2>
              <p className="text-muted-foreground leading-relaxed">
                VietTech cam kết bảo vệ quyền riêng tư của bạn. Chính sách bảo mật này giải thích cách chúng tôi thu
                thập, sử dụng, tiết lộ và bảo vệ thông tin của bạn khi bạn sử dụng dịch vụ của chúng tôi.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">2. Thông tin chúng tôi thu thập</h2>
              <p className="text-muted-foreground leading-relaxed">
                Chúng tôi thu thập thông tin mà bạn cung cấp trực tiếp cho chúng tôi, bao gồm:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Thông tin tài khoản (tên, email, mật khẩu)</li>
                <li>Thông tin thanh toán và giao dịch</li>
                <li>Thông tin liên hệ và hỗ trợ khách hàng</li>
                <li>Dữ liệu sử dụng và phân tích</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">3. Cách chúng tôi sử dụng thông tin</h2>
              <p className="text-muted-foreground leading-relaxed">Chúng tôi sử dụng thông tin thu thập được để:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Cung cấp, duy trì và cải thiện dịch vụ của chúng tôi</li>
                <li>Xử lý giao dịch và gửi thông báo liên quan</li>
                <li>Gửi thông tin marketing và khuyến mãi (với sự đồng ý của bạn)</li>
                <li>Phát hiện, ngăn chặn và giải quyết vấn đề kỹ thuật và bảo mật</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">4. Bảo vệ thông tin</h2>
              <p className="text-muted-foreground leading-relaxed">
                Chúng tôi thực hiện các biện pháp bảo mật hợp lý để bảo vệ thông tin của bạn khỏi truy cập, sử dụng,
                tiết lộ, thay đổi hoặc phá hủy trái phép. Điều này bao gồm mã hóa dữ liệu, kiểm soát truy cập và giám
                sát bảo mật thường xuyên.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">5. Quyền của bạn</h2>
              <p className="text-muted-foreground leading-relaxed">Bạn có quyền:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Truy cập và nhận bản sao dữ liệu cá nhân của bạn</li>
                <li>Yêu cầu sửa đổi thông tin không chính xác</li>
                <li>Yêu cầu xóa dữ liệu cá nhân của bạn</li>
                <li>Từ chối hoặc hạn chế việc xử lý dữ liệu của bạn</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">6. Liên hệ</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nếu bạn có bất kỳ câu hỏi nào về Chính sách bảo mật này, vui lòng liên hệ với chúng tôi tại
                privacy@viettech.com hoặc qua số điện thoại +84 123 456 789.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
