import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import HeroSection from '@/app/components/HeroSection';
import ServicesSection from '@/app/components/ServicesSection';
import FeaturedCarsSection from '@/app/components/FeaturedCarsSection';
import WhyChooseUs from '@/app/components/WhyChooseUs';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import ConsignmentCTA from '@/app/components/ConsignmentCTA';

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