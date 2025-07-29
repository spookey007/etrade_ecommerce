import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AboutPage() {
  return (
    <div className="bg-transparent">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-white">About Us</h1>
        <div className="bg-gray-800 rounded-lg p-6 text-white">
          <p>Welcome to Fashion Store! We are passionate about bringing you the latest trends in fashion with a seamless online shopping experience.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
