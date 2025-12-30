"use client";

import { Suspense } from 'react';
import AdminLogin from '@/src/components/AdminLogin';

function LoginContent() {
  return <AdminLogin />;
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
