'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Icon from '@/components/ui/AppIcon';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        setError('Email atau password salah. Silakan coba lagi.');
        setLoading(false);
        return;
      }

      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#0a0a0f' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}>
              <Icon name="ShieldCheckIcon" size={22} className="text-primary" />
            </div>
            <span className="text-xl font-extrabold text-white" style={{ fontWeight: 800 }}>
              MobilSiap <span className="text-primary">Admin</span>
            </span>
          </div>
          <p className="text-white/40 text-sm">Masuk ke panel administrasi</p>
        </div>

        {/* Login Form */}
        <div className="rounded-3xl p-8 space-y-5"
          style={{ background: 'rgba(18,18,28,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>

          {error && (
            <div className="flex items-center gap-3 rounded-2xl p-4"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <Icon name="ExclamationCircleIcon" size={16} className="text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-700 text-white/70" style={{ fontWeight: 700 }}>
                Email Admin
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mobilsiap.com"
                className="input-field"
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-700 text-white/70" style={{ fontWeight: 700 }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Icon name="ArrowPathIcon" size={16} className="text-white animate-spin" />
                  Masuk...
                </>
              ) : (
                <>
                  <Icon name="ArrowRightCircleIcon" size={16} className="text-white" />
                  Masuk ke Admin Panel
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
