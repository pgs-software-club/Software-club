"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Members", href: "/members" },
  { name: "Projects", href: "/projects" },
  { name: "Hackathon", href: "/hackathon" },
  { name: "Roadmap", href: "/roadmap" },
  { name: "Resources", href: "/resources" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Deepen the bar once the page moves, so it separates from the content
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Never leave the mobile sheet open across a navigation
  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <nav
      className={`fixed top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300 ${
        scrolled || isOpen
          ? "border-border/60 bg-background/90 shadow-sm"
          : "border-transparent bg-background/65"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-2">
          <img
            src="/logo.png"
            alt="PGS Software Club Logo"
            className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-xl font-bold tracking-tighter text-primary">PGS</span>
          <span className="text-xl font-bold tracking-tighter">Software Club</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.name}
              </Link>
            );
          })}
          <div className="ml-3 flex items-center gap-3">
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild className="gap-2 backdrop-blur-sm">
              <a href="https://github.com/pgs-software-club" target="_blank" rel="noreferrer">
                <FaGithub className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="touch-target flex items-center justify-center rounded-lg p-1.5 text-foreground transition-colors hover:bg-muted"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-16 left-0 w-full overflow-hidden border-b border-border/60 bg-background shadow-lg md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navItems.map((item, i) => {
                const active = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.25 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block rounded-lg px-4 py-3 text-lg font-medium transition-colors ${
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
              <Button variant="outline" asChild className="mt-3 gap-2">
                <a href="https://github.com/pgs-software-club" target="_blank" rel="noreferrer">
                  <FaGithub className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
