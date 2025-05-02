/* biome-disable lint/correctness/useExhaustiveDependencies */
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { siteConfig } from "@/lib/site.config"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Filter navigation based on feature flags
  const filteredNavigation = navigation.filter(item => {
    if (item.href.startsWith('/blog')) return siteConfig.features.enableBlog
    if (item.href.startsWith('/services')) return siteConfig.features.enableServices
    if (item.href.startsWith('/contact')) return siteConfig.features.enableContactForm
    return true
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  // biome-disable-next-line lint/correctness/useExhaustiveDependencies
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
    >
      <nav
        className={cn(
          "container-wide flex items-center justify-between transition-all duration-300",
          scrolled ? "py-4 lg:py-2" : "py-4 lg:py-6"
        )}
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company Name</span>
            <div className="h-10 w-auto flex items-center">
              <Image
                src="/placeholder.svg?height=40&width=150"
                alt="Your Company Name Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open main menu"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {filteredNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors relative group",
                pathname === item.href
                  ? "text-primary font-semibold"
                  : scrolled
                    ? "text-gray-900 hover:text-primary"
                    : "text-gray-700 hover:text-primary",
              )}
            >
              {item.name}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                  pathname === item.href ? "w-full" : "w-0 group-hover:w-full",
                )}
              />
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button asChild className="bg-primary hover:bg-primary/90 group">
            <Link href="/contact">
              Get in touch
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-white lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Your Company Name</span>
                <div className="h-10 w-auto flex items-center">
                  <Image
                    src="/placeholder.svg?height=40&width=150"
                    alt="Your Company Name Logo"
                    width={150}
                    height={40}
                    className="h-10 w-auto"
                  />
                </div>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root px-6">
              <div className="space-y-6 py-6">
                {filteredNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block text-base font-medium hover:text-primary",
                      pathname === item.href ? "text-primary font-semibold" : "text-gray-900",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="mt-4">
                <Button asChild className="w-full bg-primary hover:bg-primary/90 group">
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Get in touch
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
