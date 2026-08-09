'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Icon from '@/components/ui/AppIcon';

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setMessage('');

    if (password.length < 8) {
      setError('Password minimal 8 karakter.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Konfirmasi password tidak sama.');
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setMessage('Password berhasil diperbarui. Mengarahkan ke login...');

      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#0a0a0f' }}
    >
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: 'rgba(239,68,68,0.15)',
                border: '1px solid rgba(239,68,68,0.3)',
              }}
            >
              <Icon
                name="ShieldCheckIcon"
                size={22}
                className="text-primary"
              />
            </div>

            <span
              className="text-xl font-extrabold text-white"
              style={{ fontWeight: 800 }}
            >
              MobilSiap <span className="text-primary">Admin</span>
            </span>
          </div>

          <p className="text-white/40 text-sm">
            Buat password baru
          </p>
        </div>


        <div
          className="rounded-3xl p-8"
          style={{
            background: 'rgba(18,18,28,0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >

          {error && (
            <div
              className="mb-4 rounded-xl p-3 text-sm text-red-400"
              style={{
                background: 'rgba(239,68,68,0.1)',
              }}
            >
              {error}
            </div>
          )}


          {message && (
            <div
              className="mb-4 rounded-xl p-3 text-sm text-green-400"
              style={{
                background: 'rgba(34,197,94,0.1)',
              }}
            >
              {message}
            </div>
          )}


          <form
            onSubmit={handleReset}
            className="space-y-4"
          >

            <div>
              <label className="text-sm text-white/70">
                Password Baru
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="input-field w-full mt-1"
                placeholder="Password baru"
                required
              />
            </div>


            <div>
              <label className="text-sm text-white/70">
                Konfirmasi Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className="input-field w-full mt-1"
                placeholder="Ulangi password"
                required
              />
            </div>


            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5"
            >
              {loading ? (
                <>
                  <Icon
                    name="ArrowPathIcon"
                    size={16}
                    className="animate-spin"
                  />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Icon
                    name="CheckCircleIcon"
                    size={16}
                  />
                  Simpan Password
                </>
              )}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}
