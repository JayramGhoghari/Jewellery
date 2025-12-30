"use client";

import { useEffect, useState } from 'react';
import MainLayout from '../MainLayout';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Function to check cookie - more reliable method
    const getCookie = (name: string): string | null => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null;
      }
      return null;
    };

    // STRICT authentication check - cookie is PRIMARY, localStorage is secondary
    const checkAuthentication = () => {
      // Check cookie first (this is what middleware checks on server)
      const cookieValue = getCookie('adminAuthenticated');
      const hasValidCookie = cookieValue === 'true';
      
      // Also check localStorage as backup
      const hasLocalStorage = localStorage.getItem('adminAuthenticated') === 'true';
      
      // BOTH must be present - cookie is CRITICAL (middleware requirement)
      if (hasValidCookie && hasLocalStorage) {
        // Authenticated - allow access
        setIsAuthenticated(true);
        setIsChecking(false);
      } else {
        // NOT authenticated - IMMEDIATELY redirect without any delay
        // Don't clear anything first, just redirect
        window.location.replace('/login?redirect=/Admin');
        return;
      }
    };

    // Run check immediately - no delay
    checkAuthentication();
  }, []);

  // Show loading while checking - prevents any content flash
  if (isChecking) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Checking authentication...</div>
      </div>
    );
  }

  // Only render admin panel if authenticated
  if (isAuthenticated) {
    return <MainLayout />;
  }

  // This shouldn't normally be reached due to redirect, but show loading just in case
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-white text-lg">Redirecting to login...</div>
    </div>
  );
}
