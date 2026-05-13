import express from "express";

import {
  createStripeCheckout,
} from "../controllers/paymentController.js";

import {
  stripeWebhook,
} from "../controllers/paymentWebhookController.js";

const router = express.Router();

router.post(
  "/create-checkout",
  createStripeCheckout
);

router.post(
  "/webhook",
  express.raw({
    type: "application/json",
  }),
  stripeWebhook
);

export default router;