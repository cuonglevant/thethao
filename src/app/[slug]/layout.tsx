export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto w-full px-4 sm:px-6 md:px-8 py-4 lg:w-11/12 xl:w-10/12 2xl:w-9/12">
        {children}
      </div>
    </div>
  );
}
