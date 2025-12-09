import { Card, CardContent } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold md:text-5xl">Điều khoản dịch vụ</h1>
          <p className="text-muted-foreground">Cập nhật lần cuối: 15 tháng 1, 2025</p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-6">
            <section className="space-y-3">
              <h2 className="text-2xl font-bold">1. Chấp nhận điều khoản</h2>
              <p className="text-muted-foreground leading-relaxed">
                Bằng việc truy cập và sử dụng dịch vụ của VietTech, bạn đồng ý tuân thủ và bị ràng buộc bởi các điều
                khoản và điều kiện này. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, bạn không được
                phép sử dụng dịch vụ của chúng tôi.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">2. Sử dụng dịch vụ</h2>
              <p className="text-muted-foreground leading-relaxed">
                Bạn đồng ý sử dụng dịch vụ của chúng tôi chỉ cho các mục đích hợp pháp và theo cách không vi phạm quyền
                của bất kỳ bên thứ ba nào. Bạn không được:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Sử dụng dịch vụ cho các mục đích bất hợp pháp hoặc trái phép</li>
                <li>Vi phạm bất kỳ luật pháp hiện hành nào</li>
                <li>Gửi hoặc truyền tải virus hoặc mã độc hại</li>
                <li>Can thiệp hoặc làm gián đoạn dịch vụ</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">3. Tài khoản người dùng</h2>
              <p className="text-muted-foreground leading-relaxed">
                Khi tạo tài khoản với chúng tôi, bạn phải cung cấp thông tin chính xác và đầy đủ. Bạn chịu trách nhiệm
                duy trì tính bảo mật của tài khoản và mật khẩu của mình, và chịu trách nhiệm về tất cả các hoạt động
                diễn ra dưới tài khoản của bạn.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">4. Thanh toán và hoàn tiền</h2>
              <p className="text-muted-foreground leading-relaxed">
                Tất cả các khoản thanh toán được xử lý an toàn. Chúng tôi cung cấp chính sách hoàn tiền trong vòng 14
                ngày đầu tiên nếu bạn không hài lòng với dịch vụ. Sau thời gian này, tất cả các khoản thanh toán là
                không thể hoàn lại.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">5. Sở hữu trí tuệ</h2>
              <p className="text-muted-foreground leading-relaxed">
                Dịch vụ và nội dung gốc của nó, tính năng và chức năng là và sẽ vẫn là tài sản độc quyền của VietTech và
                các nhà cấp phép của nó. Dịch vụ được bảo vệ bởi bản quyền, thương hiệu và các luật khác.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">6. Giới hạn trách nhiệm</h2>
              <p className="text-muted-foreground leading-relaxed">
                VietTech sẽ không chịu trách nhiệm về bất kỳ thiệt hại gián tiếp, ngẫu nhiên, đặc biệt, hậu quả hoặc
                trừng phạt nào, bao gồm nhưng không giới hạn ở mất lợi nhuận, dữ liệu, sử dụng, thiện chí hoặc các tổn
                thất vô hình khác.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">7. Thay đổi điều khoản</h2>
              <p className="text-muted-foreground leading-relaxed">
                Chúng tôi có quyền sửa đổi hoặc thay thế các điều khoản này bất kỳ lúc nào. Nếu có thay đổi quan trọng,
                chúng tôi sẽ thông báo ít nhất 30 ngày trước khi các điều khoản mới có hiệu lực.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">8. Liên hệ</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nếu bạn có bất kỳ câu hỏi nào về Điều khoản dịch vụ này, vui lòng liên hệ với chúng tôi tại
                legal@viettech.com hoặc qua số điện thoại +84 123 456 789.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
