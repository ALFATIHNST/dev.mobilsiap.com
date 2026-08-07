import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import ContactInfo from '@/app/contact/components/ContactInfo';
import ContactForm from '@/app/contact/components/ContactForm';
import ContactMap from '@/app/contact/components/ContactMap';

export default function KontakPage() {
  return (
    <>
      <Header />

      <main
        className="pt-24 min-h-screen"
        style={{ background: 'rgba(8,8,14,1)' }}
      >
        <div
          className="py-16 px-4 sm:px-6 lg:px-8"
          style={{
            background: 'rgba(10,10,16,0.9)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div className="max-w-7xl mx-auto">
            <span className="section-label">Hubungi Kami</span>

            <h1
              className="text-section-heading font-extrabold text-white mt-2"
              style={{ fontWeight: 800 }}
            >
              Kami Siap Membantu<br />
              <span className="text-primary">Kapan Saja</span>
            </h1>

            <p className="text-white/50 text-lg mt-4 max-w-xl">
              Punya pertanyaan tentang mobil atau layanan kami? Hubungi tim
              MobilSiap melalui berbagai saluran komunikasi di bawah ini.
            </p>
          </div>
        </div>

        <ContactInfo />

        <div
          className="py-16 px-4 sm:px-6 lg:px-8"
          style={{ background: 'rgba(10,10,16,0.95)' }}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactMap />
          </div>
        </div>
      </main>

      <Footer />

      <WhatsAppFloat message="Halo MobilSiap, saya ingin bertanya" />
    </>
  );
}
