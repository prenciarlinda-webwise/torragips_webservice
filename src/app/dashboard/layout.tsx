'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/api';
import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  const isLoginPage = pathname === '/dashboard/login' || pathname === '/dashboard/login/';
  const isPrintPage = pathname.startsWith('/dashboard/print');

  useEffect(() => {
    if (!isLoginPage && !isAuthenticated()) {
      router.replace('/dashboard/login/');
    } else {
      setReady(true);
    }
  }, [isLoginPage, router]);

  if (isLoginPage || isPrintPage) {
    return <>{children}</>;
  }

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400">Duke ngarkuar...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto min-w-0">
        <div className="h-0.5 bg-[#d97706] flex-shrink-0 hidden lg:block" />
        {/* Spacer for mobile top bar */}
        <div className="h-[52px] flex-shrink-0 lg:hidden" />
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
