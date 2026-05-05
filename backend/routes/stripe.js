const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // your secret key

router.post('/create-checkout-session', async (req, res) => {
  const { student_email, amount_due } = req.body;

  if (!student_email || !amount_due || amount_due <= 0) {
    return res.status(400).json({ message: 'Invalid payment request' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'lkr',
          product_data: {
            name: 'Course Fee Payment',
            description: `Fee payment for ${student_email}`,
          },
          unit_amount: Math.round(amount_due * 100),
        },
        quantity: 1,
      }],
      success_url: `http://localhost:3000/student-dashboard`,
      cancel_url: `http://localhost:3000/payment-cancel`,
      metadata: { student_email },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Stripe create session error:', error);
    res.status(500).json({ message: 'Failed to create Stripe session' });
  }
});

module.exports = router;
