import express from "express";
import {
  createOrder,
  getAllPurchasedCourse,
  getCourseDetailWithPurchaseStatus,
  verifyPayment,
} from "../controllers/coursePurchase.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.post("/create-order", isAuthenticated, createOrder);
router.post("/verify-payment", verifyPayment);
// router.post("/webhook", webhookHandler); // Razorpay webhook URL

router.get(
  "/course/:courseId/detail-with-status",
  isAuthenticated,
  getCourseDetailWithPurchaseStatus
);
router.get("/", isAuthenticated, getAllPurchasedCourse);

export default router;
