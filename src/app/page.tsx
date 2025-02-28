import Image from "next/image";
import Link from "next/link";
import { Send, User, UserPlus, Home } from "lucide-react";
import { MainNav } from "@/components/main-nav";

export default function Thethao247() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between w-7/12">
          <Link href="/" title="Thể thao 247">
            <Image
              src="https://thethao247.vn/frontend/images/logo2022.svg"
              alt="Thể thao 247"
              width={282}
              height={73}
            />
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              href="/quang-cao"
              className="flex items-center text-gray-600 hover:text-blue-700"
            >
              <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center mr-2">
                <span className="text-white text-xs">●</span>
              </div>
              <span className="text-sm font-medium">QUẢNG CÁO</span>
            </Link>
            <Link
              href="/gui-bai"
              className="flex items-center text-gray-600 hover:text-blue-700"
            >
              <Send size={16} className="mr-2 text-blue-600" />
              <span className="text-sm font-medium">Gửi bài</span>
            </Link>
            <button className="flex items-center px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
              <User size={16} className="mr-2" />
              <span className="text-sm font-medium">Đăng nhập</span>
            </button>
            <button className="flex items-center px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
              <UserPlus size={16} className="mr-2" />
              <span className="text-sm font-medium">Đăng ký</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Navigation */}
      <nav className="bg-[#1a3b7d] text-white py-2">
        <div className="container mx-auto px-4 w-7/12">
          <div className="flex items-center justify-between space-x-3">
            <div className=" flex items-center space-x-1 overflow-x-auto scrollbar-hide">
              <Link
                href="/"
                className="flex items-center hover:bg-blue-800 px-2 py-1 rounded"
              >
                <Home size={16} className="mr-1" />
              </Link>
              {[
                "LỊCH THI ĐẤU",
                "BÓNG ĐÁ VIỆT NAM",
                "NGOẠI HẠNG ANH",
                "BÓNG ĐÁ QUỐC TẾ",
                "NHẬN ĐỊNH",
                "CÚP C1",
                "CHUYỂN NHƯỢNG",
                "THỂ THAO",
                "ESPORTS",
                "XE",
                "XU HƯỚNG",
              ].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                  className="whitespace-nowrap hover:bg-blue-800 px-2 py-1 rounded text-sm"
                >
                  #{item}
                </Link>
              ))}
            </div>
            <MainNav />
          </div>
        </div>
      </nav>

      {/* Team Navigation */}
      <div className="bg-white py-2 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8 overflow-x-auto scrollbar-hide">
            {[
              { name: "MU", logo: "/placeholder.svg?height=24&width=24" },
              {
                name: "Liverpool",
                logo: "/placeholder.svg?height=24&width=24",
              },
              { name: "Arsenal", logo: "/placeholder.svg?height=24&width=24" },
              { name: "Man City", logo: "/placeholder.svg?height=24&width=24" },
              { name: "Chelsea", logo: "/placeholder.svg?height=24&width=24" },
              {
                name: "Barcelona",
                logo: "/placeholder.svg?height=24&width=24",
              },
              {
                name: "Real Madrid",
                logo: "/placeholder.svg?height=24&width=24",
              },
            ].map((team) => (
              <Link
                key={team.name}
                href={`/${team.name.toLowerCase().replace(/ /g, "-")}`}
                className="flex items-center"
              >
                <Image
                  src={team.logo || "/placeholder.svg"}
                  alt={team.name}
                  width={24}
                  height={24}
                  className="w-6 h-6 mr-2"
                />
                <span className="text-sm">{team.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 w-7/12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left Sidebar */}
          <div className="md:col-span-2 bg-white rounded shadow">
            <div className="border-b">
              <Link
                href="/latest"
                className="flex items-center p-3 hover:bg-gray-100"
              >
                <div className="relative">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">75</span>
                  </div>
                  <svg
                    className="w-3 h-3 absolute -bottom-1 -right-1 text-red-500 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-sm font-medium ml-3">LATEST</span>
              </Link>
              <Link
                href="/video"
                className="flex items-center p-3 hover:bg-gray-100"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="2.18"
                      ry="2.18"
                    />
                    <path d="M10 8l6 4-6 4V8z" />
                  </svg>
                </div>
                <span className="text-sm font-medium ml-3">VIDEO</span>
              </Link>
              <Link
                href="/livescore"
                className="flex items-center p-3 hover:bg-gray-100"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <path d="M8 21h8" />
                    <path d="M12 17v4" />
                  </svg>
                </div>
                <span className="text-sm font-medium ml-3">LIVESCORE</span>
              </Link>
              <Link
                href="/lich-thi-dau"
                className="flex items-center p-3 hover:bg-gray-100"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <path d="M16 2v4" />
                    <path d="M8 2v4" />
                    <path d="M3 10h18" />
                  </svg>
                </div>
                <span className="text-sm font-medium ml-3">LỊCH THI ĐẤU</span>
              </Link>
              <Link
                href="/ket-qua"
                className="flex items-center p-3 hover:bg-gray-100"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                </div>
                <span className="text-sm font-medium ml-3">KẾT QUẢ</span>
              </Link>
              <Link
                href="/bxh"
                className="flex items-center p-3 hover:bg-gray-100"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 20h14" />
                    <path d="M9 20V8" />
                    <path d="M15 20v-4" />
                    <path d="M12 20v-8" />
                  </svg>
                </div>
                <span className="text-sm font-medium ml-3">BXH</span>
              </Link>
              <Link
                href="/truc-tiep"
                className="flex items-center p-3 hover:bg-gray-100"
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0 -20 0" />
                    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                  </svg>
                  <span className="absolute -top-1 -right-1 text-[10px] font-bold text-red-500">
                    LIVE
                  </span>
                </div>
                <span className="text-sm font-medium ml-3">TRỰC TIẾP</span>
              </Link>
            </div>

            {/* League Navigation */}
            <div className="py-2">
              {[
                {
                  name: "V.LEAGUE 1",
                  logo: "/placeholder.svg?height=24&width=24",
                  bgColor: "bg-red-600",
                },
                {
                  name: "NGOẠI HẠNG ANH",
                  logo: "/placeholder.svg?height=24&width=24",
                  bgColor: "bg-[#3D195B]",
                },
                {
                  name: "V.LEAGUE 2",
                  logo: "/placeholder.svg?height=24&width=24",
                  bgColor: "bg-blue-600",
                },
                {
                  name: "CUP C1",
                  logo: "/placeholder.svg?height=24&width=24",
                  bgColor: "bg-black",
                },
                {
                  name: "LA LIGA",
                  logo: "/placeholder.svg?height=24&width=24",
                  bgColor: "bg-[#EE2744]",
                },
                {
                  name: "LIGUE 1",
                  logo: "/placeholder.svg?height=24&width=24",
                  bgColor: "bg-[#091C3E]",
                },
                {
                  name: "BUNDESLIGA",
                  logo: "/placeholder.svg?height=24&width=24",
                  bgColor: "bg-[#D20515]",
                },
                {
                  name: "SERIE A",
                  logo: "/placeholder.svg?height=24&width=24",
                  bgColor: "bg-[#024494]",
                },
                {
                  name: "CUP C2",
                  logo: "/placeholder.svg?height=24&width=24",
                  bgColor: "bg-[#0A4FA3]",
                },
                {
                  name: "AFC CHAMPIONS LEAGUE",
                  logo: "/placeholder.svg?height=24&width=24",
                  bgColor: "bg-[#00A88F]",
                },
                {
                  name: "EFL CUP",
                  logo: "/placeholder.svg?height=24&width=24",
                  bgColor: "bg-[#002F6C]",
                },
              ].map((league) => (
                <Link
                  key={league.name}
                  href={`/${league.name.toLowerCase().replace(/ /g, "-")}`}
                  className="flex items-center p-3 hover:bg-gray-100"
                >
                  <div
                    className={`w-6 h-6 ${league.bgColor} rounded flex items-center justify-center mr-2`}
                  >
                    <Image
                      src={league.logo || "/placeholder.svg"}
                      alt={league.name}
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium">{league.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-7">
            <div className="bg-white rounded shadow p-4 mb-4">
              <div className="relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-q8HjJAsCco9dK8MHSxZWVTkCDzZ55H.png"
                  alt="Vietnamese football players celebrating"
                  width={800}
                  height={450}
                  className="w-full h-auto rounded"
                />
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  BÓNG ĐÁ VIỆT NAM
                </div>
              </div>
              <div className="mt-4">
                <h1 className="text-2xl font-bold text-blue-600">
                  XUÂN SƠN VƯỢT LOẠT SAO SHOWBIZ, DẪN ĐẦU TOP 10 người ảnh hưởng
                  trên MXH
                </h1>
                <p className="text-gray-600 mt-2">
                  Vượt qua một loạt sao đình đám của showbiz, tiền đạo Nguyễn
                  Xuân Sơn dẫn đầu Top 10 người ảnh hưởng nổi bật nhất trên mạng
                  xã hội tháng 1/2025.
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="md:col-span-3">
            <div className="bg-white rounded shadow p-4 mb-4">
              {[
                "Khởi tố nhóm thanh niên đi mã tấu, bắt cầu thủ quỳ trên sân bóng",
                "Danh sách 24 đội bóng dự vòng loại 3 Asian Cup 2027",
                {
                  text: "Tiền đạo Brazil",
                  highlight: "THAM VỌNG LẬP HAT-TRICK VÔ ĐỊCH VỚI CLB CAHN",
                },
                "GHI BÀN CHO REAL MADRID, ENDRICK VẪN TỎ RA THẤT VỌNG",
                {
                  text: "Tiến Linh nhận thêm",
                  highlight: "QUÀ BÓNG VÀNG THỨ HAI",
                },
                "VỪA RỜI MU, RASHFORD ĐÃ QUYẾT ĐỊNH TƯƠNG LAI",
                {
                  text: "HLV TPHCM nói",
                  highlight: "LỖI GẶP RUỘT TRƯỚC TRẬN ĐỐI ĐẦU HAGL",
                },
                {
                  text: "Cựu sao Real:",
                  highlight: "'MESSI GỌI TÔI LÀ THẰNG DA ĐEN NGU NGỐC'",
                },
              ].map((article, index) => (
                <article
                  key={index}
                  className={`${index !== 7 ? "border-b" : ""} pb-3 mb-3`}
                >
                  <h3 className="font-bold text-sm hover:text-blue-600">
                    <Link href="#">
                      {typeof article === "string" ? (
                        article
                      ) : (
                        <>
                          {article.text}{" "}
                          <span className="text-blue-600">
                            {article.highlight}
                          </span>
                        </>
                      )}
                    </Link>
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
