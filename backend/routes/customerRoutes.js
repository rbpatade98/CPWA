const express = require("express");
const router = express.Router();
const {
  login,
  getOrders,
  escalateIssue,
  requestCancellation,
  requestReturn,
} = require("../controllers/customerController");

router.post("/login", login);
router.get("/orders/:customerId", getOrders);
router.post("/orders/:orderId/escalate", escalateIssue);
router.post("/orders/:orderId/cancel", requestCancellation);
router.post("/orders/:orderId/return", requestReturn);

module.exports = router;
