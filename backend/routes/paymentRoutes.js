import express from "express";

import {
  createCheckout,
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

export default router;