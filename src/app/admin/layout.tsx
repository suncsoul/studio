"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, ShoppingCart, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [activePath, setActivePath] = useState('');

  useEffect(() => {
    setIsClient(true);
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      router.push('/login');
    }
    setActivePath(window.location.pathname);
  }, [router]);

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  ];
  
  if (!isClient) {
    return null; // Don't render server-side
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      <aside className="hidden md:flex flex-col w-64 border-r bg-background">
        <div className="flex items-center h-16 border-b px-6">
          <Link href="/admin/dashboard" className="text-2xl font-bold tracking-tight">
            KOKIYUM Admin
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                activePath.startsWith(item.href) && "bg-muted text-primary"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex flex-col flex-1">
        <header className="flex h-16 items-center justify-between border-b bg-background px-6 md:justify-end">
           <Link href="/" className="text-lg font-bold tracking-tight md:hidden">
            KOKIYUM Admin
          </Link>
          <p className="text-sm text-muted-foreground">Welcome, Admin!</p>
        </header>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
