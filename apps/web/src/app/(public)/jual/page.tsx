import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import SaleForm from './components/SaleForm';

export default function JualMobilPage() {
  return (
    <>
      <Header />

      <main
        className="pt-24 min-h-screen"
        style={{ background: 'rgba(8,8,14,1)' }}
      >
        <section className="px-4 pt-16 pb-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <span className="section-label">Jual Mobil</span>

            <h1 className="mt-3 text-4xl font-extrabold text-white md:text-5xl">
              Jual Mobil Anda dengan Mudah
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/55">
              Ajukan mobil Anda kepada MobilSiap. Isi data kendaraan,
              upload foto, dan tim kami akan menghubungi Anda untuk proses
              verifikasi serta penawaran.
            </p>
          </div>
        </section>

        <SaleForm />
      </main>

      <Footer />

      <WhatsAppFloat
        message="Halo MobilSiap, saya ingin menjual mobil"
      />
    </>
  );
}
