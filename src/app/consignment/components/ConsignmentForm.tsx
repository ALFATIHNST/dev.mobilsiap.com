'use client';

import React, { useState, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import { createClient } from '@/lib/supabase/client';

interface PhotoPosition {
  key: string;
  label: string;
  description: string;
  icon: string;
}

const PHOTO_POSITIONS: PhotoPosition[] = [
  { key: 'front', label: 'Tampak Depan', description: 'Foto dari depan mobil', icon: 'ArrowUpCircleIcon' },
  { key: 'back', label: 'Tampak Belakang', description: 'Foto dari belakang mobil', icon: 'ArrowDownCircleIcon' },
  { key: 'left', label: 'Samping Kiri', description: 'Foto dari sisi kiri', icon: 'ArrowLeftCircleIcon' },
  { key: 'right', label: 'Samping Kanan', description: 'Foto dari sisi kanan', icon: 'ArrowRightCircleIcon' },
  { key: 'interior', label: 'Interior / Dalam', description: 'Foto bagian dalam kabin', icon: 'HomeIcon' },
];

interface PositionPhotos {
  front: File | null;
  back: File | null;
  left: File | null;
  right: File | null;
  interior: File | null;
}

interface PositionPreviews {
  front: string;
  back: string;
  left: string;
  right: string;
  interior: string;
}

interface FormData {
  ownerName: string;
  whatsapp: string;
  brand: string;
  carType: string;
  year: string;
  kilometer: string;
  desiredPrice: string;
  description: string;
}

const initialForm: FormData = {
  ownerName: '',
  whatsapp: '',
  brand: '',
  carType: '',
  year: '',
  kilometer: '',
  desiredPrice: '',
  description: '',
};

const initialPhotos: PositionPhotos = {
  front: null, back: null, left: null, right: null, interior: null,
};

const initialPreviews: PositionPreviews = {
  front: '', back: '', left: '', right: '', interior: '',
};

const carBrands = ['Toyota', 'Honda', 'Mitsubishi', 'Suzuki', 'Daihatsu', 'Nissan', 'Mazda', 'BMW', 'Mercedes-Benz', 'Hyundai', 'Kia', 'Wuling', 'Lainnya'];
const years = Array.from({ length: 20 }, (_, i) => String(2026 - i));

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function sanitizeText(input: string): string {
  return input.replace(/[<>'"&;]/g, '').slice(0, 200);
}

function sanitizePhone(input: string): string {
  return input.replace(/[^0-9+\-\s()]/g, '').slice(0, 20);
}

export default function ConsignmentForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [photoErrors, setPhotoErrors] = useState<Partial<Record<string, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<PositionPhotos>(initialPhotos);
  const [previews, setPreviews] = useState<PositionPreviews>(initialPreviews);
  const [submitError, setSubmitError] = useState<string>('');

  const fileRefs = {
    front: useRef<HTMLInputElement>(null),
    back: useRef<HTMLInputElement>(null),
    left: useRef<HTMLInputElement>(null),
    right: useRef<HTMLInputElement>(null),
    interior: useRef<HTMLInputElement>(null),
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.ownerName.trim() || form.ownerName.trim().length < 2) newErrors.ownerName = 'Nama minimal 2 karakter.';
    if (!form.whatsapp.trim() || !/^(\+62|62|0)[0-9]{8,13}$/.test(form.whatsapp.replace(/\s/g, ''))) newErrors.whatsapp = 'Nomor WhatsApp tidak valid.';
    if (!form.brand) newErrors.brand = 'Pilih merek mobil.';
    if (!form.carType.trim() || form.carType.trim().length < 2) newErrors.carType = 'Tipe mobil wajib diisi.';
    if (!form.year) newErrors.year = 'Pilih tahun mobil.';
    if (!form.kilometer.trim() || isNaN(Number(form.kilometer.replace(/\./g, '')))) newErrors.kilometer = 'Kilometer tidak valid.';
    if (!form.desiredPrice.trim()) newErrors.desiredPrice = 'Harga yang diinginkan wajib diisi.';
    setErrors(newErrors);

    const newPhotoErrors: Partial<Record<string, string>> = {};
    if (!photos.front) newPhotoErrors.front = 'Foto tampak depan wajib diupload.';
    setPhotoErrors(newPhotoErrors);

    return Object.keys(newErrors).length === 0 && Object.keys(newPhotoErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    let sanitized = value;
    if (field === 'whatsapp') sanitized = sanitizePhone(value);
    else if (field !== 'year' && field !== 'brand') sanitized = sanitizeText(value);
    setForm((prev) => ({ ...prev, [field]: sanitized }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handlePositionFileChange = (posKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setPhotoErrors((prev) => ({ ...prev, [posKey]: 'Hanya JPG, PNG, dan WebP yang diizinkan.' }));
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setPhotoErrors((prev) => ({ ...prev, [posKey]: 'Ukuran file maksimal 5MB.' }));
      return;
    }

    setPhotos((prev) => ({ ...prev, [posKey]: file }));
    setPreviews((prev) => ({ ...prev, [posKey]: URL.createObjectURL(file) }));
    setPhotoErrors((prev) => ({ ...prev, [posKey]: undefined }));
  };

  const removePositionPhoto = (posKey: string) => {
    setPhotos((prev) => ({ ...prev, [posKey]: null }));
    setPreviews((prev) => ({ ...prev, [posKey]: '' }));
    const ref = fileRefs[posKey as keyof typeof fileRefs];
    if (ref.current) ref.current.value = '';
  };

  const uploadPhoto = async (supabase: ReturnType<typeof createClient>, file: File, submissionId: string, position: string): Promise<string | null> => {
    const ext = file.name.split('.').pop() || 'jpg';
    const path = `${submissionId}/${position}.${ext}`;
    const { error } = await supabase.storage.from('consignment-photos').upload(path, file, { upsert: true });
    if (error) return null;
    const { data: { publicUrl } } = supabase.storage.from('consignment-photos').getPublicUrl(path);
    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setSubmitError('');

    try {
      const supabase = createClient();
      const submissionId = crypto.randomUUID();

      // Upload photos to Supabase Storage
      const [photoFront, photoBack, photoLeft, photoRight, photoInterior] = await Promise.all([
        photos.front ? uploadPhoto(supabase, photos.front, submissionId, 'front') : Promise.resolve(null),
        photos.back ? uploadPhoto(supabase, photos.back, submissionId, 'back') : Promise.resolve(null),
        photos.left ? uploadPhoto(supabase, photos.left, submissionId, 'left') : Promise.resolve(null),
        photos.right ? uploadPhoto(supabase, photos.right, submissionId, 'right') : Promise.resolve(null),
        photos.interior ? uploadPhoto(supabase, photos.interior, submissionId, 'interior') : Promise.resolve(null),
      ]);

      // Insert consignment record
      const { error } = await supabase.from('consignments').insert({
        id: submissionId,
        owner_name: form.ownerName,
        whatsapp: form.whatsapp,
        brand: form.brand,
        car_type: form.carType,
        year: parseInt(form.year),
        kilometer: parseInt(form.kilometer.replace(/\./g, '')),
        desired_price: form.desiredPrice,
        description: form.description || null,
        photo_front: photoFront,
        photo_back: photoBack,
        photo_left: photoLeft,
        photo_right: photoRight,
        photo_interior: photoInterior,
        status: 'pending',
      });

      if (error) {
        console.error('Consignment submission error:', (error as any).message);
        setSubmitError('Gagal mengirim formulir. Silakan coba lagi.');
        setLoading(false);
        return;
      }

      setLoading(false);
      setSubmitted(true);
    } catch (err: any) {
      console.error('Submit error:', err);
      setSubmitError('Terjadi kesalahan. Silakan coba lagi.');
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="consignment-form" className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(8,8,14,0.95)' }}>
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
            style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.2)' }}>
            <Icon name="CheckCircleIcon" size={44} className="text-green-400" variant="solid" />
          </div>
          <h2 className="text-3xl font-extrabold text-white" style={{ fontWeight: 800 }}>
            Formulir Berhasil Dikirim!
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Tim MobilSiap akan menghubungi Anda melalui WhatsApp <strong className="text-white">{form.whatsapp}</strong> dalam 1×24 jam untuk proses verifikasi lebih lanjut.
          </p>
          <div className="rounded-2xl p-6 text-left space-y-2"
            style={{ background: 'rgba(18,18,28,0.7)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-sm font-700 text-white" style={{ fontWeight: 700 }}>Ringkasan Pengajuan:</p>
            <p className="text-sm text-white/50">Mobil: <strong className="text-white">{form.brand} {form.carType} {form.year}</strong></p>
            <p className="text-sm text-white/50">Kilometer: <strong className="text-white">{form.kilometer} KM</strong></p>
            <p className="text-sm text-white/50">Harga: <strong className="text-white">{form.desiredPrice}</strong></p>
          </div>
          <button
            onClick={() => { setSubmitted(false); setForm(initialForm); setPhotos(initialPhotos); setPreviews(initialPreviews); }}
            className="btn-primary py-3 px-8 text-sm"
          >
            Daftarkan Mobil Lain
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="consignment-form" className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(8,8,14,0.95)' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center space-y-3 mb-10">
          <span className="section-label">Formulir Titip Jual</span>
          <h2 className="text-section-heading font-extrabold text-white" style={{ fontWeight: 800 }}>
            Daftarkan Mobil Anda
          </h2>
          <p className="text-white/50 text-lg">
            Isi formulir di bawah ini dengan lengkap untuk memulai proses titip jual.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="rounded-4xl p-8 md:p-10 space-y-7"
          style={{ background: 'rgba(18,18,28,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>

          {/* Owner Info */}
          <div className="space-y-5">
            <h3 className="font-extrabold text-white text-base pb-3" style={{ fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              Data Pemilik
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="ownerName" className="text-sm font-700 text-white/70" style={{ fontWeight: 700 }}>
                  Nama Pemilik <span className="text-primary">*</span>
                </label>
                <input id="ownerName" type="text" value={form.ownerName}
                  onChange={(e) => handleChange('ownerName', e.target.value)}
                  placeholder="Contoh: Budi Santoso" className="input-field" maxLength={100} autoComplete="name" />
                {errors.ownerName && <p className="text-xs text-primary">{errors.ownerName}</p>}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="whatsapp" className="text-sm font-700 text-white/70" style={{ fontWeight: 700 }}>
                  Nomor WhatsApp <span className="text-primary">*</span>
                </label>
                <input id="whatsapp" type="tel" value={form.whatsapp}
                  onChange={(e) => handleChange('whatsapp', e.target.value)}
                  placeholder="Contoh: 08123456789" className="input-field" maxLength={20} autoComplete="tel" />
                {errors.whatsapp && <p className="text-xs text-primary">{errors.whatsapp}</p>}
              </div>
            </div>
          </div>

          {/* Car Info */}
          <div className="space-y-5">
            <h3 className="font-extrabold text-white text-base border-b border-border pb-3" style={{ fontWeight: 800 }}>
              Data Mobil
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="brand" className="text-sm font-700 text-white/70" style={{ fontWeight: 700 }}>
                  Merek Mobil <span className="text-primary">*</span>
                </label>
                <select id="brand" value={form.brand} onChange={(e) => handleChange('brand', e.target.value)} className="input-field">
                  <option value="">Pilih Merek</option>
                  {carBrands.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
                {errors.brand && <p className="text-xs text-primary">{errors.brand}</p>}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="carType" className="text-sm font-700 text-white/70" style={{ fontWeight: 700 }}>
                  Tipe / Model <span className="text-primary">*</span>
                </label>
                <input id="carType" type="text" value={form.carType}
                  onChange={(e) => handleChange('carType', e.target.value)}
                  placeholder="Contoh: Avanza G 1.5" className="input-field" maxLength={100} />
                {errors.carType && <p className="text-xs text-primary">{errors.carType}</p>}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="year" className="text-sm font-700 text-white/70" style={{ fontWeight: 700 }}>
                  Tahun <span className="text-primary">*</span>
                </label>
                <select id="year" value={form.year} onChange={(e) => handleChange('year', e.target.value)} className="input-field">
                  <option value="">Pilih Tahun</option>
                  {years.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
                {errors.year && <p className="text-xs text-primary">{errors.year}</p>}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="kilometer" className="text-sm font-700 text-white/70" style={{ fontWeight: 700 }}>
                  Kilometer <span className="text-primary">*</span>
                </label>
                <input id="kilometer" type="text" inputMode="numeric" value={form.kilometer}
                  onChange={(e) => handleChange('kilometer', e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="Contoh: 35000" className="input-field" maxLength={10} />
                {errors.kilometer && <p className="text-xs text-primary">{errors.kilometer}</p>}
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="desiredPrice" className="text-sm font-700 text-white/70" style={{ fontWeight: 700 }}>
                Harga yang Diinginkan <span className="text-primary">*</span>
              </label>
              <input id="desiredPrice" type="text" value={form.desiredPrice}
                onChange={(e) => handleChange('desiredPrice', e.target.value)}
                placeholder="Contoh: Rp 215.000.000 atau Nego" className="input-field" maxLength={100} />
              {errors.desiredPrice && <p className="text-xs text-primary">{errors.desiredPrice}</p>}
            </div>
            <div className="space-y-1.5">
              <label htmlFor="description" className="text-sm font-700 text-white/70" style={{ fontWeight: 700 }}>
                Kondisi &amp; Catatan Tambahan
              </label>
              <textarea id="description" value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Ceritakan kondisi mobil Anda secara singkat (opsional)..."
                className="input-field resize-none" rows={3} maxLength={500} />
            </div>
          </div>

          {/* Photo Upload — Per Position */}
          <div className="space-y-5">
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 12 }}>
              <h3 className="font-extrabold text-white text-base" style={{ fontWeight: 800 }}>
                Foto Mobil per Posisi
              </h3>
              <p className="text-xs text-white/40 mt-1">
                Upload foto sesuai posisi masing-masing (JPG/PNG/WebP, maks. 5MB). Foto tampak depan wajib diisi.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PHOTO_POSITIONS.map((pos) => {
                const preview = previews[pos.key as keyof PositionPreviews];
                const hasPhoto = !!photos[pos.key as keyof PositionPhotos];
                const posError = photoErrors[pos.key];
                const isRequired = pos.key === 'front';

                return (
                  <div key={pos.key} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon name={pos.icon as Parameters<typeof Icon>[0]['name']} size={15} className="text-primary" />
                      <label className="text-sm font-700 text-white/70" style={{ fontWeight: 700 }}>
                        {pos.label} {isRequired && <span className="text-primary">*</span>}
                      </label>
                    </div>

                    {hasPhoto && preview ? (
                      <div className="relative rounded-2xl overflow-hidden aspect-video group"
                        style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                        <img src={preview} alt={`Preview ${pos.label}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ background: 'rgba(0,0,0,0.5)' }}>
                          <button
                            type="button"
                            onClick={() => removePositionPhoto(pos.key)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-700 text-white"
                            style={{ fontWeight: 700, background: 'rgba(239,68,68,0.8)', border: '1px solid rgba(239,68,68,0.5)' }}
                            aria-label={`Hapus foto ${pos.label}`}
                          >
                            <Icon name="TrashIcon" size={13} className="text-white" />
                            Hapus
                          </button>
                        </div>
                        <div className="absolute bottom-2 left-2">
                          <span className="text-xs font-700 text-white px-2 py-0.5 rounded-full"
                            style={{ fontWeight: 700, background: 'rgba(34,197,94,0.7)' }}>
                            ✓ {pos.label}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileRefs[pos.key as keyof typeof fileRefs].current?.click()}
                        className="rounded-2xl p-5 text-center cursor-pointer transition-all aspect-video flex flex-col items-center justify-center"
                        style={{
                          border: posError ? '2px dashed rgba(239,68,68,0.5)' : '2px dashed rgba(255,255,255,0.12)',
                          background: posError ? 'rgba(239,68,68,0.04)' : 'rgba(255,255,255,0.03)',
                        }}
                        role="button"
                        aria-label={`Upload foto ${pos.label}`}
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileRefs[pos.key as keyof typeof fileRefs].current?.click(); }}
                      >
                        <Icon name="CameraIcon" size={24} className="text-white/30 mb-2" />
                        <p className="text-xs font-700 text-white/50" style={{ fontWeight: 700 }}>{pos.description}</p>
                        <p className="text-xs text-white/25 mt-0.5">Klik untuk upload</p>
                      </div>
                    )}

                    <input
                      ref={fileRefs[pos.key as keyof typeof fileRefs]}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={(e) => handlePositionFileChange(pos.key, e)}
                      className="hidden"
                      aria-label={`Pilih foto ${pos.label}`}
                    />
                    {posError && <p className="text-xs text-primary">{posError}</p>}
                  </div>
                );
              })}
            </div>

            {/* Upload progress summary */}
            <div className="flex items-center gap-3 rounded-2xl p-4"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <Icon name="PhotoIcon" size={16} className="text-white/40 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-white/50">
                  Foto terupload:{' '}
                  <strong className="text-white">
                    {Object.values(photos).filter(Boolean).length} / {PHOTO_POSITIONS.length}
                  </strong>
                </p>
                <div className="flex gap-1 mt-1.5">
                  {PHOTO_POSITIONS.map((pos) => (
                    <div key={pos.key} className="flex-1 h-1 rounded-full transition-all"
                      style={{ background: photos[pos.key as keyof PositionPhotos] ? '#ef4444' : 'rgba(255,255,255,0.1)' }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

                    {/* Submit Error */}
          {submitError && (
            <div className="flex items-center gap-3 rounded-2xl p-4"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <Icon name="ExclamationCircleIcon" size={16} className="text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-400">{submitError}</p>
            </div>
          )}

          {/* Security notice */}
          <div className="flex items-start gap-3 rounded-2xl p-4"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <Icon name="LockClosedIcon" size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-white/40 leading-relaxed">
              Data Anda dilindungi enkripsi SSL. Informasi pribadi tidak akan dibagikan tanpa persetujuan Anda. Formulir ini dilindungi dari spam dan penyalahgunaan.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Icon name="ArrowPathIcon" size={18} className="text-white animate-spin" />
                Mengirim Formulir...
              </>
            ) : (
              <>
                <Icon name="PaperAirplaneIcon" size={18} className="text-white" />
                Kirim Formulir Titip Jual
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}