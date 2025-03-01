import { MainNav } from "@/components/ui/main-nav";

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <MainNav />
      <div className="container mx-auto w-7/12 px-4 py-4">{children}</div>
    </div>
  );
}
