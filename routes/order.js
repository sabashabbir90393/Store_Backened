import express from "express";

import {
  createOrderController,
  getMyOrdersController,
} from "../controller/order.js";

import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createOrderController
);

router.get(
  "/my-orders",
  authMiddleware,
  getMyOrdersController
);

export default router;