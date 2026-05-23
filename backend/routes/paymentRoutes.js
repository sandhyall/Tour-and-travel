import express from "express";
import {
  createCheckout,
  createKhaltiPayment,
} from "../controllers/paymentController.js";

import {
  confirmCardPayment,
  verifyKhaltiPayment, // Added our new verification function
} from "../controllers/paymentWebhookController.js";

const router = express.Router();

// --- CARD ROUTES ---
router.post("/card/checkout", createCheckout);
router.post("/card/confirm", confirmCardPayment);

// --- KHALTI ROUTES ---
router.post("/khalti/initiate", createKhaltiPayment);
router.post("/khalti/verify", verifyKhaltiPayment); // Added verification endpoint

export default router;