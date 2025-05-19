/* biome-disable lint/correctness/useExhaustiveDependencies */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/siteConfig';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import useScrollDirection from '@/hooks/useScrollDirection';
import { createPortal } from 'react-dom';
import { getResources } from '@/lib/data/resources';
import type { z } from 'zod';
import type { resourceSchema } from '@/lib/schemas/contentBlocks.schema';
import { getServices } from '@/lib/data-utils';
import type { ServiceType } from '@/lib/data-utils';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const { atTop, direction } = useScrollDirection({ topThreshold: 88 });
  const scrolled = !atTop;
  const isHidden = direction === 'down' && !atTop;
  const pathname = usePathname();

  // highlight top-level nav for deeper routes as active
  const isActiveTab = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // Get optional enabledPages list from config
  const enabledPages = siteConfig.enabledPages;

  // Filter navigation based on siteConfig.navLinks and feature flags
  const filteredNavigation = (siteConfig.navLinks ?? []).filter(item => {
    // Exclude pages not in enabledPages
    if (enabledPages && !enabledPages.includes(item.href)) {
      return false;
    }
    // Respect individual feature flags
    if (item.href.startsWith('/blog') && !siteConfig.features.enableBlog) return false;
    if (item.href.startsWith('/services') && !siteConfig.features.enableServices) return false;
    if (item.href.startsWith('/contact') && !siteConfig.features.enableContactForm) return false;
    return true;
  });

  // Fetch resources and services for nav submenu
  type ResourcesType = z.infer<typeof resourceSchema>[];
  const [resourcesList, setResourcesList] = useState<ResourcesType>([]);
  const [servicesList, setServicesList] = useState<ServiceType[]>([]);
  useEffect(() => {
    getResources().then(data => setResourcesList(data));
    getServices().then(data => setServicesList(data));
  }, []);

  // Portal-based mobile menu overlay to escape header stacking context
  const mobileMenuOverlay = mobileMenuOpen
    ? createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-neutral-surface lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">{siteConfig.site.name}</span>
                <div className="flex items-center gap-3">
                  <Image
                    src={siteConfig.theme.logo.src}
                    alt={siteConfig.theme.logo.alt}
                    width={40}
                    height={40}
                    className="h-10 w-auto"
                    priority
                  />
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold leading-tight text-neutral-text">
                      {siteConfig.site.name}
                    </span>
                    {siteConfig.theme.logo.subtitle && (
                      <span className="text-sm text-neutral-text/500 leading-snug">
                        {siteConfig.theme.logo.subtitle}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-foreground"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-4 flow-root px-6">
              <div className="space-y-2 py-2">
                {filteredNavigation.map(item => {
                  const isSubmenu = item.href === '/resources' || item.href === '/services';
                  const list = item.href === '/resources' ? resourcesList : servicesList;
                  if (isSubmenu) {
                    return (
                      <div key={item.href} className="border-b-0">
                        <button
                          type="button"
                          className="flex items-center gap-2 w-full px-4 py-2 text-base font-normal transition-colors hover:bg-primary/10 hover:text-primary"
                          onClick={() =>
                            setExpandedMenu(expandedMenu === item.href ? null : item.href)
                          }
                        >
                          {item.text}
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 shrink-0 transition-transform duration-200',
                              expandedMenu === item.href ? 'rotate-180' : ''
                            )}
                          />
                        </button>
                        {expandedMenu === item.href && (
                          <div className="pl-4 bg-neutral-background">
                            <Link
                              href={item.href}
                              className="block px-4 py-2 text-base font-medium hover:bg-primary/10"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setExpandedMenu(null);
                              }}
                            >
                              View All {item.text}
                            </Link>
                            <hr className="border-t border-neutral-divider my-2" />
                            {list.map(entry => (
                              <Link
                                key={entry.slug}
                                href={`${item.href}/${entry.slug}`}
                                className="block px-4 py-2 hover:bg-primary/10"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {entry.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-base font-normal transition-colors hover:bg-primary/10 hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.text}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 group text-sm h-10 px-3 min-h-0 min-w-0"
              >
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Get in touch
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )
    : null;

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-transform duration-300 will-change-transform',
          isHidden ? '-translate-y-full' : 'translate-y-0'
        )}
      >
        <div
          className={cn(
            'overflow-hidden transition-all duration-300',
            scrolled
              ? 'bg-neutral-surface shadow-sm lg:bg-neutral-surface/80 lg:backdrop-blur-md py-2'
              : 'bg-neutral-surface shadow-sm lg:bg-neutral-surface/80 lg:backdrop-blur-md py-4'
          )}
        >
          <nav
            className="container-wide px-2 sm:px-3 md:px-4 xl:px-10 flex items-center justify-between"
            aria-label="Global"
          >
            <div
              className={cn(
                'flex lg:flex-1 transition-transform duration-300 origin-left',
                scrolled ? 'scale-90' : 'scale-100'
              )}
            >
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">{siteConfig.site.name}</span>
                <div className="flex items-center gap-3">
                  <Image
                    src={siteConfig.theme.logo.src}
                    alt={siteConfig.theme.logo.alt}
                    width={56}
                    height={56}
                    className="h-14 w-auto"
                    priority
                  />
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold leading-tight text-neutral-text">
                      {siteConfig.site.name}
                    </span>
                    {siteConfig.theme.logo.subtitle && (
                      <span className="text-sm text-neutral-text/500 leading-snug">
                        {siteConfig.theme.logo.subtitle}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className=" inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open main menu"
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex items-center lg:gap-x-8">
              {filteredNavigation.map(item => {
                if (item.href === '/resources' || item.href === '/services') {
                  const list = item.href === '/resources' ? resourcesList : servicesList;
                  return (
                    <DropdownMenu key={item.href}>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className={cn(
                            'inline-block text-sm font-medium transition-colors relative group focus:outline-none focus:ring-0 !min-h-0 !min-w-0',
                            isActiveTab(item.href)
                              ? 'text-primary font-semibold'
                              : scrolled
                                ? 'text-neutral-text hover:text-primary'
                                : 'text-foreground hover:text-primary'
                          )}
                        >
                          {item.text}
                          <span
                            className={cn(
                              'absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300',
                              isActiveTab(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                            )}
                          />
                          <ChevronDown className="ml-1 inline-block h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent sideOffset={4} align="start" className="mt-2">
                        <DropdownMenuItem asChild className="hover:!bg-primary/10">
                          <Link href={item.href} className="block w-full font-medium px-4 py-2">
                            View All {item.text}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {list.map(entry => (
                          <DropdownMenuItem
                            key={entry.slug}
                            asChild
                            className="hover:!bg-primary/10"
                          >
                            <Link
                              href={`${item.href}/${entry.slug}`}
                              className="block w-full px-4 py-2"
                            >
                              {entry.title}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'inline-block text-sm font-medium transition-colors relative group !min-h-0 !min-w-0',
                      isActiveTab(item.href)
                        ? 'text-primary font-semibold'
                        : scrolled
                          ? 'text-neutral-text hover:text-primary'
                          : 'text-foreground hover:text-primary'
                    )}
                  >
                    {item.text}
                    <span
                      className={cn(
                        'absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300',
                        isActiveTab(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                      )}
                    />
                  </Link>
                );
              })}
            </div>
            <div className="hidden lg:flex lg:items-center lg:ml-8">
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 group text-sm h-10 px-3 min-h-0 min-w-0"
              >
                <Link href="/contact">
                  Main CTA button
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>
      {mobileMenuOverlay}
    </>
  );
}
