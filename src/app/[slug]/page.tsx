import { Metadata } from "next";

// Get title based on slug
const titles: { [key: string]: string } = {
  "bong-da-quoc-te": "Bóng đá Quốc tế",
  "bong-da-viet-nam": "Bóng đá Việt Nam",
  "chuyen-nhuong": "Chuyển nhượng",
  "cup-c1": "Champions League",
  esport: "Esport",
  "lich-thi-dau": "Lịch thi đấu",
  "ngoai-hang-anh": "Ngoại hạng Anh",
  "nhan-dinh": "Nhận định",
  "the-thao": "Thể thao",
  xe: "Xe",
  "xu-huong": "Xu hướng",
};

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const title = titles[resolvedParams.slug] || "Trang không tồn tại";

  return {
    title,
    description: `Tin tức ${title.toLowerCase()} mới nhất`,
  };
}

export default async function DynamicPage({ params }: Props) {
  const resolvedParams = await params;
  const title = titles[resolvedParams.slug] || "Trang không tồn tại";

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {/* Page specific content */}
    </main>
  );
}

// Generate static paths
export async function generateStaticParams() {
  return Object.keys(titles).map((slug) => ({
    slug: slug,
  }));
}
