import {
  LayoutGrid,
  Users,
  Briefcase,
  BarChart,
  Cog,
  UserCog,
  Bell,
  Building2,
  Database,
  Brain,
  CreditCard,
  PieChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"

const navigation = [
  {
    icon: PieChart,
    label: "Dashboard",
    href: "/dashboard",
    isExpandable: false,
  },
  {
    icon: LayoutGrid,
    label: "Queues",
    href: "/queues",
    isExpandable: false,
  },
  {
    icon: Users,
    label: "Case Management",
    href: "/case-management",
    isExpandable: false,
  },
  {
    icon: Briefcase,
    label: "Transactions",
    href: "/transactions",
    isExpandable: false,
  },
  {
    icon: Bell,
    label: "Alert Management",
    href: "/alerts",
    isExpandable: false,
  },
  {
    icon: Building2,
    label: "Party Management",
    href: "/parties",
    isExpandable: false,
  },
  {
    icon: BarChart,
    label: "Rules Library",
    href: "/rules-library",
    isExpandable: false,
  },
  {
    icon: Database,
    label: "Model Management",
    href: "/model-management",
    isExpandable: false,
  },
  {
    icon: Brain,
    label: "ML Model Management",
    href: "/ml-model-management",
    isExpandable: false,
  },
  {
    icon: CreditCard,
    label: "Account Management",
    href: "/account-management",
    isExpandable: false,
  },
  {
    icon: UserCog,
    label: "User Management",
    href: "/user-management",
    isExpandable: false,
  },
  {
    icon: Cog,
    label: "Settings",
    href: "/settings",
    isExpandable: true,
  },
]

export default function Sidebar() {
  return (
    <div className="w-64 border-r h-screen bg-card" role="navigation">
      <ScrollArea className="h-full py-4">
        <nav className="space-y-1 px-2">
          {navigation.map((item, index) => (
            <Button key={index} variant="ghost" className="w-full justify-start gap-3 text-left" asChild>
              <Link href={item.href}>
                <item.icon className="h-4 w-4" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}

