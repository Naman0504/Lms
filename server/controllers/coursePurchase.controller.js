import Razorpay from "razorpay";
import crypto from "crypto";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

//create order
export const createOrder = async (req, res) => {
  const { amount, courseId, userId } = req.body;
  const options = {
    amount: amount * 100,
    currency: "INR",
  };
  const order = await razorpay.orders.create(options);
  const purchase = await CoursePurchase.create({
    courseId,
    userId,
    amount,
    paymentId: order.id,
    status: "pending",
  });
  res.json({ order, purchaseId: purchase._id });
};

//verify payment
export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(sign)
    .digest("hex");

  if (expected === razorpay_signature) {
    const purchase = await CoursePurchase.findOneAndUpdate(
      { paymentId: razorpay_order_id },
      { status: "completed", paymentId: razorpay_payment_id },
      { new: true }
    );

    //make all lectures visible by setting "isPreview" to true
    if (purchase.courseId && purchase.courseId.lectures.length > 0) {
      await Lecture.updateMany(
        {
          _id: { $in: purchase.courseId.lectures },
        },
        { $set: { isPreviewFree: true } }
      );
    }

    await purchase.save();

    //update user's enrolledCourses
    await User.findByIdAndUpdate(
      purchase.userId,
      { $addToSet: { enrolledCourses: purchase.courseId._id } },
      { new: true }
    );

    //update course to add user ID to enrolledTstudents
    await Course.findByIdAndUpdate(
      purchase.courseId._id,
      { $addToSet: { enrolledStudents: purchase.userId } },
      { new: true }
    );

    res.json({ success: true, purchase });
  } else {
    await CoursePurchase.findOneAndUpdate(
      { paymentId: razorpay_order_id },
      { status: "failed" }
    ).populate("courseId");
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
};

// export const webhookHandler = async (req, res) => {
//   const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
//   const digest = crypto
//     .createHmac("sha256", secret)
//     .update(JSON.stringify(req.body))
//     .digest("hex");
//   if (digest === req.headers["x-razorpay-signature"]) {
//     const ev = req.body.event;
//     if (ev === "payment.captured") {
//       const p = req.body.payload.payment.entity;
//       await CoursePurchase.findOneAndUpdate(
//         { paymentId: p.order_id },
//         { status: "completed", paymentId: p.id }
//       );
//     }

//     res.json({ received: true });
//   } else {
//     res.status(403).json({ error: "Invalid signature" });
//   }
// };

export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    const purchased = await CoursePurchase.findOne({userId, courseId});

    if (!course) {
      return res.status(404).json({ message: "Course Not Found" });
    }

    return res
      .status(200)
      .json({ course, purchased: purchased ? true : false });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed To Get Purchase Course Status", error });
  }
};

export const getAllPurchasedCourse = async (req, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      statys: "completed",
    }).populate("courseId");
    if (!purchaseCourse) {
      return res.status(404).json({ purchasedCourse: [] });
    }

    return res.status(200).json({ purchasedCourse });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed To Get PurchasedCourse",
        error,
      });
  }
};
