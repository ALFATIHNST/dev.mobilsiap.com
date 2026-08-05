'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ContactFormData {
  name: string;
  phone: string;
  subject: string;
  message: string;
}

const initialForm: ContactFormData = { name: '', phone: '', subject: '', message: '' };

const subjects = [
  'Tanya info mobil',
  'Titip jual mobil',
  'Booking reparasi/servis',
  'Booking spooring & balancing',
  'Pengaduan / keluhan',
  'Lainnya',
];

function sanitize(s: string): string {
  return s.replace(/[<>'"&;]/g, '').slice(0, 500);
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Partial<ContactFormData> = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Nama minimal 2 karakter.';
    if (!form.phone.trim() || !/^(\+62|62|0)[0-9]{8,13}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Nomor tidak valid.';
    if (!form.subject) e.subject = 'Pilih topik pesan.';
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Pesan minimal 10 karakter.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: sanitize(value) }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Mock submit — backend integration point
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-4xl p-8 text-center space-y-5"
        style={{ background: 'rgba(18,18,28,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
          style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.2)' }}>
          <Icon name="CheckCircleIcon" size={36} className="text-green-400" variant="solid" />
        </div>
        <h3 className="text-xl font-extrabold text-white" style={{ fontWeight: 800 }}>Pesan Terkirim!</h3>
        <p className="text-white/50 text-sm">Tim MobilSiap akan menghubungi Anda dalam 1×24 jam.</p>
        <button onClick={() => { setSubmitted(false); setForm(initialForm); }} className="btn-primary text-sm py-2.5 px-6">
          Kirim Pesan Lain
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-white mb-6" style={{ fontWeight: 800 }}>
        Kirim Pesan
      </h2>
      <form onSubmit={handleSubmit} noValidate className="rounded-4xl p-7 space-y-5"
        style={{ background: 'rgba(18,18,28,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 16px 48px rgba(0,0,0,0.4)' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="contactName" className="text-sm font-700 text-white/70" style={{ fontWeight: 700 }}>
              Nama <span className="text-primary">*</span>
            </label>
            <input
              id="contactName"
              type="text"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Nama lengkap Anda"
              className="input-field"
              maxLength={100}
              autoComplete="name"
            />
            {errors.name && <p className="text-xs text-primary">{errors.name}</p>}
          </div>
          <div className="space-y-1.5">
            <label htmlFor="contactPhone" className="text-sm font-700 text-white/70" style={{ fontWeight: 700 }}>
              No. WhatsApp <span className="text-primary">*</span>
            </label>
            <input
              id="contactPhone"
              type="tel"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value.replace(/[^0-9+\-\s()]/g, ''))}
              placeholder="08xxxxxxxxxx"
              className="input-field"
              maxLength={20}
              autoComplete="tel"
            />
            {errors.phone && <p className="text-xs text-primary">{errors.phone}</p>}
          </div>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="contactSubject" className="text-sm font-700 text-white/70" style={{ fontWeight: 700 }}>
            Topik <span className="text-primary">*</span>
          </label>
          <select
            id="contactSubject"
            value={form.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            className="input-field"
          >
            <option value="">Pilih topik pesan</option>
            {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.subject && <p className="text-xs text-primary">{errors.subject}</p>}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="contactMessage" className="text-sm font-700 text-white/70" style={{ fontWeight: 700 }}>
            Pesan <span className="text-primary">*</span>
          </label>
          <textarea
            id="contactMessage"
            value={form.message}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder="Tulis pesan Anda di sini..."
            className="input-field resize-none"
            rows={4}
            maxLength={1000}
          />
          {errors.message && <p className="text-xs text-primary">{errors.message}</p>}
          <p className="text-xs text-white/30 text-right">{form.message.length}/1000</p>
        </div>
        <div className="flex items-start gap-3 rounded-2xl p-4"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <Icon name="ShieldCheckIcon" size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-white/40 leading-relaxed">
            Formulir ini dilindungi dari spam. Data Anda aman bersama kami.
          </p>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-sm disabled:opacity-60">
          {loading ? (
            <>
              <Icon name="ArrowPathIcon" size={16} className="text-white animate-spin" />
              Mengirim...
            </>
          ) : (
            <>
              <Icon name="PaperAirplaneIcon" size={16} className="text-white" />
              Kirim Pesan
            </>
          )}
        </button>
      </form>
    </div>
  );
}