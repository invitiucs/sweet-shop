import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CartModal from "./pages/CartModal";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <>
      <Dashboard
        setToken={setToken}
        cart={cart}
        setCart={setCart}
        setShowCart={setShowCart}
      />

      {showCart && (
        <CartModal
          cart={cart}
          setCart={setCart}
          setShowCart={setShowCart}
          setShowPaymentSuccess={setShowPaymentSuccess}
          setPaidAmount={setPaidAmount}
        />
      )}

      {showPaymentSuccess && (
        <PaymentSuccess
          total={paidAmount}
          onClose={() => setShowPaymentSuccess(false)}
        />
      )}
    </>
  );
}

export default App;
