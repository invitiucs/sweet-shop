import { useEffect, useState } from "react";
import api from "../api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await api.get("/api/orders");
      setOrders(res.data);
    } catch (err) {
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="orders">
      <h2>🧾 My Orders</h2>

      {loading && <p>Loading orders...</p>}

      {!loading && orders.length === 0 && (
        <p>No orders placed yet.</p>
      )}

      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <p><b>Order ID:</b> #{order.id}</p>
          <p><b>Total:</b> ₹{order.total}</p>
          <p>
            <b>Date:</b>{" "}
            {new Date(order.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Orders;
