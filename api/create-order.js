const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.VERCEL_URL || '*' }));
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post('/create-order', async (req, res) => {
  const { amount, currency } = req.body;

  if (!amount || !currency || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount or currency' });
  }

  try {
    const order = await razorpay.orders.create({
      amount: Number(amount),
      currency,
      receipt: `receipt_${Date.now()}`,
    });
    res.status(200).json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('Razorpay error:', error);
    res.status(500).json({ error: 'Failed to create order', details: error.message });
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API is running' });
});

// Export for Vercel
module.exports = app;
