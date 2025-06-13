'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="container flex justify-between items-center py-4">
        <Link href="/" className="flex items-center">
          <img src="/images/logo.png" alt="Eduhub-KMR Logo" className="h-10 mr-2" />
          <span className="text-xl font-bold">Eduhub-KMR</span>
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="navbar-link">Home</Link>
          <Link href="/about" className="navbar-link">About</Link>
          <Link href="/contact" className="navbar-link">Contact</Link>
        </div>
        <button className="md:hidden" onClick={toggleMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="navbar-mobile-menu">
          <Link href="/" className="block px-4 py-2 navbar-link" onClick={toggleMenu}>Home</Link>
          <Link href="/about" className="block px-4 py-2 navbar-link" onClick={toggleMenu}>About</Link>
          <Link href="/contact" className="block px-4 py-2 navbar-link" onClick={toggleMenu}>Contact</Link>
        </div>
      )}
    </nav>
  );
}
