import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import ConsignmentHero from '@/app/consignment/components/ConsignmentHero';
import ConsignmentForm from '@/app/consignment/components/ConsignmentForm';
import ConsignmentProcess from '@/app/consignment/components/ConsignmentProcess';
import ConsignmentTrust from '@/app/consignment/components/ConsignmentTrust';

export default function ConsignmentPage() {
  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen" style={{ background: 'rgba(8,8,14,1)' }}>
        <ConsignmentHero />
        <ConsignmentProcess />
        <ConsignmentTrust />
        <ConsignmentForm />
      </main>
      <Footer />
      <WhatsAppFloat message="Halo MobilSiap, saya ingin bertanya tentang titip jual mobil" />
    </>
  );
}