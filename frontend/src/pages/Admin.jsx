import { useEffect, useState } from "react";
import api, { setAuthToken } from "../api";

function Admin() {
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: ""
  });

  useEffect(() => {
    setAuthToken(localStorage.getItem("token"));
    loadSweets();
  }, []);

  const loadSweets = async () => {
    const res = await api.get("/api/sweets/");
    setSweets(res.data);
  };

  const addSweet = async (e) => {
    e.preventDefault();
    await api.post("/api/sweets/", {
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity)
    });
    setForm({ name: "", category: "", price: "", quantity: "" });
    loadSweets();
  };

  const deleteSweet = async (id) => {
    await api.delete(`/api/sweets/${id}`);
    loadSweets();
  };

  return (
    <div className="admin">
      <h2>Admin Panel</h2>

      <form className="admin-form" onSubmit={addSweet}>
        <input placeholder="Name" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Category" value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input placeholder="Price" type="number" value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input placeholder="Quantity" type="number" value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
        <button>Add Sweet</button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th><th>Category</th><th>Price</th><th>Qty</th><th></th>
          </tr>
        </thead>
        <tbody>
          {sweets.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.category}</td>
              <td>{s.price}</td>
              <td>{s.quantity}</td>
              <td>
                <button className="danger" onClick={() => deleteSweet(s.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
