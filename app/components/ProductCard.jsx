import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <div className="product-card group">
      {product.image ? (
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      ) : (
        <div className="image-placeholder">No Image</div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
        <p className="text-blue-600 font-bold mt-2">₹{product.price}</p>
        <Link href={`/checkout/${product.id}`}>
          <button className="btn-primary mt-4 w-full">Buy Now</button>
        </Link>
      </div>
    </div>
  );
}
