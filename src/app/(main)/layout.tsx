'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Users, ShoppingBag, User, MessageCircle } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

const NAV_ITEMS = [
  { href: '/library',     icon: BookOpen,        label: 'Миний сан' },
  { href: '/community',   icon: Users,            label: 'Коммунити' },
  { href: '/marketplace', icon: ShoppingBag,      label: 'Зар' },
  { href: '/chat',        icon: MessageCircle,    label: 'Чат' },
  { href: '/profile',     icon: User,             label: 'Профайл' },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) router.replace('/auth/login');
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="h-screen w-full bg-[#f5f0e8] flex">
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex md:flex-col md:w-64 border-r border-[#d4c5a9] bg-[#3e2723] shadow-lg">
        <div className="p-6 border-b border-[#5d4037]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#d4a574]" />
            <h1 className="text-lg font-serif text-[#f5deb3]">Bookworm</h1>
          </div>
        </div>
        <div className="flex-1 p-4">
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`w-full flex items-center gap-3 px-4 py-3 mb-1 transition-colors ${
                  isActive
                    ? 'bg-[#5d4037] text-[#f5deb3]'
                    : 'text-[#a1887f] hover:bg-[#4e342e] hover:text-[#d4a574]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
        <div className="p-4 border-t border-[#5d4037]">
          <p className="text-xs text-[#6d4c41] truncate">{user.name}</p>
          <p className="text-[10px] text-[#8d6e63] truncate">{user.email}</p>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden bg-[#3e2723] border-b border-[#5d4037] px-5 pt-12 pb-4 shadow">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-[#d4a574]" />
            <h1 className="text-xl font-serif text-[#f5deb3]">
              {NAV_ITEMS.find((n) => n.href === pathname)?.label ?? 'Bookworm'}
            </h1>
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:block bg-[#f5f0e8] border-b border-[#d4c5a9] px-6 py-4">
          <h1 className="text-2xl font-serif text-[#3e2723]">
            {NAV_ITEMS.find((n) => n.href === pathname)?.label ?? 'Bookworm'}
          </h1>
        </header>

        <main className="flex-1 overflow-hidden">{children}</main>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden bg-[#3e2723] border-t border-[#5d4037]">
          <div className="grid grid-cols-5">
            {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex flex-col items-center justify-center gap-1 py-3 transition-colors ${
                    isActive ? 'text-[#f5deb3]' : 'text-[#8d6e63]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[9px] font-medium">{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
