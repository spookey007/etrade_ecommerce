import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import ProductGallery from '../components/ProductGallery';
import SideProducts from '../components/SideProducts';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <Header />
      <main className="flex-grow flex flex-col gap-8 pt-30 px-4 py-8 max-w-7xl mx-auto w-full">
        <div className="">
          {/* <HeroSection /> */}
          <ProductGallery />
        </div>
        {/* <div className="hidden md:block w-64">
          <SideProducts />
        </div> */}
      </main>
      <Footer />
    </div>
  );
}
// ...existing code removed...
