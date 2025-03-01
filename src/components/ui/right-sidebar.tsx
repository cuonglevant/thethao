import Link from "next/link";

type NewsItem = {
  href: string;
  title: string;
  isHighlighted?: boolean;
  prefix?: string;
  suffix?: string;
};

const newsItems: NewsItem[] = [
  {
    href: "#",
    title: "HLV VIETTEL PHẢN NẠN TRỌNG TÀI ở trận thua Nam Định",
    isHighlighted: true,
  },
  {
    href: "#",
    title:
      "MESSI THỪA NHẬN NỖI BUỒN LỚN BẬC NHẤT SỰ NGHIỆP, BARCA CÓ LIÊN QUAN!",
    isHighlighted: true,
  },
  {
    href: "#",
    title: "RODRI TÁI XUẤT MAN CITY SAU CHẤN THƯƠNG, CẢ CHÂU ÂU DÃN KHIẾP SỢ!",
    isHighlighted: true,
  },
  {
    href: "#",
    title:
      "Choáng váng trước số tiền mà Văn Toàn cho Hoà Minzy vay, đúng bạn thân nhà người ta!",
  },
  {
    href: "#",
    title:
      "ĐÃ BẠI STUTTGART, BAYERN MUNICH XÂY CHẮC NGÔI ĐẦU BUNDESLIGA 2024/25",
    isHighlighted: true,
  },
  {
    href: "#",
    title: "GHI ĐIỂM VỚI HLV KIM SANG SIK",
    prefix: "Tiền vệ Tuấn Anh ",
    isHighlighted: true,
  },
  {
    href: "#",
    title: "KHÔNG HÀI LÒNG VỚI CÔNG TÁC TRỌNG TÀI",
    prefix: "HLV Popov tiếp tục ",
    isHighlighted: true,
  },
  {
    href: "#",
    title: "giúp đội nhà thăng hoa",
    prefix: "MBAPPE VIỆT NAM GHI BÀN DUY NHẤT, ",
  },
];

export function RightSidebar() {
  return (
    <div className="md:col-span-3">
      <div className="bg-white rounded shadow p-4 mb-4">
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {newsItems.map((item, index) => (
            <article key={index}>
              <h3 className={item.prefix ? "text-sm" : undefined}>
                {item.prefix}
                <Link
                  href={item.href}
                  className={`${
                    item.isHighlighted
                      ? "text-[#0088FF] font-bold hover:underline"
                      : item.prefix
                      ? "text-[#0088FF] hover:underline"
                      : "block text-sm"
                  }`}
                >
                  {item.title}
                </Link>
                {item.suffix}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
