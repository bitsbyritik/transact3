import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/global/navbar";
import { Separator } from "@workspace/ui/components/separator";
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      <SidebarProvider>
        <AppSidebar className="pt-14 " />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
