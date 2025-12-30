"use client";

import { useState } from 'react';
import { ShieldCheck, Lock, User } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function AdminLogin() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Safely get redirect parameter
  const getRedirect = () => {
    try {
      return searchParams?.get('redirect') || '/Admin';
    } catch {
      return '/Admin';
    }
  };

  // Always show login page - require authentication every time
  // No auto-redirect - user must login every visit

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validation - check if fields are filled
      if (!form.username || !form.password) {
        setLoading(false);
        throw new Error('Username and password are required');
      }

      // Exact credential validation: Username must be 'Jayram', password must be 'Jayram123'
      // Case-sensitive validation
      const trimmedUsername = form.username.trim();
      const trimmedPassword = form.password.trim();
      
      // Check credentials exactly
      if (trimmedUsername !== 'Jayram') {
        setLoading(false);
        throw new Error('Invalid username');
      }
      
      if (trimmedPassword !== 'Jayram123') {
        setLoading(false);
        throw new Error('Invalid password');
      }

      // Credentials are correct - set authentication immediately
      if (typeof window !== 'undefined') {
        // Set localStorage (client-side check)
        localStorage.setItem('adminAuthenticated', 'true');
        localStorage.setItem('adminUsername', trimmedUsername);
        
        // Set cookie for server-side middleware check - CRITICAL for security
        // Set cookie with proper attributes to ensure it's available to middleware
        // path=/ makes it available to all routes
        // SameSite=Lax allows it to be sent with top-level navigations
        const cookieValue = 'adminAuthenticated=true';
        const cookieOptions = 'path=/; SameSite=Lax';
        document.cookie = `${cookieValue}; ${cookieOptions}`;
        
        // Verify cookie was set
        console.log('[AdminLogin] Cookie set, document.cookie:', document.cookie);
        
        // Get redirect URL
        const redirect = getRedirect();
        console.log('[AdminLogin] Redirecting to:', redirect);
        
        // Small delay to ensure cookie is written before redirect
        // Then use window.location.href for full page reload
        setTimeout(() => {
          window.location.href = redirect;
        }, 100);
        
        return; // Exit early - don't set loading to false
      } else {
        setLoading(false);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
              <ShieldCheck className="w-8 h-8 text-slate-900" />
            </div>
            <h2 className="text-3xl font-light text-white mb-2">Admin Login</h2>
            <p className="text-slate-400">Sign in to access the admin panel</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-slate-300 mb-2">Username *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={form.username}
                  onChange={e => handleChange('username', e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition"
                  placeholder="Enter admin username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">Password *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={form.password}
                  onChange={e => handleChange('password', e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition"
                  placeholder="Enter admin password"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-400/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Login to Admin Panel'}
            </button>

            <div className="text-center pt-4 border-t border-slate-700">
              <p className="text-xs text-slate-500">
                Admin access is restricted to authorized personnel only
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
