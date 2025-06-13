'use client';
import { useEffect } from 'react';
import Script from 'next/script';

export default function Checkout({ params }) {
  const product = {
    1: { name: 'Product 1', price: 499, amount: 49900 }, // Amount in paise
    2: { name: 'Product 2', price: 799, amount: 79900 },
  }[params.id];

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
      name: 'My E-Commerce Store',
      description: product.name,
      order_id,
      handler: function (response) {
        alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
        // Optionally, verify payment on the server
      },
      prefill: { name: '', email: '', contact: '' },
      theme: { color: '#528FF0' },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="max-w-3xl mx-auto my-16 p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="border p-5 rounded">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-gray-600">₹{product.price}</p>
        <button
          onClick={handlePayment}
          className="mt-4 bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
        >
          Pay Now
        </button>
      </div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </div>
  );
}
