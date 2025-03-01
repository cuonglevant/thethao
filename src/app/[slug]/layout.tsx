import { MainNav } from "@/components/ui/main-nav";

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <MainNav />
      {children}
    </div>
  );
}
