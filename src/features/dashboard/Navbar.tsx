import { SidebarTrigger } from "@/components/ui/sidebar"
import { UserButton } from "@clerk/tanstack-react-start"

const Navbar = () => {
  return (
    <header className="flex flex-row items-center justify-between border-b p-3">
      <SidebarTrigger />
      <UserButton />
    </header>
  )
}

export default Navbar
