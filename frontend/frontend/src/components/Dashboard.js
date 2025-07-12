import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = ({ customerId }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products?limit=6");
        setOrders(res.data.products);
      } catch (err) {
        setError("Failed to fetch orders.");
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Welcome, User #{customerId}</h2>
      <h4 className="mt-4">Your Orders</h4>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {orders.map((item) => (
          <div className="col-md-4 mb-4" key={item.id}>
            <div className="card h-100">
              <img
                src={item.thumbnail}
                className="card-img-top"
                alt={item.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p>₹{item.price}</p>
                <p>Status: {item.stock > 50 ? "In Transit" : "Delivered"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
