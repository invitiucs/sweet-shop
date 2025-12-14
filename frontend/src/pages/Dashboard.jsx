import { useEffect, useState } from "react";
import api, { setAuthToken } from "../api";

function Dashboard({
  setToken,
  cart,
  setCart,
  setShowCart,
  setShowOrders
}) {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setAuthToken(localStorage.getItem("token"));
    loadSweets();
  }, []);

  const loadSweets = async () => {
    const res = await api.get("/api/sweets/");
    setSweets(res.data);
  };

  const logout = () => {
    localStorage.clear();
    setAuthToken(null);
    setToken(null);
  };

  const getImageByName = (name) => {
    const map = {
      "kaju katli": "/images/kaju-katli.jpg",
      "gulab jamun": "/images/gulab-jamun.jpg",
      "rasgulla": "/images/rasgulla.jpg",
      "ladoo": "/images/ladoo.jpg",
      "soan papdi": "/images/soan-papdi.jpg",
      "brownie": "/images/brownie.jpg",
      "cup cake": "/images/cupcake.jpg",
      "milk barfi": "/images/milk-barfi.jpg",
      "dry fruit halwa": "/images/dry-fruit-halwa.jpg",
      "chocolate truffle": "/images/chocolate-truffle.jpg",
    };
    return map[name?.toLowerCase()] || "/images/default.jpg";
  };
const placeOrder = async () => {
  try {
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    await api.post("/api/orders", null, {
      params: { total }
    });

    setCart([]);        // clear cart
    setShowCart(false); // close cart popup
    alert("🎉 Order placed successfully!");
  } catch (err) {
    alert("❌ Failed to place order");
  }
};

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        {/* LEFT */}
        <ul className="nav-links">
<li onClick={() => setShowOrders && setShowOrders(true)}>
  Orders
</li>
          <li>Sweets</li>
          <li>Gifting</li>
          <li>Festive Specials</li>
          <li>About</li>
          <li>Contact</li>
        </ul>

        {/* RIGHT */}
        <div className="nav-right">
          <input
            className="nav-search"
            placeholder="Search sweets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="nav-logout" onClick={logout}>
            Logout
          </button>

          {/* CART – EXTREME RIGHT */}
          <div
            className="logo cart-trigger"
            onClick={() => setShowCart(true)}
          >
            <span className="cart-icon">🛒</span>
            <span className="brand-name">मिष्ठान</span>
            <span className="cart-count">({cart.length})</span>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-indian">
        <h1>Celebrating India’s Sweet Traditions</h1>
        <p>
          From festive mithai to everyday delights, crafted with purity,
          tradition and love.
        </p>
      </section>

      {/* SEARCH BAR */}
      <div className="search-bar">
        <input
          placeholder="Search sweets by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* SWEETS GRID */}
      <section className="products">
        <div className="grid">
          {sweets
            .filter(
              (s) =>
                s.name.toLowerCase().includes(search.toLowerCase()) ||
                s.category.toLowerCase().includes(search.toLowerCase())
            )
            .map((s) => (
              <div className="card" key={s.id}>
                <img src={getImageByName(s.name)} alt={s.name} />

                <div className="card-body">
                  <h3>{s.name}</h3>
                  <p className="category">{s.category}</p>

                  <div className="price-row">
                    <span className="price">₹{s.price}</span>
                    <span className="stock">{s.quantity} left</span>
                  </div>

                  <div className="nutrition">
                    <p><b>Calories:</b> 180 kcal</p>
                    <p><b>Fat:</b> 8 g</p>
                    <p><b>Sugar:</b> 14 g</p>
                  </div>

                  <button
                    disabled={s.quantity === 0}
                    onClick={() => setCart([...cart, s])}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <h4>Quick Links</h4>
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
            <p>Shipping Policy</p>
            <p>Refunds</p>
          </div>

          <div>
            <h4>Information</h4>
            <p>About Us</p>
            <p>Bulk Orders</p>
            <p>Catering</p>
            <p>Careers</p>
          </div>

          <div>
            <h4>Contact</h4>
            <p>New Delhi, India</p>
            <p>📞 +91 96500 75931</p>
            <p>✉️ support@sweetshop.in</p>
          </div>
        </div>

        <p className="footer-bottom">© 2025 Sweet Shop</p>
      </footer>
    </>
  );
}

export default Dashboard;
