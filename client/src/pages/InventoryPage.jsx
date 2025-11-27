import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";

export default function InventoryPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>

      <div className="grid gap-4">
        {products.map((p) => (
          <div key={p._id} className="p-4 border rounded shadow bg-white">
            <h2 className="font-semibold text-lg">{p.name}</h2>
            <p>Category: {p.category}</p>
            <p>Price: ₹{p.price}</p>
            <p className={`${p.stock < 5 ? "text-red-600 font-bold" : "text-green-600"}`}>
              Stock: {p.stock}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
