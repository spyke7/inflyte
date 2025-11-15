"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  TerminalSquare,
  BarChart3,
  Settings,
  Menu,
  X,
  Wand2,
  Key,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Image from "next/image";
import Logo from "@/public/icon.png";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createAuthClient } from "better-auth/client";
const authClient = createAuthClient();

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const sidebarItems = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "API Console",
      href: "/dashboard/console",
      icon: <TerminalSquare size={18} />,
    },
    { name: "Requests", href: "/dashboard/requests", icon: <Key size={18} /> },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart3 size={18} />,
    },
    { name: "AI Tools", href: "/dashboard/ai", icon: <Wand2 size={18} /> },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings size={18} />,
    },
  ];

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await authClient.signOut();
      setUser(null);
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="lg:hidden fixed top-0 left-0 z-40 w-full border-b bg-background/80 backdrop-blur-md flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Image src={Logo} alt="Logo" width={28} height={28} />
          <h1 className="font-semibold text-lg">
            Inflyte<span className="text-primary">.</span>
          </h1>
        </div>

        <button onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <aside
        className={cn(
          "fixed z-30 top-0 left-0 h-full w-64 border-r bg-muted/30 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 lg:static",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center gap-2 px-6 py-6 border-b">
          <Image src={Logo} alt="Logo" width={28} height={28} />
          <h1 className="text-xl font-semibold">
            Inflyte<span className="text-primary">.</span>
          </h1>
        </div>

        <nav className="px-4 py-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground transition"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-6 left-4 flex flex-col gap-6">
          <>
            {isLoading ? (
              <Loader2 className="size-4 mt-2 animate-spin" />
            ) : (
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </>
          <ThemeToggle />
        </div>
      </aside>

      <main className="flex-1 mt-16 lg:mt-0 px-4 md:px-8 py-6">{children}</main>
    </div>
  );
}
