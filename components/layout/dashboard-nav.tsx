'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import {
  BarChart3Icon,
  FileTextIcon,
  HomeIcon,
  MenuIcon,
  PieChartIcon,
  SettingsIcon,
  UsersIcon,
  XIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ModeToggle } from '@/components/theme-toggle';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    title: 'Invoices',
    href: '/dashboard/invoices',
    icon: <FileTextIcon className="h-5 w-5" />,
  },
  {
    title: 'Clients',
    href: '/dashboard/clients',
    icon: <UsersIcon className="h-5 w-5" />,
  },
  {
    title: 'Reports',
    href: '/dashboard/reports',
    icon: <BarChart3Icon className="h-5 w-5" />,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: <SettingsIcon className="h-5 w-5" />,
  },
];

export function DashboardNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-16 items-center justify-between border-b px-4">
      <div className="flex items-center gap-2 lg:gap-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="lg:hidden">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 sm:max-w-xs">
            <nav className="flex flex-col gap-6">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-lg font-semibold"
                onClick={() => setOpen(false)}
              >
                <PieChartIcon className="h-6 w-6 text-primary" />
                <span>InvoicePro</span>
              </Link>
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent',
                      pathname === item.href && 'bg-accent'
                    )}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-lg font-semibold lg:text-xl"
        >
          <PieChartIcon className="h-6 w-6 text-primary" />
          <span className="hidden md:inline">InvoicePro</span>
        </Link>
        <div className="hidden md:flex">
          <nav className="flex gap-4 lg:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 text-sm font-medium hover:text-primary',
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {item.icon}
                <span className="hidden lg:inline">{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: 'h-8 w-8',
            },
          }}
          afterSignOutUrl="/"
        />
      </div>
    </div>
  );
}