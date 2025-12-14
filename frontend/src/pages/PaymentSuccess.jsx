function PaymentSuccess({ total, onClose }) {
  return (
    <div className="cart-overlay">
      <div className="success-modal">
        <h2>✅ Payment Confirmed</h2>
        <p>Thank you for shopping with मिष्ठान</p>
        <h3>Amount Paid: ₹{total}</h3>

        <button className="checkout" onClick={onClose}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
