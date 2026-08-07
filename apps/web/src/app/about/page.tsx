import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import AboutHero from '@/app/about/components/AboutHero';
import AboutStory from '@/app/about/components/AboutStory';
import AboutTeam from '@/app/about/components/AboutTeam';
import AboutStats from '@/app/about/components/AboutStats';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen" style={{ background: 'rgba(8,8,14,1)' }}>
        <AboutHero />
        <AboutStats />
        <AboutStory />
        <AboutTeam />
      </main>
      <Footer />
      <WhatsAppFloat message="Halo MobilSiap, saya ingin mengetahui lebih lanjut tentang perusahaan Anda" />
    </>
  );
}