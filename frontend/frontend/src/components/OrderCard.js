import React, { useState } from "react";
import axios from "axios";

const OrderCard = ({ order }) => {
  const [loading, setLoading] = useState(false);

  const handleAction = async (action) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:5000/api/orders/${order._id}/${action}`
      );
      alert(res.data.message);
    } catch (err) {
      alert("Action failed – please try again.");
    } finally {
      setLoading(false);
    }
  };

  const statusVariant =
    {
      Delivered: "success",
      "In Transit": "warning",
      Cancelled: "danger",
    }[order.status] || "secondary";

  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{order.productName}</h5>

        <ul className="list-unstyled mb-4">
          <li>
            Status:{" "}
            <span className={`badge bg-${statusVariant}`}>{order.status}</span>
          </li>
          <li>Price: ₹{order.price}</li>
          <li>Order Date: {new Date(order.orderDate).toLocaleDateString()}</li>
          <li>
            Expected Delivery:{" "}
            {order.expectedDelivery
              ? new Date(order.expectedDelivery).toLocaleDateString()
              : "N/A"}
          </li>
        </ul>

        <div className="mt-auto btn-group w-100">
          <button
            className="btn btn-outline-primary"
            onClick={() => handleAction("escalate")}
            disabled={loading}
          >
            Escalate
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => handleAction("cancel")}
            disabled={loading || order.status === "Delivered"}
          >
            Cancel
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => handleAction("return")}
            disabled={loading}
          >
            Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
