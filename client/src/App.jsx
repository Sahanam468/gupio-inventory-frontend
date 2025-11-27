import { useState } from "react";

export default function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 60000, category: "Electronics", stock: 10 },
    { id: 2, name: "Headphones", price: 2000, category: "Accessories", stock: 4 },
    { id: 3, name: "Keyboard", price: 1500, category: "Accessories", stock: 15 },
  ]);

  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState("inventory");
  const [toast, setToast] = useState("");

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };

  const addItem = () => {
    setItems([...items, { productId: "", qty: 1 }]);
  };

  const submitOrder = () => {
    if (items.length === 0) return notify("⚠️ Add at least one product");

    let updated = [...products];
    let itemsList = [];

    for (let item of items) {
      if (!item.productId) return notify("⚠️ Select a product first");
      if (item.qty < 1) return notify("⚠️ Quantity must be at least 1");

      let product = updated.find((p) => p.id === Number(item.productId));
      if (!product) return notify("❌ Product not found");
      if (product.stock < item.qty) return notify("❌ Not enough stock");

      product.stock -= item.qty;

      itemsList.push({
        name: product.name,
        qty: item.qty,
      });
    }

    setProducts(updated);

    const total = itemsList.reduce(
      (sum, i) => sum + updated.find((p) => p.name === i.name).price * i.qty,
      0
    );

    const newOrder = {
      id: orders.length + 1,
      items: itemsList,
      totalAmount: total,
      status: "Completed",
    };

    setOrders([...orders, newOrder]);
    setItems([]);
    notify("🎉 Order Placed Successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-100 to-pink-200 p-6">

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 bg-white border-l-4 border-purple-600 shadow-lg px-4 py-3 rounded-xl text-gray-800 font-medium animate-pulse">
          {toast}
        </div>
      )}

      {/* Navigation */}
      <nav className="bg-purple-700 text-white p-4 rounded-2xl shadow-xl flex gap-8 justify-center text-lg font-semibold mb-8">
        <button className="hover:text-yellow-300" onClick={() => setPage("inventory")}>📦 Inventory</button>
        <button className="hover:text-yellow-300" onClick={() => setPage("order")}>🛒 Place Order</button>
        <button className="hover:text-yellow-300" onClick={() => setPage("orders")}>📄 Orders</button>
      </nav>

      {/* INVENTORY PAGE */}
      {page === "inventory" && (
        <>
          <h1 className="text-4xl font-bold text-purple-900 mb-6">📦 Inventory</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all"
              >
                <h2 className="text-2xl font-bold text-purple-700">{p.name}</h2>
                <p className="text-gray-600">Category: {p.category}</p>
                <p className="text-green-600 font-bold mt-2">₹{p.price}</p>

                <p className={`mt-2 text-lg font-bold ${
                  p.stock < 5 ? "text-red-600" : "text-green-700"
                }`}>
                  Stock: {p.stock}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ORDER PAGE */}
      {page === "order" && (
        <>
          <h1 className="text-4xl font-bold text-purple-900 mb-6">🛒 Place Order</h1>

          {items.map((item, index) => (
            <div key={index} className="flex gap-4 mb-4">
              <select
                className="p-3 rounded-xl border shadow bg-white"
                onChange={(e) => {
                  items[index].productId = e.target.value;
                  setItems([...items]);
                }}
              >
                <option value="">Select Product</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                className="p-3 w-24 rounded-xl border shadow bg-white"
                onChange={(e) => {
                  items[index].qty = Number(e.target.value);
                  setItems([...items]);
                }}
              />
            </div>
          ))}

          <button
            onClick={addItem}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 mr-4"
          >
            ➕ Add Item
          </button>

          <button
            onClick={submitOrder}
            className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700"
          >
            ✔️ Submit Order
          </button>
        </>
      )}

      {/* ORDERS PAGE */}
      {page === "orders" && (
        <>
          <h1 className="text-4xl font-bold text-purple-900 mb-6">📄 Order History</h1>

          {orders.length === 0 && (
            <p className="text-gray-700 text-lg">No orders yet.</p>
          )}

          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-4 hover:shadow-2xl"
            >
              <p className="text-xl font-semibold">🧾 Order #{order.id}</p>
              <p className="text-green-700 font-bold">Total: ₹{order.totalAmount}</p>
              <p>Status: {order.status}</p>

              <strong className="block mt-3 text-purple-700">Items:</strong>
              <ul className="ml-6 list-disc text-gray-700">
                {order.items.map((i, idx) => (
                  <li key={idx}>{i.name} × {i.qty}</li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
