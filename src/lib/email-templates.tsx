// Email Templates for different scenarios

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

// 1. Welcome / Registration Email
export function getWelcomeEmail(name: string): EmailTemplate {
  return {
    subject: "Chào mừng bạn đến với VietTech Solutions!",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
            .button { display: inline-block; background: #8b5cf6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Chào mừng đến với VietTech!</h1>
            </div>
            <div class="content">
              <p>Xin chào <strong>${name}</strong>,</p>
              <p>Cảm ơn bạn đã đăng ký tài khoản tại VietTech Solutions. Chúng tôi rất vui mừng được đồng hành cùng bạn!</p>
              <p>Với tài khoản VietTech, bạn có thể:</p>
              <ul>
                <li>Truy cập đầy đủ các sản phẩm và dịch vụ</li>
                <li>Quản lý đơn hàng và thanh toán dễ dàng</li>
                <li>Nhận ưu đãi và chương trình khuyến mãi độc quyền</li>
                <li>Hỗ trợ kỹ thuật 24/7</li>
              </ul>
              <center>
                <a href="https://viettech.com/dashboard" class="button">Truy cập tài khoản</a>
              </center>
              <p>Nếu bạn cần hỗ trợ, đừng ngần ngại liên hệ với chúng tôi qua email support@viettech.com hoặc hotline +84 901 234 567.</p>
              <p>Trân trọng,<br><strong>Đội ngũ VietTech Solutions</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 VietTech Solutions. All rights reserved.</p>
              <p>123 Đường Nguyễn Huệ, Quận 1, TP.HCM</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Xin chào ${name}, Cảm ơn bạn đã đăng ký tài khoản tại VietTech Solutions...`,
  }
}

// 2. Password Reset Email
export function getPasswordResetEmail(name: string, resetLink: string): EmailTemplate {
  return {
    subject: "Yêu cầu đặt lại mật khẩu - VietTech",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #dc2626; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
            .button { display: inline-block; background: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .warning { background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Đặt lại mật khẩu</h1>
            </div>
            <div class="content">
              <p>Xin chào <strong>${name}</strong>,</p>
              <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
              <center>
                <a href="${resetLink}" class="button">Đặt lại mật khẩu</a>
              </center>
              <div class="warning">
                <strong>⚠️ Lưu ý quan trọng:</strong>
                <ul>
                  <li>Link này chỉ có hiệu lực trong 1 giờ</li>
                  <li>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này</li>
                  <li>Không chia sẻ link này với bất kỳ ai</li>
                </ul>
              </div>
              <p>Nếu bạn gặp khó khăn, liên hệ ngay với chúng tôi: support@viettech.com</p>
              <p>Trân trọng,<br><strong>Đội ngũ VietTech Solutions</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 VietTech Solutions.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Xin chào ${name}, Chúng tôi nhận được yêu cầu đặt lại mật khẩu. Link: ${resetLink}`,
  }
}

// 3. Order Confirmation Email
export function getOrderConfirmationEmail(
  name: string,
  orderId: string,
  total: number,
  items: Array<{ name: string; quantity: number }>,
): EmailTemplate {
  return {
    subject: `Xác nhận đơn hàng #${orderId} - VietTech`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
            .order-box { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .item { padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .total { font-size: 24px; color: #8b5cf6; font-weight: bold; text-align: right; margin-top: 20px; }
            .button { display: inline-block; background: #8b5cf6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✓ Đặt hàng thành công!</h1>
            </div>
            <div class="content">
              <p>Xin chào <strong>${name}</strong>,</p>
              <p>Cảm ơn bạn đã đặt hàng tại VietTech Solutions. Đơn hàng của bạn đã được xác nhận và đang được xử lý.</p>
              
              <div class="order-box">
                <h3>Đơn hàng #${orderId}</h3>
                ${items.map((item) => `<div class="item">${item.name} x${item.quantity}</div>`).join("")}
                <div class="total">Tổng: ${total.toLocaleString("vi-VN")}đ</div>
              </div>

              <p>Bạn có thể theo dõi trạng thái đơn hàng tại:</p>
              <center>
                <a href="https://viettech.com/orders/${orderId}" class="button">Xem đơn hàng</a>
              </center>

              <p><strong>Thời gian dự kiến:</strong> 3-5 ngày làm việc</p>
              <p>Chúng tôi sẽ gửi email thông báo khi đơn hàng được giao.</p>
              
              <p>Trân trọng,<br><strong>Đội ngũ VietTech Solutions</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 VietTech Solutions.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Xin chào ${name}, Đơn hàng #${orderId} của bạn đã được xác nhận. Tổng: ${total.toLocaleString("vi-VN")}đ`,
  }
}

// 4. System Error Email (for admins)
export function getSystemErrorEmail(errorType: string, errorMessage: string, timestamp: string): EmailTemplate {
  return {
    subject: `🚨 System Error: ${errorType}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Courier New', monospace; color: #333; }
            .container { max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { background: #dc2626; color: white; padding: 20px; }
            .error-box { background: #1f2937; color: #10b981; padding: 20px; font-family: monospace; border-radius: 8px; margin: 20px 0; overflow-x: auto; }
            .timestamp { color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚨 System Error Alert</h1>
            </div>
            <div style="padding: 20px; background: white;">
              <p><strong>Error Type:</strong> ${errorType}</p>
              <p class="timestamp"><strong>Timestamp:</strong> ${timestamp}</p>
              <div class="error-box">
                <pre>${errorMessage}</pre>
              </div>
              <p><strong>Action Required:</strong> Please investigate and resolve this issue immediately.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `System Error: ${errorType}\n${errorMessage}\nTimestamp: ${timestamp}`,
  }
}

// 5. Customer Appreciation Email
export function getAppreciationEmail(name: string, loyaltyPoints: number): EmailTemplate {
  return {
    subject: "Cảm ơn sự đồng hành của bạn! 🎉",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 40px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
            .points-box { background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: white; padding: 30px; text-align: center; border-radius: 8px; margin: 20px 0; }
            .points { font-size: 48px; font-weight: bold; }
            .gift { font-size: 48px; margin-bottom: 10px; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="gift">🎁</div>
              <h1>Tri ân khách hàng thân thiết!</h1>
            </div>
            <div class="content">
              <p>Kính gửi <strong>${name}</strong>,</p>
              <p>Cảm ơn bạn đã tin tưởng và đồng hành cùng VietTech Solutions trong thời gian qua!</p>
              
              <div class="points-box">
                <p>Điểm thưởng của bạn</p>
                <div class="points">${loyaltyPoints.toLocaleString()}</div>
                <p>Loyalty Points</p>
              </div>

              <p><strong>Ưu đãi đặc biệt dành cho bạn:</strong></p>
              <ul>
                <li>Giảm 20% cho đơn hàng tiếp theo</li>
                <li>Miễn phí nâng cấp gói Professional 3 tháng</li>
                <li>Ưu tiên hỗ trợ kỹ thuật VIP</li>
                <li>Tham gia sự kiện khách hàng thân thiết độc quyền</li>
              </ul>

              <p>Sự hài lòng của bạn là động lực lớn nhất để chúng tôi không ngừng cải thiện dịch vụ!</p>
              
              <p>Trân trọng,<br><strong>Ban Giám Đốc VietTech Solutions</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 VietTech Solutions. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Kính gửi ${name}, Cảm ơn bạn đã đồng hành cùng VietTech. Bạn có ${loyaltyPoints} điểm thưởng!`,
  }
}

// 6. Event/Webinar Invitation Email
export function getEventInvitationEmail(
  name: string,
  eventName: string,
  eventDate: string,
  eventLink: string,
): EmailTemplate {
  return {
    subject: `🎯 Mời tham gia: ${eventName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 40px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
            .event-card { background: #f9fafb; border-left: 4px solid #8b5cf6; padding: 20px; margin: 20px 0; }
            .button { display: inline-block; background: #8b5cf6; color: white; padding: 15px 40px; text-decoration: none; border-radius: 6px; font-weight: bold; }
            .calendar-icon { font-size: 64px; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="calendar-icon">📅</div>
              <h1>Sự kiện đặc biệt</h1>
            </div>
            <div class="content">
              <p>Xin chào <strong>${name}</strong>,</p>
              <p>Chúng tôi rất vui được mời bạn tham gia sự kiện:</p>
              
              <div class="event-card">
                <h2>${eventName}</h2>
                <p><strong>📅 Thời gian:</strong> ${eventDate}</p>
                <p><strong>💻 Hình thức:</strong> Online Webinar</p>
                <p><strong>🎁 Đặc biệt:</strong> Miễn phí cho khách hàng VietTech</p>
              </div>

              <p><strong>Bạn sẽ học được gì:</strong></p>
              <ul>
                <li>Xu hướng công nghệ mới nhất 2025</li>
                <li>Best practices từ chuyên gia hàng đầu</li>
                <li>Case study thực tế từ doanh nghiệp</li>
                <li>Q&A trực tiếp với diễn giả</li>
              </ul>

              <center>
                <a href="${eventLink}" class="button">ĐĂNG KÝ NGAY</a>
              </center>

              <p style="margin-top: 20px;"><em>Số lượng chỗ có hạn. Đăng ký sớm để đảm bảo suất tham dự!</em></p>
              
              <p>Hẹn gặp bạn tại sự kiện!<br><strong>Đội ngũ VietTech Solutions</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 VietTech Solutions.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Xin chào ${name}, Mời bạn tham gia sự kiện: ${eventName} - ${eventDate}. Link: ${eventLink}`,
  }
}

// Helper function to send emails (mock implementation)
export async function sendEmail(to: string, template: EmailTemplate): Promise<boolean> {
  console.log(`Sending email to ${to}:`, template.subject)
  // In production, integrate with email service (SendGrid, AWS SES, etc.)
  return true
}
