import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateTokens.js";
import { response } from "express";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("USER DETAILS  ",name,email,password)
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required",error });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist with this Email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res
      .status(200)
      .json({response:response, success: true, message: "Account Created Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed To register", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Email or Password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Email or Password",
      });
    }

    generateToken(res, user, `Welcome Back ${user.name}`);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed To register" });
  }
};
