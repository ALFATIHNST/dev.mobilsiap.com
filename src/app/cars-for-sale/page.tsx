import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import CarsForSaleClient from '@/app/cars-for-sale/components/CarsForSaleClient';

export default function CarsForSalePage() {
  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen" style={{ background: 'rgba(8,8,14,1)' }}>
        <CarsForSaleClient />
      </main>
      <Footer />
      <WhatsAppFloat message="Halo MobilSiap, saya ingin melihat daftar mobil yang tersedia" />
    </>
  );
}