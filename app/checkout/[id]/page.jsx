'use client';
import { useEffect } from 'react';
import Script from 'next/script';

export default function Checkout({ params }) {
  const products = {
    1: { name: 'Python Programming', price: 599, amount: 59900, description: 'Master Python with this comprehensive guide.', image: '/images/book1.jpg' },
    2: { name: 'Data Science Essentials', price: 799, amount: 79900, description: 'Learn data analysis and machine learning.', image: '/images/book2.jpg' },
    3: { name: 'Web Development 101', price: 499, amount: 49900, description: 'Build modern websites from scratch.', image: '/images/book3.jpg' },
    4: { name: 'Mathematics for Engineers', price: 699, amount: 69900, description: 'Core math concepts for engineering students.', image: '/images/book4.jpg' },
  };
  const product = products[params.id];

  const handlePayment = async () => {
    const res = await fetch('/api/razorpay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: product.amount }),
    });
    const { id: order_id, currency, amount } = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount,
      currency,
      name: 'Eduhub-KMR Store',
      description: product.name,
      image: '/images/logo.png',
      order_id,
      handler: async function (response) {
        const verifyRes = await fetch('/api/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });
        const verifyData = await verifyRes.json();
        if (verifyData.status === 'success') {
          alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
        } else {
          alert('Payment verification failed!');
        }
      },
      prefill: { name: '', email: '', contact: '' },
      theme: { color: '#2563eb' },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!product) {
    return <div className="text-center py-16">Product not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6">
        <img src={product.image} alt={product.name} className="w-full md:w-1/3 h-48 object-cover rounded-lg" />
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-xl font-bold text-blue-600 mt-4">₹{product.price}</p>
          <button
            onClick={handlePayment}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Pay Now
          </button>
        </div>
      </div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </div>
  );
}
