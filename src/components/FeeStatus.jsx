import React, { useState, useEffect } from 'react';


const FeeStatus = ({ studentEmail }) => {
  const [showStripe, setShowStripe] = useState(false);
  const [fees, setFees] = useState({ total: 0, paid: 0, due: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeeStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/payments/student/${studentEmail}`);
        const data = await response.json();
        
        if (response.ok) {
          const total = data.reduce((sum, payment) => sum + payment.amount, 0);
          const paid = data.filter(p => new Date(p.nextPaymentDate) > new Date())
                          .reduce((sum, payment) => sum + payment.amount, 0);
          const due = total - paid;
          
          setFees({ total, paid, due });
        }
      } catch (error) {
        console.error("Failed to fetch fee status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (studentEmail) {
      fetchFeeStatus();
    }
  }, [studentEmail]);

  const handleStripe = async () => {
    try {
      const stripe = await loadStripe("pk_test_51RKy3QE2DDNl5ffIo9pHfGi4ECQbzSumlgkbKATsreLN8cEMNeUxWyeDEnBkDEyPlC5kffUJeIUz9agK5yamfo8200EVr7Wt89");

      const response = await fetch(`http://localhost:5000/api/payments/student/${studentEmail}`);
      const paymentsData = await response.json();
      
      if (!response.ok) throw new Error("Failed to fetch payment details");

      const duePayments = paymentsData.filter(payment => 
        new Date(payment.nextPaymentDate) <= new Date()
      );

      if (duePayments.length === 0) {
        alert("You don't have any pending payments!");
        return;
      }

      const lineItems = duePayments.map(payment => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Course Fee Payment',
            description: `Payment for educational services (${payment.payment_id})`
          },
          unit_amount: Math.round(payment.amount * 100),
        },
        quantity: 1,
      }));

      const sessionResponse = await fetch("http://localhost:5000/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          line_items: lineItems,
          student_email: studentEmail,
          payment_ids: duePayments.map(p => p.payment_id)
        }),
      });

      const session = await sessionResponse.json();

      if (!sessionResponse.ok || !session.id) {
        throw new Error("Stripe session creation failed");
      }

      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error("Stripe redirect error:", result.error.message);
        alert("Payment failed to start. Please try again.");
      }

    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment process failed. Please try again.");
    }
  };

  if (isLoading) return <div>Loading fee status...</div>;

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Fee Status</h2>
      <ul className="space-y-2 mb-4">
        <li>Total Fees: ${fees.total.toFixed(2)}</li>
        <li>Paid: ${fees.paid.toFixed(2)}</li>
        <li>Due: ${fees.due.toFixed(2)}</li>
      </ul>
      {fees.due > 0 && (
        <button 
          className="btn btn-success" 
          onClick={handleStripe}
        >
          Pay Now
        </button>
      )}
    </div>
  );
};

export default FeeStatus;