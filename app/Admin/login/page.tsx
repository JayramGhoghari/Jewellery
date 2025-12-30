"use client";

import { Suspense } from 'react';
import AdminAuth from '@/src/components/AdminAuth';

function AdminLoginContent() {
  return <AdminAuth />;
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <AdminLoginContent />
    </Suspense>
  );
}
