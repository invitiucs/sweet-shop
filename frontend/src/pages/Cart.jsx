import "./cart.css";

function Cart({
  cart,
  setCart,
  setShowCart,
  placeOrder
}) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const removeItem = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  return (
    <div className="cart-overlay">
      <div className="cart-modal">

        {/* HEADER */}
        <div className="cart-header">
          <h2>🛒 Your Cart</h2>
          <button className="close-btn" onClick={() => setShowCart(false)}>
            ✕
          </button>
        </div>

        {/* ITEMS */}
        {cart.length === 0 && (
          <p className="empty-cart">Your cart is empty</p>
        )}

        {cart.map((item, index) => (
          <div className="cart-item" key={index}>
            <img
              src={`/images/${item.name.toLowerCase().replace(" ", "-")}.jpg`}
              alt={item.name}
            />

            <div className="cart-info">
              <p className="cart-name">{item.name}</p>
              <p className="cart-price">₹{item.price}</p>
            </div>

            <button
              className="remove-btn"
              onClick={() => removeItem(index)}
            >
              Remove
            </button>
          </div>
        ))}

        {/* TOTAL */}
        {cart.length > 0 && (
          <>
            <div className="cart-total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={placeOrder}
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
