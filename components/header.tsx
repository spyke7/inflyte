"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Logo from "@/public/icon.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createAuthClient } from "better-auth/client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
const authClient = createAuthClient();

const menuItems = [
  { name: "Features", href: "#features" },
  { name: "Docs", href: "/docs" },
];

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true);
      try {
        const session = await authClient.getSession();
        const userData =
          (session && (session as any).user) ||
          (session && (session as any).data?.user) ||
          (session && (session as any).session?.user) ||
          null;
        setUser(userData);
      } catch (err) {
        console.error("Error fetching session:", err);
        setUser(null);
      }
      setIsLoading(false);
    };
    fetchSession();
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="fixed z-20 w-full px-2"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2 text-2xl font-semibold tracking-tight"
              >
                <Image src={Logo} alt="Logo" height={32} width={32} />
                Inflyte<span className="text-primary">.</span>
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <ThemeToggle />
                {!user ? (
                  <>
                    {isLoading ? (
                      <Loader2 className="size-4 mt-2 animate-spin" />
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className={buttonVariants({ variant: "ghost" })}
                        >
                          Login
                        </Link>
                        <Link
                          href="/signup"
                          className={buttonVariants({ variant: "default" })}
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {isLoading ? (
                      <Loader2 className="size-4 mt-2 animate-spin" />
                    ) : (
                      <>
                        <Link
                          href="/dashboard"
                          className={buttonVariants({ variant: "ghost" })}
                        >
                          Dashboard
                        </Link>
                        <Button variant="destructive" onClick={handleLogout}>
                          Logout
                        </Button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
