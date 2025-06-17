import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";

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

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
