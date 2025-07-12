// controllers/customerController.js

// --------------------
// Mock Data
// --------------------
const mockCustomers = [
  {
    id: 'cust1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    password: 'password123',
    orders: ['order1', 'order2'],
  },
  {
    id: 'cust2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '0987654321',
    password: 'securepass',
    orders: ['order3'],
  },
];

const mockOrders = {
  order1: {
    orderId: 'order1',
    product: 'Wireless Mouse',
    status: 'Delivered',
    price: 25.99,
    orderDate: '2024-12-01',
    expectedDelivery: null,
  },
  order2: {
    orderId: 'order2',
    product: 'Keyboard',
    status: 'Shipped',
    price: 45.0,
    orderDate: '2025-07-01',
    expectedDelivery: '2025-07-15',
  },
  order3: {
    orderId: 'order3',
    product: 'Headphones',
    status: 'Processing',
    price: 60.5,
    orderDate: '2025-07-10',
    expectedDelivery: '2025-07-17',
  },
};

// --------------------
// Controllers
// --------------------

// POST /api/login
const login = (req, res) => {
  const { emailOrPhone, password, orderId } = req.body;

  const customer = mockCustomers.find(
    (cust) =>
      cust.email === emailOrPhone ||
      cust.phone === emailOrPhone
  );

  if (!customer) {
    return res.status(404).json({ message: 'Customer not found' });
  }

  // Option A: Login using password
  if (password && customer.password === password) {
    return res.status(200).json({ message: 'Login successful', customerId: customer.id });
  }

  // Option B: Login using order ID
  if (orderId && customer.orders.includes(orderId)) {
    return res.status(200).json({ message: 'Login successful via Order ID', customerId: customer.id });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
};

// GET /api/orders/:customerId
const getOrders = (req, res) => {
  const { customerId } = req.params;

  const customer = mockCustomers.find((cust) => cust.id === customerId);
  if (!customer) {
    return res.status(404).json({ message: 'Customer not found' });
  }

  const orders = customer.orders.map((orderId) => mockOrders[orderId]);
  res.status(200).json(orders);
};

// POST /api/orders/:orderId/escalate
const escalateIssue = (req, res) => {
  const { orderId } = req.params;
  res.status(200).json({ message: `Issue escalated for Order ID: ${orderId}` });
};

// POST /api/orders/:orderId/cancel
const requestCancellation = (req, res) => {
  const { orderId } = req.params;
  res.status(200).json({ message: `Cancellation request submitted for Order ID: ${orderId}` });
};

// POST /api/orders/:orderId/return
const requestReturn = (req, res) => {
  const { orderId } = req.params;
  // Simulate reverse pickup
  res.status(200).json({ message: `Return initiated for Order ID: ${orderId}. Reverse pickup scheduled.` });
};

// --------------------
// Export Controllers
// --------------------
module.exports = {
  login,
  getOrders,
  escalateIssue,
  requestCancellation,
  requestReturn,
};
