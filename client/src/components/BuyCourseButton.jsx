import React from "react";
import { Button } from "./ui/button";

import {
  useCreateOrderMutation,
  useVerifyPaymentMutation,
} from "../features/api/paymentApi.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BuyCourseButton = ({ amount,courseThumbnail,courseName, courseId, userId, user }) => {
  const [createOrder] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const navigate = useNavigate();

  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => alert("Razorpay SDK load failed. Are you online?");
    document.body.appendChild(script);
  };

  const handlePurchase = async () => {
    loadRazorpay();

    try {
      const { order } = await createOrder({
        amount,
        courseId,
        userId,
      }).unwrap();

      const {
        data: { key },
      } = await axios.get("http://localhost:8080/api/getkey");

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: courseName,
        description: courseName, 
        image: courseThumbnail,
        order_id: order.id,
        handler: async function (response) {
          const result = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }).unwrap();

          if (result.success) {
            alert("✅ Payment successful and verified!");
            // ✅ Redirect user to course page or success page
            navigate(`/course-progress/${courseId}`);
          } else {
            navigate(`/course-details/${courseId}`);
          }
        },
        // callback_url: "http://localhost:8080/payment-success",
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#2ecc71",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong during payment.");
    }
  };
  return (
    <Button className="w-full" onClick={handlePurchase}>
      Purchase Course
    </Button>
  );
};

export default BuyCourseButton;
