import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function JualMobilPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen pt-32 max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white">
          Jual Mobil
        </h1>

        <p className="mt-4 text-white/70">
          Halaman jual mobil sedang dipersiapkan.
        </p>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
