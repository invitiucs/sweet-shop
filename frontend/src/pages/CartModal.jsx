function CartModal({
  cart,
  setCart,
  setShowCart,
  setShowPaymentSuccess,
  setPaidAmount
}) {
  const total = cart.reduce((sum, i) => sum + i.price, 0);

  const getImage = (name) =>
    `/images/${name.toLowerCase().replaceAll(" ", "-")}.jpg`;

  return (
    <div className="cart-overlay">
      <div className="cart-modal enhanced">
        {/* HEADER */}
        <div className="cart-header">
          <h2>🛒 Your Cart</h2>
          <button className="close-btn" onClick={() => setShowCart(false)}>
            ✖
          </button>
        </div>

        {/* ITEMS */}
        {cart.length === 0 && <p className="empty-cart">Your cart is empty</p>}

        {cart.map((item, i) => (
          <div key={i} className="cart-item-row">
            <img src={getImage(item.name)} alt={item.name} />

            <div className="cart-item-info">
              <h4>{item.name}</h4>
              <p className="price">₹{item.price}</p>
            </div>

            <button
              className="remove-btn"
              onClick={() =>
                setCart(cart.filter((_, index) => index !== i))
              }
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
              <strong>₹{total}</strong>
            </div>

            <button
              className="checkout"
              onClick={() => {
                setPaidAmount(total);
                setCart([]);
                setShowCart(false);
                setShowPaymentSuccess(true);
              }}
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CartModal;
