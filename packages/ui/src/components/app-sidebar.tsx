"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Landmark,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@workspace/ui/components/nav-main";
import { NavProjects } from "@workspace/ui/components/nav-projects";
import { NavUser } from "@workspace/ui/components/nav-user";
import { TeamSwitcher } from "@workspace/ui/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@workspace/ui/components/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
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
          url: "#",
        },
        {
          title: "Payment Buttons",
          url: "#",
        },
      ],
    },
    {
      title: "Transactions",
      url: "#",
      icon: Bot,
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
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
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
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
