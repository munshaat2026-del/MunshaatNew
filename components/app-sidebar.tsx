"use client";

import {
  DockIcon,
  Home,
  User2,
  ChevronUp,
  KeyRound,
  Crown,
  LayoutDashboard,
} from "lucide-react";
import { RiTeamLine } from "react-icons/ri";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { LuSquareParking } from "react-icons/lu";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import SignOutComponent from "./SignOutComponent";
import Link from "next/link";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Users", url: "/admin/dashboard/users", icon: User2 },
  { title: "Real Estates", url: "/admin/dashboard/real-estates", icon: HiOutlineBuildingOffice2 },
  { title: "Parkings", url: "/admin/dashboard/parkings", icon: LuSquareParking },
  {
    title: "Requests",
    url: "/admin/dashboard/requests",
    icon: DockIcon,
  },
  { title: "My Team", url: "/admin/dashboard/ourTeam", icon: RiTeamLine },
    { title: "Clients", url: "/admin/dashboard/ourClients", icon: Crown },
];

export function AppSidebar() {
  const { data: session } = useSession();
  const userName = session?.user.firstName || "Admin";

  return (
    <Sidebar
      className="border-r border-white/5 bg-[#050505] animate-slide-right"
      collapsible="icon"
    >
      <SidebarContent className="bg-[#050505] overflow-hidden scrollbar-hide">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-3 px-2 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2383c9]/10 border border-[#2383c9]/20">
              <LayoutDashboard className="text-[#2383c9] " size={18} />
            </div>
            <span className="text-sm font-black tracking-widest text-white uppercase italic">
              Munsh<span className="text-[#2383c9] font-bold ">aat</span>
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-4">
            <SidebarMenu className="gap-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="group relative flex items-center gap-3 px-4 py-6 text-gray-400 hover:text-white hover:bg-white/3 hover:scale-110 transition-all duration-300 rounded-none border-l-2 border-transparent hover:border-[#2383c9]"
                  >
                    <Link href={item.url}>
                      <item.icon
                        className="group-hover:text-[#2383c9] transition-colors"
                        size={20}
                      />
                      <span className="text-xs font-bold tracking-widest uppercase">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/5 bg-[#080808] p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className="
              group flex h-12 w-full items-center gap-3 rounded-xl
              bg-white/3 hover:bg-white/8
              border border-white/5 hover:border-[#2383c9]/40
              transition-all duration-300
              px-2
              group-data-[state=collapsed]:justify-center
              group-data-[state=collapsed]:px-0
            "
                >
                  {/* Avatar */}
                  <div
                    className="
    flex items-center justify-center
    rounded-full text-[#2383c9] bg-none
    font-black uppercase
    transition-all duration-300 ease-in-out

    h-8 w-8 text-xs
    group-data-[state=collapsed]:h-10
    group-data-[state=collapsed]:w-full
    group-data-[state=collapsed]:rounded-xl
    group-data-[state=collapsed]:text-sm
  "
                  >
                    {userName[0] + userName[1]}
                  </div>

                  {/* User info (hidden when collapsed) */}
                  <div
                    className="
              flex flex-col items-start overflow-hidden
              group-data-[state=collapsed]:hidden
            "
                  >
                    <span className="text-[11px] font-black text-white uppercase tracking-tight truncate w-24">
                      {userName}
                    </span>
                    <span className="text-[9px] font-mono text-[#2383c9]/60 uppercase italic">
                      Authorized
                    </span>
                  </div>

                  {/* Chevron (hidden when collapsed) */}
                  <ChevronUp
                    size={14}
                    className="
                ml-auto text-gray-600 transition-colors
                group-hover:text-[#2383c9]
                group-data-[state=collapsed]:hidden
              "
                  />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              {/* Dropdown */}
              <DropdownMenuContent
                side="top"
                align="center"
                className="
            w-full mb-2 rounded-xl
            border border-white/10
            bg-[#0f0f0f]
            p-2 shadow-2xl backdrop-blur-xl
          "
              >
                <DropdownMenuItem
                  className="
              rounded-lg cursor-pointer
              text-gray-500 focus:text-white
              focus:bg-white/5
              group
            "
                >
                  <Link
                    href="/change-password"
                    className="flex w-full items-center gap-3  px-2"
                  >
                    <KeyRound
                      size={16}
                      className="text-gray-500 group-hover:text-[#2383c9] transition-colors"
                    />
                    <span className="text-xs font-bold tracking-wide uppercase">
                      Change Password
                    </span>
                  </Link>
                </DropdownMenuItem>

                <div className="my-1 h-px bg-white/5" />

                <DropdownMenuItem
                  className="
              rounded-lg cursor-pointer
              text-gray-500 focus:text-white
              focus:bg-white/5
            "
                >
                  <div className="group flex w-full items-center gap-3 px-2">
                    <SignOutComponent />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
