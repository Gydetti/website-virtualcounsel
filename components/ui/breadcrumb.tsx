'use client';

import { Slot } from '@radix-ui/react-slot';
import { ChevronRight, Home, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { forwardRef } from 'react';

import StructuredData from '@/components/seo/structured-data';
import { cn } from '@/lib/utils';

interface BreadcrumbProps {
  homeElement?: ReactNode;
  separator?: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeItemClasses?: string;
  capitalizeLinks?: boolean;
}

const BreadcrumbRoot = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<'nav'> & {
    separator?: ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
BreadcrumbRoot.displayName = 'Breadcrumb';

export default function Breadcrumb({
  homeElement = (
    <>
      <Home aria-hidden="true" className="size-4" />
      <span className="sr-only">Home</span>
    </>
  ),
  separator = <ChevronRight aria-hidden="true" className="size-4 mx-2" />,
  containerClasses = 'flex py-4 text-sm',
  listClasses = 'flex items-center',
  activeItemClasses = 'text-primary font-medium',
  capitalizeLinks = false,
}: BreadcrumbProps) {
  // Guard against null from usePathname
  const paths = usePathname() || '';
  const pathNames = paths.split('/').filter(path => path);

  // Generate breadcrumb items for structured data
  const breadcrumbItems = pathNames.map((path, index) => {
    const href = `/${pathNames.slice(0, index + 1).join('/')}`;
    const name = capitalizeLinks
      ? path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ')
      : path.replace(/-/g, ' ');
    return { name, item: `https://your-domain.com${href}` };
  });

  // Add home to the beginning
  breadcrumbItems.unshift({ name: 'Home', item: 'https://your-domain.com' });

  return (
    <>
      <StructuredData type="breadcrumb" breadcrumbItems={breadcrumbItems} />
      <nav aria-label="Breadcrumb" className={containerClasses}>
        <ol className={listClasses}>
          <li className="flex items-center">
            <Link href="/" className="text-neutral-text/500 hover:text-primary transition-colors">
              {homeElement}
            </Link>
          </li>
          {pathNames.length > 0 && separator}
          {pathNames.map((name, index) => {
            const href = `/${pathNames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathNames.length - 1;
            const displayName = capitalizeLinks
              ? name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ')
              : name.replace(/-/g, ' ');

            return (
              <li key={href} className="flex items-center">
                {isLast ? (
                  <span className={activeItemClasses}>{displayName}</span>
                ) : (
                  <>
                    <Link
                      href={href}
                      className="text-neutral-text/500 hover:text-primary transition-colors"
                    >
                      {displayName}
                    </Link>
                    {separator}
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

const BreadcrumbList = forwardRef<HTMLOListElement, ComponentPropsWithoutRef<'ol'>>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
        className
      )}
      {...props}
    />
  )
);
BreadcrumbList.displayName = 'BreadcrumbList';

const BreadcrumbItem = forwardRef<HTMLLIElement, ComponentPropsWithoutRef<'li'>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props} />
  )
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<'a'> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      ref={ref}
      className={cn('transition-colors hover:text-foreground', className)}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbPage = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<'span'>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      aria-current="page"
      className={cn('font-normal text-foreground', className)}
      {...props}
    />
  )
);
BreadcrumbPage.displayName = 'BreadcrumbPage';

const BreadcrumbSeparator = ({ children, className, ...props }: ComponentPropsWithoutRef<'li'>) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn('[&>svg]:w-3.5 [&>svg]:h-3.5', className)}
    {...props}
  >
    {children ?? <ChevronRight aria-hidden="true" />}
  </li>
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

const BreadcrumbEllipsis = ({ className, ...props }: ComponentPropsWithoutRef<'span'>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = 'BreadcrumbElipssis';

export {
  BreadcrumbRoot as Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
