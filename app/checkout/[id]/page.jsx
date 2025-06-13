import Link from 'next/link';

export default function Home() {
  const products = [
    { id: 1, name: 'Product 1', price: 499, image: '/product1.jpg' },
    { id: 2, name: 'Product 2', price: 799, image: '/product2.jpg' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold">My E-Commerce Store</h1>
        <p className="text-gray-600">Shop the best products!</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">₹{product.price}</p>
            <Link href={`/checkout/${product.id}`}>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                Buy Now
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
