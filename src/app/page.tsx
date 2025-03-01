import { MainNav } from "@/components/ui/main-nav";
import Link from "next/link";
import Image from "next/image";

export default function Thethao247() {
  return (
    <div className="min-h-screen bg-gray-100">
      <MainNav />

      {/* Main Content */}
      <main className="container mx-auto w-7/12 px-4 py-4">
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
                </div>
                <span className="text-sm font-medium ml-3">LATEST</span>
              </Link>
              <Link
                href="/video"
                className="flex items-center p-3 hover:bg-gray-100"
              >
                <div className="w-6 h-6">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="2" />
                    <path d="M10 8l6 4-6 4V8z" />
                  </svg>
                </div>
                <span className="text-sm font-medium ml-3">VIDEO</span>
              </Link>
              <Link
                href="/livescore"
                className="flex items-center p-3 hover:bg-gray-100"
              >
                <div className="w-6 h-6">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M6 8h4" />
                    <path d="M14 16h4" />
                    <path d="M6 12h12" />
                  </svg>
                </div>
                <span className="text-sm font-medium ml-3">LIVESCORE</span>
              </Link>
              <Link
                href="/lich-thi-dau"
                className="flex items-center p-3 hover:bg-gray-100"
              >
                <div className="w-6 h-6">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
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
                <div className="w-6 h-6">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
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
                <div className="w-6 h-6">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
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
                <div className="relative w-6 h-6">
                  <span className="absolute -top-1 -right-1 text-[10px] font-bold text-red-500">
                    LIVE
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
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
                },
                {
                  name: "NGOẠI HẠNG ANH",
                  logo: "/placeholder.svg?height=24&width=24",
                },
                {
                  name: "V.LEAGUE 2",
                  logo: "/placeholder.svg?height=24&width=24",
                },
                { name: "CUP C1", logo: "/placeholder.svg?height=24&width=24" },
                {
                  name: "LA LIGA",
                  logo: "/placeholder.svg?height=24&width=24",
                },
                {
                  name: "LIGUE 1",
                  logo: "/placeholder.svg?height=24&width=24",
                },
                {
                  name: "BUNDESLIGA",
                  logo: "/placeholder.svg?height=24&width=24",
                },
                {
                  name: "SERIE A",
                  logo: "/placeholder.svg?height=24&width=24",
                },
                { name: "CUP C2", logo: "/placeholder.svg?height=24&width=24" },
                {
                  name: "AFC CHAMPIONS LEAGUE",
                  logo: "/placeholder.svg?height=24&width=24",
                },
                {
                  name: "EFL CUP",
                  logo: "/placeholder.svg?height=24&width=24",
                },
                { name: "MLS", logo: "/placeholder.svg?height=24&width=24" },
                { name: "FA CUP", logo: "/placeholder.svg?height=24&width=24" },
                {
                  name: "SAUDI PRO LEAGUE",
                  logo: "/placeholder.svg?height=24&width=24",
                },
                {
                  name: "WORLD CUP 2026",
                  logo: "/placeholder.svg?height=24&width=24",
                },
                {
                  name: "ASIAN CUP",
                  logo: "/placeholder.svg?height=24&width=24",
                },
              ].map((league) => (
                <Link
                  key={league.name}
                  href={`/${league.name.toLowerCase().replace(/ /g, "-")}`}
                  className="flex items-center p-3 hover:bg-gray-100"
                >
                  <div className="w-6 h-6 flex items-center justify-center mr-2">
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
              <div className="space-y-4">
                {/* Main Article */}
                <article>
                  <div className="relative">
                    <Image
                      src="/liver.png"
                      alt="Ronaldo in action"
                      width={800}
                      height={450}
                      className="w-full h-auto rounded"
                    />
                    <Link
                      href="/bong-da-quoc-te"
                      className="absolute top-2 left-2 text-xs bg-white/90 px-2 py-1 rounded"
                    >
                      BÓNG ĐÁ QUỐC TẾ
                    </Link>
                  </div>
                  <h1 className="text-2xl font-bold mt-3">
                    RONALDO BẤT LỰC, AL NASSR THUA ĐAU ĐỚN
                  </h1>
                  <p className="text-gray-600 mt-2 text-sm">
                    (Kết quả bóng đá Al Nassr vs Al Orubah) - Cristiano Ronaldo
                    và các đồng đội đã thất bại đau đớn trước Al Orubah trong
                    trận đấu thuộc vòng 23 Saudi League, qua đó càng rời xa cuộc
                    đua vô địch.
                  </p>
                </article>

                {/* Grid Articles */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <article>
                    <div className="relative">
                      <Image
                        src="/placeholder.svg?height=200&width=300"
                        alt="Nguyễn Thùy Linh"
                        width={300}
                        height={200}
                        className="w-full h-[120px] object-cover rounded"
                      />
                      <Link
                        href="/doi-tuyen"
                        className="absolute top-2 left-2 text-xs bg-white/90 px-2 py-1 rounded"
                      >
                        ĐỘI TUYỂN
                      </Link>
                    </div>
                    <h2 className="mt-2 text-sm font-medium">
                      Thắng thóc gỡ thủ trễ,{" "}
                      <span className="text-[#0088FF]">
                        NGUYỄN THÙY LINH LỌT BÁN KẾT ĐỨC MỞ RỘNG 2025
                      </span>
                    </h2>
                  </article>

                  <article>
                    <div className="relative">
                      <Image
                        src="/placeholder.svg?height=200&width=300"
                        alt="Nam Định team celebration"
                        width={300}
                        height={200}
                        className="w-full h-[120px] object-cover rounded"
                      />
                      <Link
                        href="/bong-da-viet-nam"
                        className="absolute top-2 left-2 text-xs bg-white/90 px-2 py-1 rounded"
                      >
                        BÓNG ĐÁ VIỆT NAM
                      </Link>
                    </div>
                    <h2 className="mt-2 text-sm font-medium">
                      Thắng Viettel ngay tại Mỹ Đình,{" "}
                      <span className="text-[#0088FF]">
                        NAM ĐỊNH XÂY CHẮC NGÔI ĐẦU
                      </span>
                    </h2>
                  </article>

                  <article>
                    <div className="relative">
                      <Image
                        src="/placeholder.svg?height=200&width=300"
                        alt="Ninh Bình team"
                        width={300}
                        height={200}
                        className="w-full h-[120px] object-cover rounded"
                      />
                      <Link
                        href="/bong-da-viet-nam"
                        className="absolute top-2 left-2 text-xs bg-white/90 px-2 py-1 rounded"
                      >
                        BÓNG ĐÁ VIỆT NAM
                      </Link>
                    </div>
                    <h2 className="mt-2 text-sm font-medium">
                      Hoàng Đức tỏa sáng,{" "}
                      <span className="text-[#0088FF]">
                        NINH BÌNH TOÀN THẮNG TRẬN THỨ 10
                      </span>
                    </h2>
                  </article>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="md:col-span-3">
            <div className="bg-white rounded shadow p-4 mb-4">
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                <article>
                  <Link
                    href="#"
                    className="block text-[#0088FF] font-bold hover:underline"
                  >
                    HLV VIETTEL PHẢN NẠN TRỌNG TÀI ở trận thua Nam Định
                  </Link>
                </article>
                <article>
                  <Link
                    href="#"
                    className="block text-[#0088FF] font-bold hover:underline"
                  >
                    MESSI THỪA NHẬN NỖI BUỒN LỚN BẬC NHẤT SỰ NGHIỆP, BARCA CÓ
                    LIÊN QUAN!
                  </Link>
                </article>
                <article>
                  <Link
                    href="#"
                    className="block text-[#0088FF] font-bold hover:underline"
                  >
                    RODRI TÁI XUẤT MAN CITY SAU CHẤN THƯƠNG, CẢ CHÂU ÂU DÃN
                    KHIẾP SỢ!
                  </Link>
                </article>
                <article>
                  <Link href="#" className="block text-sm">
                    Choáng váng trước số tiền mà Văn Toàn cho Hoà Minzy vay,
                    đúng bạn thân nhà người ta!
                  </Link>
                </article>
                <article>
                  <Link
                    href="#"
                    className="block text-[#0088FF] font-bold hover:underline"
                  >
                    ĐÃ BẠI STUTTGART, BAYERN MUNICH XÂY CHẮC NGÔI ĐẦU BUNDESLIGA
                    2024/25
                  </Link>
                </article>
                <article>
                  <h3 className="text-sm">
                    Tiền vệ Tuấn Anh{" "}
                    <Link
                      href="#"
                      className="text-[#0088FF] font-bold hover:underline"
                    >
                      GHI ĐIỂM VỚI HLV KIM SANG SIK
                    </Link>
                  </h3>
                </article>
                <article>
                  <h3 className="text-sm">
                    HLV Popov tiếp tục{" "}
                    <Link
                      href="#"
                      className="text-[#0088FF] font-bold hover:underline"
                    >
                      KHÔNG HÀI LÒNG VỚI CÔNG TÁC TRỌNG TÀI
                    </Link>
                  </h3>
                </article>
                <article>
                  <h3 className="text-sm">
                    MBAPPE VIỆT NAM GHI BÀN DUY NHẤT,{" "}
                    <Link href="#" className="text-[#0088FF] hover:underline">
                      giúp đội nhà thăng hoa
                    </Link>
                  </h3>
                </article>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
