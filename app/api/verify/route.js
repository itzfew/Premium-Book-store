import crypto from 'crypto';

export async function POST(request) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();
  const secret = process.env.RAZORPAY_KEY_SECRET;

  const shasum = crypto.createHmac('sha256', secret);
  shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = shasum.digest('hex');

  if (digest === razorpay_signature) {
    return new Response(JSON.stringify({ status: 'success' }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ status: 'failure' }), { status: 400 });
  }
}
