'use client';
import { useState } from 'react';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';

export default function Home() {
  const products = [
    { id: 1, name: 'Python Programming', price: 599, description: 'Master Python with this comprehensive guide.', image: '/images/book1.jpg' },
    { id: 2, name: 'Data Science Essentials', price: 799, description: 'Learn data analysis and machine learning.', image: '/images/book2.jpg' },
    { id: 3, name: 'Web Development 101', price: 499, description: 'Build modern websites from scratch.', image: '/images/book3.jpg' },
    { id: 4, name: 'Mathematics for Engineers', price: 699, description: 'Core math concepts for engineering students.', image: '/images/book4.jpg' },
  ];

  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (query) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="text-center py-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold">Eduhub-KMR Store</h1>
        <p className="mt-2 text-lg md:text-xl">Discover Premium Educational Resources</p>
      </header>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
}
