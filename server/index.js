import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js"
import mediaRoute from "./routes/media.route.js"
import purchaseRoute from "./routes/coursePurchase.route.js"
import CourseProgressRoute from "./routes/courseProgress.route.js";

// Load environment variables
dotenv.config();

// Call database connection
connectDB();

const app = express();


app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", CourseProgressRoute);


app.get("/api/getkey",(req,res)=>{
  res.status(200).json({key:process.env.RAZORPAY_KEY})
})

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
