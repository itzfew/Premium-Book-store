'use client';
import { useState } from 'react';

export default function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative mt-6">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for books..."
        className="search-bar"
        disabled={isLoading}
      />
      {isLoading && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 loading-spinner"></span>
      )}
    </div>
  );
}
