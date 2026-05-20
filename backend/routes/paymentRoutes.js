import express from "express";

import {
  createCheckout,
  createKhaltiPayment,
} from "../controllers/paymentController.js";

import {
  confirmCardPayment,
} from "../controllers/paymentWebhookController.js";

const router = express.Router();

router.post(
  "/create-checkout",
  createCheckout
);

router.post(
  "/confirm-payment",
  confirmCardPayment
);

router.post(
  "/create-khalti",
  createKhaltiPayment
);

export default router;