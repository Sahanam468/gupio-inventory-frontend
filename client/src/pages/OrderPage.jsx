import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";
import { placeOrder } from "../features/orderSlice";

export default function OrderPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list);

  const [items, setItems] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const addItem = () => {
    setItems([...items, { productId: "", qty: 1 }]);
  };

  const submitOrder = () => {
    dispatch(placeOrder({ items }));
    alert("Order placed!");
    setItems([]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Place Order</h1>

      {items.map((item, index) => (
        <div key={index} className="flex gap-3 mb-3">
          <select
            className="border p-2 rounded"
            onChange={(e) => {
              items[index].productId = e.target.value;
              setItems([...items]);
            }}
          >
            <option>Select product</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>

          <input
            type="number"
            className="border p-2 w-20 rounded"
            min="1"
            onChange={(e) => {
              items[index].qty = Number(e.target.value);
              setItems([...items]);
            }}
          />
        </div>
      ))}

      <button onClick={addItem} className="px-4 py-2 bg-blue-600 text-white rounded mr-3">
        Add Item
      </button>

      <button onClick={submitOrder} className="px-4 py-2 bg-green-600 text-white rounded">
        Submit Order
      </button>
    </div>
  );
}
