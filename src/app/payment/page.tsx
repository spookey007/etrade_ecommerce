import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function PaymentPage() {
  return (
    <div className="bg-transparent">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-white">Payment</h1>
        <form className="bg-gray-800 rounded-lg p-6 text-white flex flex-col gap-4">
          <input className="bg-gray-700 rounded px-3 py-2" placeholder="Card Number" />
          <input className="bg-gray-700 rounded px-3 py-2" placeholder="Expiry Date" />
          <input className="bg-gray-700 rounded px-3 py-2" placeholder="CVV" />
          <button className="bg-green-600 hover:bg-green-700 rounded px-4 py-2 font-bold mt-4" type="submit">Pay Now</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
