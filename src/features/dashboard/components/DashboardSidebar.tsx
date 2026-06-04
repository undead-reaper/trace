import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "@tanstack/react-router"
import {
  BanknoteArrowDownIcon,
  BanknoteArrowUpIcon,
  LayoutDashboardIcon,
  ReceiptIcon,
} from "lucide-react"

const DashboardSidebar = () => {
  const { pathname } = useLocation()

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <Link
          className="flex flex-row items-center justify-center gap-2"
          to="/dashboard"
        >
          <img src="/logo.svg" className="size-6 dark:invert" />
          <p className="font-noto-serif text-lg font-bold group-data-[collapsible=icon]:hidden">
            Trace
          </p>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Dashboard"
                  isActive={pathname === "/dashboard"}
                  render={<Link to="/dashboard" />}
                >
                  <LayoutDashboardIcon />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Income"
                  isActive={pathname === "/dashboard/income"}
                  render={<Link to="/dashboard/income" />}
                >
                  <BanknoteArrowUpIcon />
                  <span>Income</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Expenses"
                  isActive={pathname === "/dashboard/expenses"}
                  render={<Link to="/dashboard/expenses" />}
                >
                  <BanknoteArrowDownIcon />
                  <span>Expenses</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Reports"
                  isActive={pathname === "/dashboard/reports"}
                  render={<Link to="/dashboard/reports" />}
                >
                  <ReceiptIcon />
                  <span>Reports</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

export default DashboardSidebar
