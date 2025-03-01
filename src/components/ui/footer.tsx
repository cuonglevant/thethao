import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  {
    title: "TIỆN ÍCH BÓNG ĐÁ",
    links: [
      { text: "Lịch thi đấu bóng đá", href: "/lich-thi-dau" },
      { text: "Kết quả bóng đá", href: "/ket-qua" },
      { text: "Nhận định bóng đá", href: "/nhan-dinh" },
      { text: "Tỷ số bóng đá", href: "/ty-so" },
      { text: "Trực tiếp bóng đá", href: "/truc-tiep" },
      { text: "Chuyển nhượng bóng đá", href: "/chuyen-nhuong" },
      { text: "Video thể thao", href: "/video" },
    ],
  },
  {
    title: "GIẢI ĐẤU NỔI BẬT",
    links: [
      { text: "Ngoại hạng Anh", href: "/ngoai-hang-anh" },
      { text: "Cúp C1", href: "/cup-c1" },
      { text: "La Liga", href: "/la-liga" },
      { text: "Serie A", href: "/serie-a" },
      { text: "Bundesliga", href: "/bundesliga" },
      { text: "V League", href: "/v-league" },
      { text: "World Cup", href: "/world-cup" },
      { text: "Euro", href: "/euro" },
      { text: "Asian Cup", href: "/asian-cup" },
      { text: "Cúp C2", href: "/cup-c2" },
      { text: "SEA Games", href: "/sea-games" },
      { text: "AFF Cup", href: "/aff-cup" },
      { text: "Bóng đá Việt Nam", href: "/bong-da-viet-nam" },
    ],
  },
  {
    title: "BẢNG XẾP HẠNG BÓNG ĐÁ",
    links: [
      { text: "BXH Ngoại hạng Anh", href: "/bxh-ngoai-hang-anh" },
      { text: "BXH La Liga", href: "/bxh-la-liga" },
      { text: "BXH Ý", href: "/bxh-serie-a" },
      { text: "BXH Cúp C1", href: "/bxh-cup-c1" },
      { text: "BXH Cúp C2", href: "/bxh-cup-c2" },
      { text: "BXH Đức", href: "/bxh-bundesliga" },
      { text: "BXH Pháp", href: "/bxh-ligue-1" },
      { text: "BXH V League", href: "/bxh-v-league" },
    ],
  },
  {
    title: "KẾT QUẢ BÓNG ĐÁ",
    links: [
      { text: "Kết quả Cúp C1", href: "/ket-qua-cup-c1" },
      { text: "Kết quả Ngoại hạng Anh", href: "/ket-qua-ngoai-hang-anh" },
      { text: "Kết quả bóng đá Ý", href: "/ket-qua-serie-a" },
      { text: "Kết quả bóng đá Tây Ban Nha", href: "/ket-qua-la-liga" },
      { text: "Kết quả bóng đá Đức", href: "/ket-qua-bundesliga" },
      { text: "Kết quả bóng đá Pháp", href: "/ket-qua-ligue-1" },
      { text: "Kết quả Cúp C2", href: "/ket-qua-cup-c2" },
    ],
  },
  {
    title: "THỂ THAO TỔNG HỢP",
    links: [
      { text: "Bóng chuyền", href: "/bong-chuyen" },
      { text: "Quần vợt", href: "/quan-vot" },
      { text: "Esports", href: "/esports" },
      { text: "Xe cộ", href: "/xe" },
      { text: "Võ", href: "/vo" },
    ],
  },
];

export function Footer() {
  return (
    <footer>
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="text-blue-800 font-bold text-sm mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-blue-600"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <Image
                src="/logo.png"
                alt="TheThao247"
                width={200}
                height={50}
                className="mb-4"
              />
              <p className="text-sm text-gray-600 mb-2">
                Công ty TNHH MTV GenPress
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Giấy phép thiết lập MXH số 365/GP-BTTTT, Ký ngày 4/12/2024
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Địa chỉ Hà Nội:</strong> Tầng 04, Tòa nhà Star, Lô D32
                KĐT Cầu Giấy, Đường Dương Đình Nghệ, Yên Hòa, Cầu Giấy, Hà Nội.
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Điện thoại:</strong> 0847100247
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> contact@thethao247.vn
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-gray-800 font-bold mb-4">SOCIAL</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://youtube.com"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Youtube
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://facebook.com"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://twitter.com"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    href="/rss"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    RSS
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://tiktok.com"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Tiktok
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Info */}
            <div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/thoa-thuan"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Thỏa thuận chia sẻ nội dung
                  </Link>
                </li>
                <li>
                  <Link
                    href="/chinh-sach"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Chính sách bảo mật
                  </Link>
                </li>
                <li className="text-sm text-gray-600">
                  Báo giá quảng cáo:{" "}
                  <Link
                    href="/tai-day"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Tại đây
                  </Link>
                </li>
                <li className="text-sm text-gray-600">
                  Liên hệ quảng cáo, truyền thông, hợp tác kinh doanh: 0985 233
                  950
                </li>
                <li className="text-sm text-gray-600">
                  <strong>VPGD:</strong> Tầng 4, số 248 Lương Thế Vinh, Trung
                  Văn, Nam Từ Liêm, Hà Nội.
                </li>
              </ul>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  © LANGTUCCAU 2024 . All Rights Reserved.
                </p>
                <Link
                  href="https://www.dmca.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/dmca-badge.png"
                    alt="DMCA.com Protection Status"
                    width={100}
                    height={20}
                    className="mt-2"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
