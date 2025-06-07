import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import cors from "cors"
dotenv.config();
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";


//call Database Connection
connectDB();
const app = express();

//default middleware
 app.use(express.json());
// app.use(cookieParser)
// app.use(cors({origin:"http://localhost:8080",credentials:true}))

//apis
app.use("/api/v1/user", userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Listen at Port ${PORT}`);
});
