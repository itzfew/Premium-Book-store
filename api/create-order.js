const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_live_VQo4oZzKVayCnq',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'wJ0k7ZF3CHPnfVZbiTCzDwRz',
});

app.post('/create-order', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount, // Amount in paise
      currency,
      receipt: `receipt_${Date.now()}`,
    });
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

module.exports = app;
