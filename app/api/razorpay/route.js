import Razorpay from 'razorpay';
import shortid from 'shortid';

export async function POST(request) {
  const { amount } = await request.json();

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: amount.toString(), // Amount in paise
    currency: 'INR',
    receipt: shortid.generate(),
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);
    return new Response(JSON.stringify({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to create order' }), { status: 400 });
  }
}
