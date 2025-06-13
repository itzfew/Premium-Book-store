'use client';
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="mt-6">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for books..."
        className="w-full max-w-md mx-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
  );
}
