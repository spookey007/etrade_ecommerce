import ProductCard from './ProductCard';

const sideProducts = [
  { imageURL: '/beanie-grey.jpg', altText: 'Beanie - Grey', title: 'Beanie - Grey', price: '€59.00 EUR' },
  { imageURL: '/pullover-v-neck.jpg', altText: 'Kaschmir Pullover V-Neck - Grau Women', title: 'Kaschmir Pullover V-Neck - Grau Women', price: '€279.00 EUR' }
];

export default function SideProducts() {
  return (
    <aside className="flex flex-col gap-6 p-4 bg-transparent rounded-lg shadow-md w-56">
      {sideProducts.map((p, i) => (
        <ProductCard key={i} {...p} />
      ))}
    </aside>
  );
}
