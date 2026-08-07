import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import RepairHero from '@/app/repair-service/components/RepairHero';
import RepairServices from '@/app/repair-service/components/RepairServices';
import RepairSpooring from '@/app/repair-service/components/RepairSpooring';
import RepairBooking from '@/app/repair-service/components/RepairBooking';

export default function ReparasiPage() {
  return (
    <>
      <Header />

      <main
        className="pt-24 min-h-screen"
        style={{ background: 'rgba(8,8,14,1)' }}
      >
        <RepairHero />
        <RepairServices />
        <RepairSpooring />
        <RepairBooking />
      </main>

      <Footer />

      <WhatsAppFloat message="Halo MobilSiap, saya ingin booking servis/reparasi mobil" />
    </>
  );
}
