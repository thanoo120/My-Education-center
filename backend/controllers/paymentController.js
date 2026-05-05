const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('../models/db');
const Payment=require('../models/payment');

const createPayment = async (req, res) => {
  const { amount, currency, student_email } = req.body;

  try {
    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      receipt_email: student_email,
    });

    // Store the payment details in the database
    await db.query(
      'INSERT INTO payments (student_email, amount, payment_id) VALUES (?, ?, ?)',
      [student_email, amount, paymentIntent.id]
    );

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
const getAllPaymentsByStudents = async (req, res) => {  
  try {
    const [rows] = await db.query(`
      SELECT p.payment_id, s.name, p.amount, 
             CASE 
               WHEN p.nextPaymentDate > CURDATE() THEN 'Pending'
               ELSE 'Paid'
             END AS status
      FROM payments p
      JOIN students s ON p.student_email = s.email
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
const getStudentPayment = async (req, res) => {
  const { student_email } = req.params;
  try {
    const [rows] = await db.query(
      'SELECT * FROM payments WHERE student_email = ?',
      [student_email]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
const getPendingPayments = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM payments WHERE nextPaymentDate > CURDATE()'
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

const monthlyTotals = async (_req, res) => {
  try {
    const [rows] = Payment.getThisMonthsTotal();
    res.json(rows);             
  } catch (e) {
    res.status(500).json({error:'Server error'});
  }
}

module.exports = {getAllPaymentsByStudents, createPayment, getStudentPayment,getPendingPayments,monthlyTotals};
