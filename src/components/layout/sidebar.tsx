import Link from "next/link";
import { 
  LayoutDashboard, 
  Video, 
  BookOpen, 
  Settings,
  Sparkles,
  CreditCard,
  Crown,
  MessageCircleQuestion,
  GraduationCap,
  Users
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Courses", href: "/dashboard/courses", icon: BookOpen },
  { name: "Creator Tools", href: "/dashboard/tools", icon: Sparkles },
  { name: "AI Tutor", href: "/dashboard/tutor", icon: MessageCircleQuestion },
  { name: "Quizzes", href: "/dashboard/quizzes", icon: GraduationCap },
];

const adminItems = [
  { name: "Admin: Courses", href: "/dashboard/admin/courses", icon: Crown },
  { name: "Admin: Users", href: "/dashboard/admin/users", icon: Users },
  { name: "Admin: Config", href: "/dashboard/admin/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block w-64 h-screen sticky top-0">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="">Yi AI Course</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <div className="text-xs font-semibold text-muted-foreground mb-2 mt-4 px-3 uppercase tracking-wider">Student Area</div>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}

            <div className="text-xs font-semibold text-red-500 mb-2 mt-8 px-3 uppercase tracking-wider">God-Mode Admin</div>
            {adminItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-500/80 transition-all hover:text-red-500 hover:bg-red-500/10"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              href="/dashboard/billing"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <CreditCard className="h-4 w-4" />
              Billing
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
