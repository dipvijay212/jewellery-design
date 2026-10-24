import React from 'react';
import { CustomerNavbar } from '@/components/layout/CustomerNavbar';
import { CustomerFooter } from '@/components/layout/CustomerFooter';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-ivory-100">
      <CustomerNavbar />
      <main className="flex-1 flex flex-col">{children}</main>
      <CustomerFooter />
    </div>
  );
}
