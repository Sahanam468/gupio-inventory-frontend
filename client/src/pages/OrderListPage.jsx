import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../features/orderSlice";

export default function OrderListPage() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.list);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="p-4 border rounded shadow bg-white mb-3">
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> ₹{order.totalAmount}</p>
          <strong>Items:</strong>
          <ul className="ml-4 list-disc">
            {order.items.map((item, i) => (
              <li key={i}>
                {item.productId?.name} × {item.qty}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
