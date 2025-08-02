import ProductCard from './ProductCard';

const sideProducts = [
  { image: '/beanie-grey.jpg', title: 'Beanie - Grey', price: 59 },
  { image: '/pullover-v-neck.jpg', title: 'Kaschmir Pullover V-Neck - Grau Women', price: 279 }
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
