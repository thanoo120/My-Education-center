import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import 'animate.css/animate.min.css';         // Ensure Animate.css is imported

// Import your chosen background image
import feeBackgroundImage from '../assests/crdit.jpg'; // <--- Add your image path here

const FeeStatus = ({ studentEmail }) => {
  const [fees, setFees] = useState({ total: 0, paid: 0, due: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const formatter = new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
  });

  useEffect(() => {
    const fetchFeeStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/fees/status/${studentEmail}`);
        const data = await response.json();

        if (response.ok) {
          setFees({
            total: parseFloat(data.totalFees),
            paid: parseFloat(data.totalPaid),
            due: parseFloat(data.balance),
          });
        } else {
          console.error("Failed to fetch fee status:", data);
          // Handle error, e.g., set fees to default values or show a message
          setFees({ total: 0, paid: 0, due: 0 });
        }
      } catch (error) {
        console.error("Failed to fetch fee status:", error);
        // Handle network error, e.g., set fees to default values or show a message
        setFees({ total: 0, paid: 0, due: 0 });
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
      // Ensure the Stripe publishable key is correct
      const stripe = await loadStripe("pk_test_51RKy3QE2DDNl5ffIy37uFwPBIPuMFTqBsfUdhyv6ewzqrGzn4AmIw7BJkK3ULl471ENVws1wLHt6gdQROwdawyBL00g5sEtjoW");

      const sessionResponse = await fetch("http://localhost:5000/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_email: studentEmail,
          // Send the actual amount due, or a fixed amount for testing if preferred
          amount_due: fees.due > 0 ? fees.due : 100, // Example: ensure amount_due is positive for Stripe
        }),
      });

      const session = await sessionResponse.json();

      if (!sessionResponse.ok || !session.id) {
        throw new Error(session.message || "Stripe session creation failed");
      }

      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error("Stripe redirect error:", result.error.message);
        alert("Payment failed to start. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment process failed. Please try again. " + error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="ms-3 text-muted">Loading fee status...</p>
      </div>
    );
  }

  return (
    // Outer container for the background image
    <div
      className="position-relative d-flex justify-content-center align-items-center py-5" // Added flex for centering
      style={{
        backgroundImage: `url(${feeBackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: 'calc(100vh - 120px)', // Adjust height as needed, consider header/footer
        borderRadius: '15px', // Match card border-radius for aesthetic
        overflow: 'hidden', // Ensures overlay respects border-radius
      }}
    >
      {/* Overlay for readability */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker overlay for better contrast
          zIndex: 1,
        }}
      />

      {/* Actual content card */}
      <div className="bg-white p-4 p-md-5 rounded shadow animate__animated animate__fadeIn"
        style={{
          zIndex: 2, // Ensure content is above the overlay
          maxWidth: '500px', // Constrain width for better appearance
          width: '100%',
        }}
      >
        <h2 className="text-primary fw-bold fs-4 mb-4 border-bottom pb-2">💳 Fee Status</h2>
        <ul className="list-unstyled fs-6 mb-4">
          <li className="mb-2"><strong>Total Fees:</strong> <span className="text-dark">{formatter.format(fees.total)}</span></li>
          <li className="mb-2"><strong>Paid:</strong> <span className="text-success">{formatter.format(fees.paid)}</span></li>
          <li className="mb-2"><strong>Due:</strong> <span className="text-danger">{formatter.format(fees.due)}</span></li>
        </ul>

        {fees.due > 0 && (
          <button
            className="btn btn-success fw-semibold px-4 py-2 w-100" // Made button full width
            onClick={handleStripe}
          >
            💵 Pay Now
          </button>
        )}

        {fees.due <= 0 && (
          <div className="alert alert-success mt-3 text-center">
            ✅ All fees are paid. Thank you!
          </div>
        )}
      </div>
    </div>
  );
};

export default FeeStatus;