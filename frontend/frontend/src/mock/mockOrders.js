const mockOrders = [
  {
    orderId: "ORD001",
    emailOrPhone: "john@example.com",
    productName: "iPhone 13",
    status: "Delivered",
    price: 79999,
    orderDate: "2025-06-01",
    expectedDelivery: "2025-06-06",
  },
  {
    orderId: "ORD002",
    emailOrPhone: "john@example.com",
    productName: "AirPods Pro",
    status: "In Transit",
    price: 24999,
    orderDate: "2025-07-01",
    expectedDelivery: "2025-07-08",
  },
];

export default mockOrders;
