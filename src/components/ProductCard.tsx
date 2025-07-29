type ProductCardProps = {
  imageURL: string;
  altText: string;
  title: string;
  price: string;
  description?: string;
  category?: string;
};

export default function ProductCard({ }: ProductCardProps) {
  return (
    <div className="bg-black border border-gray-800 rounded-xl shadow-lg p-5 flex flex-col items-center w-64 hover:shadow-blue-900 transition-shadow duration-200">
    
    </div>
  );
}
