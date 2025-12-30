"use client";

import { useState } from 'react';
import { ShieldCheck, Lock, Mail } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function AdminAuth() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    email: '',
    password: '',
    adminKey: '' // Admin-specific field
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      // Validation
      if (!form.email || !form.password || !form.adminKey) {
        throw new Error('All fields are required');
      }

      // Basic admin key validation (in production, this should be verified against database)
      // For demo: admin key is 'admin123'
      if (form.adminKey !== 'Jayram123') {
        throw new Error('Invalid admin security key');
      }

      // Store admin session (session-only, cleared when browser closes)
      if (typeof window !== 'undefined') {
        // Set localStorage first (this is checked immediately by Admin page)
        localStorage.setItem('adminAuthenticated', 'true');
        localStorage.setItem('adminEmail', form.email);
        
        // Set cookie for server-side middleware check
        // Use SameSite=Lax for better compatibility and ensure it's set properly
        document.cookie = `adminAuthenticated=true; path=/; SameSite=Lax`;
        
        // Use window.location.href for full page reload to ensure middleware sees cookie
        // This prevents the flash/redirect issue
        const redirect = searchParams.get('redirect') || '/Admin';
        window.location.href = redirect;
        return; // Exit early to prevent further execution
      }

      setLoading(false);

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
            <h2 className="text-3xl font-light text-white mb-2">Admin Access</h2>
            <p className="text-slate-400">Sign in to access the admin panel</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-slate-300 mb-2">Admin Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition"
                  placeholder="admin@example.com"
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

            <div>
              <label className="block text-sm text-slate-300 mb-2">Admin Key *</label>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={form.adminKey}
                  onChange={e => handleChange('adminKey', e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition"
                  placeholder="Enter admin security key"
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">This key verifies your admin privileges</p>
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
              {loading ? 'Signing In...' : 'Access Admin Panel'}
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
