import Navbar from "@/components/global/navbar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
          {children}
    </main>
  );
}
