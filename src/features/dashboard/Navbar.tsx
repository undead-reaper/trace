import { SidebarTrigger } from "@/components/ui/sidebar"
import { UserButton } from "@clerk/tanstack-react-start"
import AddExpenseButton from "@/features/transactions/components/AddExpenseButton"

const Navbar = () => {
  return (
    <header className="flex flex-row items-center justify-between border-b p-3">
      <SidebarTrigger />
      <div className="flex items-center gap-2">
        <AddExpenseButton />
        <UserButton />
      </div>
    </header>
  )
}

export default Navbar
