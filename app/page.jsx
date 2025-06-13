'use client';
import { useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (query) => {
    setIsLoading(true);
    setTimeout(() => {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
      setIsLoading(false);
    }, 500); // Simulate loading delay
  };

  return (
    <div className="container py-8">
      <header className="header-gradient text-center mb-8">
        <h1>Eduhub-KMR Store</h1>
        <p className="mt-2">Discover Premium Educational Resources</p>
      </header>
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {isLoading ? (
          <div className="col-span-full text-center">
            <span className="loading-spinner"></span>
            <p className="mt-2 text-gray-600">Searching...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
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
