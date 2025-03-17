"use client";

import * as React from "react";
import { Landmark, Settings2, ArrowRightLeft, Bell, Home } from "lucide-react";

import { NavMain } from "@workspace/ui/components/nav-main";
import { NavUser } from "@workspace/ui/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import { getSession, signOut } from "@/lib/auth-client";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user: currentUser } = useUser();
  const router = useRouter();

  console.log("currentUser", currentUser);

  const handleLogout = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged Out!");
            router.push("/");
          },
        },
      });
    } catch (err) {
      toast.error("Logout Failed!");
    }
  };

  const data = {
    user: {
      name: currentUser?.name || "Loading...",
      email: currentUser?.email || "Loading...",
      avatar: currentUser?.avatar || "Test",
      logout: handleLogout,
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
        isBtn: true,
      },
      {
        title: "Payments",
        url: "/payments",
        icon: Landmark,
        isActive: true,
        items: [
          {
            title: "Payment Links",
            url: "/payments/links",
          },
          {
            title: "Invoices",
            url: "/payments/invoices",
          },
          {
            title: "QR Codes",
            url: "/payments/qr",
          },
          {
            title: "API Payments",
            url: "/payments/developer",
          },
          {
            title: "Payment Buttons",
            url: "/payments/buttons",
          },
        ],
      },
      {
        title: "Transactions",
        url: "#",
        icon: ArrowRightLeft,
        items: [
          {
            title: "Recent Transactions",
            url: "#",
          },
          {
            title: "Failed Transactions",
            url: "#",
          },
          {
            title: "Pending Payments",
            url: "#",
          },
        ],
      },
      {
        title: "Notifications",
        url: "#",
        icon: Bell,
        items: [
          {
            title: "Notifications",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings2,
        isBtn: true,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex flex-col justify-center items-end ">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
