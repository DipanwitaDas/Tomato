import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Order.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/order/all");
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        alert("Failed to fetch orders: " + response.data.message);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      alert("Error fetching orders. Check console.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order-table-container">
      <h2 className="order-title">All Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User ID</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.userId}</td>
                  <td>
                    {order.items.map((item, idx) => (
                      <div key={idx}>
                        <strong>Food ID:</strong> {item.foodId}<br />
                        <strong>Qty:</strong> {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td>{order.amount} /-</td>
                  <td>{order.payment ? "Paid" : "Pending"}</td>
                  <td>{order.status}</td>
                  <td>{new Date(order.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
