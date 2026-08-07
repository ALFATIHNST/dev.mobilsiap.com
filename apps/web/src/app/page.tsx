import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import HeroSection from '@/components/hero/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import FeaturedCarsSection from '@/components/sections/FeaturedCarsSection';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ConsignmentCTA from '@/components/sections/ConsignmentCTA';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <FeaturedCarsSection />
        <WhyChooseUs />
        <TestimonialsSection />
        <ConsignmentCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
