// Invoice PDF Generator using HTML canvas and base64
export interface InvoiceData {
  id: string
  date: string
  customer: {
    name: string
    email: string
    phone: string
    address: string
  }
  items: Array<{
    name: string
    quantity: number
    price: number
    discount: number
  }>
  subtotal: number
  discount: number
  tax: number
  total: number
  payment: {
    method: string
    transactionId: string
  }
}

export function generateInvoiceHTML(data: InvoiceData): string {
  const discountedTotal = data.subtotal - data.discount

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Hóa đơn #${data.id}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
    .header { text-align: center; margin-bottom: 40px; }
    .company { font-size: 24px; font-weight: bold; color: #8b5cf6; }
    .invoice-title { font-size: 32px; font-weight: bold; margin: 20px 0; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 30px 0; }
    .info-box { padding: 15px; background: #f9fafb; border-radius: 8px; }
    .info-label { color: #6b7280; font-size: 12px; margin-bottom: 5px; }
    .info-value { font-weight: 600; }
    table { width: 100%; border-collapse: collapse; margin: 30px 0; }
    th { background: #8b5cf6; color: white; padding: 12px; text-align: left; }
    td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
    .text-right { text-align: right; }
    .totals { margin-left: auto; width: 300px; }
    .totals-row { display: flex; justify-content: space-between; padding: 8px 0; }
    .totals-row.final { border-top: 2px solid #8b5cf6; font-size: 18px; font-weight: bold; color: #8b5cf6; padding-top: 12px; margin-top: 8px; }
    .footer { margin-top: 50px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="company">VIETTECH SOLUTIONS</div>
    <p>123 Đường Nguyễn Huệ, Quận 1, TP.HCM</p>
    <p>Email: invoice@viettech.com | Phone: +84 901 234 567</p>
  </div>

  <div class="invoice-title">HÓA ĐƠN #${data.id}</div>

  <div class="info-grid">
    <div class="info-box">
      <div class="info-label">KHÁCH HÀNG</div>
      <div class="info-value">${data.customer.name}</div>
      <div>${data.customer.email}</div>
      <div>${data.customer.phone}</div>
      <div>${data.customer.address}</div>
    </div>
    <div class="info-box">
      <div class="info-label">THÔNG TIN HÓA ĐƠN</div>
      <div class="info-value">Ngày: ${new Date(data.date).toLocaleDateString("vi-VN")}</div>
      <div>Phương thức: ${data.payment.method}</div>
      <div>Mã GD: ${data.payment.transactionId}</div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Sản phẩm</th>
        <th class="text-right">Số lượng</th>
        <th class="text-right">Đơn giá</th>
        <th class="text-right">Giảm giá</th>
        <th class="text-right">Thành tiền</th>
      </tr>
    </thead>
    <tbody>
      ${data.items
        .map(
          (item) => `
        <tr>
          <td>${item.name}</td>
          <td class="text-right">${item.quantity}</td>
          <td class="text-right">${item.price.toLocaleString("vi-VN")}đ</td>
          <td class="text-right">${item.discount}%</td>
          <td class="text-right">${(item.price * item.quantity * (1 - item.discount / 100)).toLocaleString("vi-VN")}đ</td>
        </tr>
      `,
        )
        .join("")}
    </tbody>
  </table>

  <div class="totals">
    <div class="totals-row">
      <span>Tạm tính:</span>
      <span>${data.subtotal.toLocaleString("vi-VN")}đ</span>
    </div>
    ${
      data.discount > 0
        ? `
    <div class="totals-row">
      <span>Giảm giá:</span>
      <span>-${data.discount.toLocaleString("vi-VN")}đ</span>
    </div>
    `
        : ""
    }
    <div class="totals-row">
      <span>Thuế VAT (8%):</span>
      <span>${data.tax.toLocaleString("vi-VN")}đ</span>
    </div>
    <div class="totals-row final">
      <span>TỔNG CỘNG:</span>
      <span>${data.total.toLocaleString("vi-VN")}đ</span>
    </div>
  </div>

  <div class="footer">
    <p><strong>Cảm ơn quý khách đã sử dụng dịch vụ của VietTech Solutions!</strong></p>
    <p>Mọi thắc mắc xin liên hệ: support@viettech.com hoặc +84 901 234 567</p>
  </div>
</body>
</html>
  `
}

export function downloadInvoice(data: InvoiceData) {
  const html = generateInvoiceHTML(data)
  const blob = new Blob([html], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `invoice-${data.id}.html`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
