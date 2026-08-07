'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import Icon from '@/components/ui/AppIcon';

interface Consignment {
  id: string;
  owner_name: string;
  whatsapp: string;
  brand: string;
  car_type: string;
  year: number;
  kilometer: number;
  desired_price: string;
  description: string | null;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  photo_front: string | null;
  photo_back: string | null;
  photo_left: string | null;
  photo_right: string | null;
  photo_interior: string | null;
  admin_notes: string | null;
  created_at: string;
}

interface Car {
  id: string;
  name: string;
  brand: string;
  car_type: string;
  year: number;
  transmission: string;
  kilometer: number;
  tax: string;
  price: number;
  body_type: string;
  color: string;
  engine: string;
  location: string;
  description: string | null;
  is_available: boolean;
  photos: { src: string; label: string }[];
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: 'rgba(234,179,8,0.15)',
  reviewing: 'rgba(59,130,246,0.15)',
  approved: 'rgba(34,197,94,0.15)',
  rejected: 'rgba(239,68,68,0.15)',
};
const statusTextColors: Record<string, string> = {
  pending: '#eab308',
  reviewing: '#3b82f6',
  approved: '#22c55e',
  rejected: '#ef4444',
};
const statusLabels: Record<string, string> = {
  pending: 'Menunggu',
  reviewing: 'Ditinjau',
  approved: 'Disetujui',
  rejected: 'Ditolak',
};

function formatPrice(num: number): string {
  return `Rp ${num.toLocaleString('id-ID')}`;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'consignments' | 'cars'>('consignments');
  const [consignments, setConsignments] = useState<Consignment[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');
  const [selectedConsignment, setSelectedConsignment] = useState<Consignment | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [showAddCar, setShowAddCar] = useState(false);
  const [carForm, setCarForm] = useState({
    name: '', brand: '', car_type: '', year: '', transmission: 'Manual',
    kilometer: '', tax: 'Hidup', price: '', body_type: 'MPV',
    color: '', engine: '', location: 'Bandung', description: '',
  });
  const [carFormLoading, setCarFormLoading] = useState(false);
  const [carFormError, setCarFormError] = useState('');

  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace('/login'); return; }
      setAdminEmail(user.email || '');
      await Promise.all([fetchConsignments(supabase), fetchCars(supabase)]);
      setLoading(false);
    };
    init();
  }, [router]);

  const fetchConsignments = async (supabase: ReturnType<typeof createClient>) => {
    const { data, error } = await supabase
      .from('consignments')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setConsignments(data || []);
  };

  const fetchCars = async (supabase: ReturnType<typeof createClient>) => {
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setCars(data || []);
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  const updateConsignmentStatus = async (id: string, status: string) => {
    setUpdatingStatus(id);
    const supabase = createClient();
    const { error } = await supabase
      .from('consignments')
      .update({ status })
      .eq('id', id);
    if (!error) {
      setConsignments((prev) => prev.map((c) => c.id === id ? { ...c, status: status as any } : c));
      if (selectedConsignment?.id === id) setSelectedConsignment((prev) => prev ? { ...prev, status: status as any } : null);
    }
    setUpdatingStatus(null);
  };

  const toggleCarAvailability = async (id: string, current: boolean) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('cars')
      .update({ is_available: !current })
      .eq('id', id);
    if (!error) setCars((prev) => prev.map((c) => c.id === id ? { ...c, is_available: !current } : c));
  };

  const deleteCar = async (id: string) => {
    if (!confirm('Hapus mobil ini dari inventaris?')) return;
    const supabase = createClient();
    const { error } = await supabase.from('cars').delete().eq('id', id);
    if (!error) setCars((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAddCar = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarFormLoading(true);
    setCarFormError('');
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('cars').insert({
        name: carForm.name,
        brand: carForm.brand,
        car_type: carForm.car_type,
        year: parseInt(carForm.year),
        transmission: carForm.transmission,
        kilometer: parseInt(carForm.kilometer),
        tax: carForm.tax,
        price: parseInt(carForm.price.replace(/\D/g, '')),
        body_type: carForm.body_type,
        color: carForm.color,
        engine: carForm.engine,
        location: carForm.location,
        description: carForm.description || null,
        is_available: true,
        photos: [],
      }).select().single();

      if (error) { setCarFormError('Gagal menambah mobil: ' + error.message); setCarFormLoading(false); return; }
      setCars((prev) => [data, ...prev]);
      setShowAddCar(false);
      setCarForm({ name: '', brand: '', car_type: '', year: '', transmission: 'Manual', kilometer: '', tax: 'Hidup', price: '', body_type: 'MPV', color: '', engine: '', location: 'Bandung', description: '' });
    } catch (err: any) {
      setCarFormError('Terjadi kesalahan.');
    }
    setCarFormLoading(false);
  };

  const pendingCount = consignments.filter((c) => c.status === 'pending').length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0f' }}>
        <div className="flex flex-col items-center gap-4">
          <Icon name="ArrowPathIcon" size={40} className="text-primary animate-spin" />
          <p className="text-white/50">Memuat panel admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between"
        style={{ background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}>
            <Icon name="ShieldCheckIcon" size={18} className="text-primary" />
          </div>
          <div>
            <span className="text-base font-extrabold text-white" style={{ fontWeight: 800 }}>MobilSiap Admin</span>
            <p className="text-xs text-white/30">{adminEmail}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xs text-white/40 hover:text-white transition-colors px-3 py-1.5 rounded-full"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            Lihat Website
          </Link>
          <button onClick={handleSignOut}
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-red-400 transition-colors px-3 py-1.5 rounded-full"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <Icon name="ArrowRightOnRectangleIcon" size={14} />
            Keluar
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Mobil', value: cars.length, icon: 'TruckIcon', color: '#3b82f6' },
            { label: 'Mobil Tersedia', value: cars.filter((c) => c.is_available).length, icon: 'CheckCircleIcon', color: '#22c55e' },
            { label: 'Pengajuan Titip Jual', value: consignments.length, icon: 'ClipboardDocumentListIcon', color: '#a855f7' },
            { label: 'Menunggu Review', value: pendingCount, icon: 'ClockIcon', color: '#eab308' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl p-5 space-y-2"
              style={{ background: 'rgba(18,18,28,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center justify-between">
                <p className="text-xs text-white/40">{stat.label}</p>
                <Icon name={stat.icon as any} size={16} style={{ color: stat.color }} />
              </div>
              <p className="text-2xl font-extrabold text-white" style={{ fontWeight: 800, color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {[
            { key: 'consignments', label: 'Titip Jual', badge: pendingCount },
            { key: 'cars', label: 'Inventaris Mobil', badge: 0 },
          ].map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key as any)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-700 transition-all"
              style={{
                fontWeight: 700,
                background: activeTab === tab.key ? '#ef4444' : 'rgba(255,255,255,0.06)',
                color: activeTab === tab.key ? 'white' : 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
              {tab.label}
              {tab.badge > 0 && (
                <span className="text-xs px-1.5 py-0.5 rounded-full font-700"
                  style={{ background: activeTab === tab.key ? 'rgba(255,255,255,0.2)' : 'rgba(239,68,68,0.3)', color: activeTab === tab.key ? 'white' : '#ef4444' }}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Consignments Tab */}
        {activeTab === 'consignments' && (
          <div className="space-y-4">
            {consignments.length === 0 ? (
              <div className="text-center py-16 text-white/40">
                <Icon name="ClipboardDocumentListIcon" size={40} className="mx-auto mb-3 opacity-30" />
                <p>Belum ada pengajuan titip jual.</p>
              </div>
            ) : (
              consignments.map((c) => (
                <div key={c.id} className="rounded-2xl p-5 space-y-4"
                  style={{ background: 'rgba(18,18,28,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-extrabold text-white" style={{ fontWeight: 800 }}>
                          {c.brand} {c.car_type} {c.year}
                        </h3>
                        <span className="text-xs px-2 py-0.5 rounded-full font-700"
                          style={{ fontWeight: 700, background: statusColors[c.status], color: statusTextColors[c.status] }}>
                          {statusLabels[c.status]}
                        </span>
                      </div>
                      <p className="text-sm text-white/50">
                        {c.owner_name} · <a href={`https://wa.me/${c.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">{c.whatsapp}</a>
                      </p>
                      <p className="text-sm text-white/40">
                        {c.kilometer.toLocaleString('id-ID')} KM · Harga: <strong className="text-white">{c.desired_price}</strong>
                      </p>
                      {c.description && <p className="text-xs text-white/30 mt-1">{c.description}</p>}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Photos */}
                      {[c.photo_front, c.photo_back, c.photo_left, c.photo_right, c.photo_interior].filter(Boolean).length > 0 && (
                        <button onClick={() => setSelectedConsignment(c)}
                          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full text-white/50 hover:text-white transition-colors"
                          style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}>
                          <Icon name="PhotoIcon" size={13} />
                          Lihat Foto ({[c.photo_front, c.photo_back, c.photo_left, c.photo_right, c.photo_interior].filter(Boolean).length})
                        </button>
                      )}
                      {/* Status Actions */}
                      {c.status === 'pending' && (
                        <>
                          <button onClick={() => updateConsignmentStatus(c.id, 'reviewing')}
                            disabled={updatingStatus === c.id}
                            className="text-xs px-3 py-1.5 rounded-full font-700 transition-all disabled:opacity-50"
                            style={{ fontWeight: 700, background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', color: '#3b82f6' }}>
                            Tinjau
                          </button>
                          <button onClick={() => updateConsignmentStatus(c.id, 'approved')}
                            disabled={updatingStatus === c.id}
                            className="text-xs px-3 py-1.5 rounded-full font-700 transition-all disabled:opacity-50"
                            style={{ fontWeight: 700, background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e' }}>
                            Setujui
                          </button>
                          <button onClick={() => updateConsignmentStatus(c.id, 'rejected')}
                            disabled={updatingStatus === c.id}
                            className="text-xs px-3 py-1.5 rounded-full font-700 transition-all disabled:opacity-50"
                            style={{ fontWeight: 700, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}>
                            Tolak
                          </button>
                        </>
                      )}
                      {c.status === 'reviewing' && (
                        <>
                          <button onClick={() => updateConsignmentStatus(c.id, 'approved')}
                            disabled={updatingStatus === c.id}
                            className="text-xs px-3 py-1.5 rounded-full font-700 transition-all disabled:opacity-50"
                            style={{ fontWeight: 700, background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e' }}>
                            Setujui
                          </button>
                          <button onClick={() => updateConsignmentStatus(c.id, 'rejected')}
                            disabled={updatingStatus === c.id}
                            className="text-xs px-3 py-1.5 rounded-full font-700 transition-all disabled:opacity-50"
                            style={{ fontWeight: 700, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}>
                            Tolak
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-white/20">
                    Dikirim: {new Date(c.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Cars Tab */}
        {activeTab === 'cars' && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button onClick={() => setShowAddCar(true)}
                className="btn-primary text-sm py-2.5 px-5">
                <Icon name="PlusCircleIcon" size={16} className="text-white" />
                Tambah Mobil
              </button>
            </div>

            {cars.length === 0 ? (
              <div className="text-center py-16 text-white/40">
                <Icon name="TruckIcon" size={40} className="mx-auto mb-3 opacity-30" />
                <p>Belum ada mobil di inventaris.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cars.map((car) => (
                  <div key={car.id} className="rounded-2xl overflow-hidden"
                    style={{ background: 'rgba(18,18,28,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    {/* Photo */}
                    <div className="relative h-36 overflow-hidden"
                      style={{ background: 'rgba(255,255,255,0.04)' }}>
                      {car.photos?.[0]?.src ? (
                        <img src={car.photos[0].src} alt={car.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Icon name="PhotoIcon" size={32} className="text-white/20" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <span className="text-xs px-2 py-0.5 rounded-full font-700"
                          style={{ fontWeight: 700, background: car.is_available ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)', color: car.is_available ? '#22c55e' : '#ef4444' }}>
                          {car.is_available ? 'Tersedia' : 'Terjual'}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-extrabold text-white text-sm" style={{ fontWeight: 800 }}>{car.name} {car.year}</h3>
                        <p className="text-xs text-white/40">{car.transmission} · {car.kilometer.toLocaleString('id-ID')} KM · Pajak {car.tax}</p>
                      </div>
                      <p className="text-base font-extrabold text-primary" style={{ fontWeight: 800 }}>{formatPrice(car.price)}</p>
                      <div className="flex gap-2">
                        <button onClick={() => toggleCarAvailability(car.id, car.is_available)}
                          className="flex-1 text-xs py-2 rounded-full font-700 transition-all"
                          style={{ fontWeight: 700, background: car.is_available ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)', border: `1px solid ${car.is_available ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.2)'}`, color: car.is_available ? '#ef4444' : '#22c55e' }}>
                          {car.is_available ? 'Tandai Terjual' : 'Tandai Tersedia'}
                        </button>
                        <button onClick={() => deleteCar(car.id)}
                          className="p-2 rounded-full transition-all hover:bg-red-500/20"
                          style={{ border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}
                          aria-label="Hapus mobil">
                          <Icon name="TrashIcon" size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Consignment Photo Modal */}
      {selectedConsignment && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={() => setSelectedConsignment(null)}>
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 space-y-4"
            style={{ background: 'rgba(14,14,22,0.97)', border: '1px solid rgba(255,255,255,0.1)' }}
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-white" style={{ fontWeight: 800 }}>
                Foto: {selectedConsignment.brand} {selectedConsignment.car_type} {selectedConsignment.year}
              </h3>
              <button onClick={() => setSelectedConsignment(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.1)' }}>
                <Icon name="XMarkIcon" size={16} className="text-white" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { url: selectedConsignment.photo_front, label: 'Tampak Depan' },
                { url: selectedConsignment.photo_back, label: 'Tampak Belakang' },
                { url: selectedConsignment.photo_left, label: 'Samping Kiri' },
                { url: selectedConsignment.photo_right, label: 'Samping Kanan' },
                { url: selectedConsignment.photo_interior, label: 'Interior' },
              ].filter((p) => p.url).map((photo) => (
                <div key={photo.label} className="space-y-1">
                  <div className="rounded-xl overflow-hidden aspect-video">
                    <img src={photo.url!} alt={photo.label} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs text-white/40 text-center">{photo.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Car Modal */}
      {showAddCar && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={() => setShowAddCar(false)}>
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6"
            style={{ background: 'rgba(14,14,22,0.97)', border: '1px solid rgba(255,255,255,0.1)' }}
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-extrabold text-white text-lg" style={{ fontWeight: 800 }}>Tambah Mobil Baru</h3>
              <button onClick={() => setShowAddCar(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.1)' }}>
                <Icon name="XMarkIcon" size={16} className="text-white" />
              </button>
            </div>

            {carFormError && (
              <div className="flex items-center gap-2 rounded-xl p-3 mb-4"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <p className="text-sm text-red-400">{carFormError}</p>
              </div>
            )}

            <form onSubmit={handleAddCar} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'name', label: 'Nama Mobil', placeholder: 'Toyota Avanza', required: true },
                  { id: 'brand', label: 'Merek', placeholder: 'Toyota', required: true },
                  { id: 'car_type', label: 'Tipe/Model', placeholder: 'Avanza G 1.5', required: true },
                  { id: 'year', label: 'Tahun', placeholder: '2022', required: true, type: 'number' },
                  { id: 'kilometer', label: 'Kilometer', placeholder: '35000', required: true, type: 'number' },
                  { id: 'price', label: 'Harga (Rp)', placeholder: '215000000', required: true },
                  { id: 'color', label: 'Warna', placeholder: 'Silver', required: true },
                  { id: 'engine', label: 'Mesin', placeholder: '1.5L', required: true },
                  { id: 'location', label: 'Lokasi', placeholder: 'Bandung', required: true },
                ].map((field) => (
                  <div key={field.id} className="space-y-1">
                    <label className="text-xs font-700 text-white/60" style={{ fontWeight: 700 }}>{field.label} {field.required && <span className="text-primary">*</span>}</label>
                    <input
                      type={field.type || 'text'}
                      value={(carForm as any)[field.id]}
                      onChange={(e) => setCarForm((prev) => ({ ...prev, [field.id]: e.target.value }))}
                      placeholder={field.placeholder}
                      className="input-field text-sm"
                      required={field.required}
                    />
                  </div>
                ))}
                <div className="space-y-1">
                  <label className="text-xs font-700 text-white/60" style={{ fontWeight: 700 }}>Transmisi</label>
                  <select value={carForm.transmission} onChange={(e) => setCarForm((prev) => ({ ...prev, transmission: e.target.value }))} className="input-field text-sm">
                    <option value="Manual">Manual</option>
                    <option value="Otomatis">Otomatis</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-700 text-white/60" style={{ fontWeight: 700 }}>Pajak</label>
                  <select value={carForm.tax} onChange={(e) => setCarForm((prev) => ({ ...prev, tax: e.target.value }))} className="input-field text-sm">
                    <option value="Hidup">Hidup</option>
                    <option value="Mati">Mati</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-700 text-white/60" style={{ fontWeight: 700 }}>Tipe Bodi</label>
                  <select value={carForm.body_type} onChange={(e) => setCarForm((prev) => ({ ...prev, body_type: e.target.value }))} className="input-field text-sm">
                    {['MPV', 'SUV', 'Sedan', 'Hatchback', 'Pickup'].map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-700 text-white/60" style={{ fontWeight: 700 }}>Deskripsi</label>
                <textarea value={carForm.description} onChange={(e) => setCarForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Deskripsi kondisi mobil..." className="input-field text-sm resize-none" rows={3} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddCar(false)}
                  className="flex-1 py-3 rounded-full text-sm font-700 text-white/50 hover:text-white transition-all"
                  style={{ fontWeight: 700, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}>
                  Batal
                </button>
                <button type="submit" disabled={carFormLoading}
                  className="flex-1 btn-primary py-3 text-sm justify-center disabled:opacity-60">
                  {carFormLoading ? <Icon name="ArrowPathIcon" size={16} className="text-white animate-spin" /> : 'Simpan Mobil'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
