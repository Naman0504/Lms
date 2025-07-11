import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateTokens.js";
import { response } from "express";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

//Resistering or signup the User
export const register = async (req, res) => {
  try {
    const { name, email, password ,role = "student"} = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required", error });
    }

    
    const allowedRoles = ["student", "instructor"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Role must be one of: ${allowedRoles.join(", ")}`,
      });
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
      role, 
    });

    return res.status(200).json({
      response: response,
      success: true,
      message: "Account Created Successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed To register", error });
  }
};

//Login the User
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

//logout
export const logout = async (_, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "Logged out Successfully", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed To logout" });
  }
};

//Getting the User Profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId).select("-password").populate("enrolledCourses");
    if (!user) {
      return res
        .status(404)
        .json({ message: "Profile not found", success: false });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error, success: false, message: "Failed To Load User" });
  }
};

//Updating the USer Profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId);
    if (!user)
    {

      return res
      .status(404)
      .json({ message: "User not found", success: false });
    }

    //extract public id of the old image from the url if it exist
    if(user.photoUrl){
      const publicId = user.photoUrl.split("/").pop().split(".")[0] //extract public id
      deleteMediaFromCloudinary(publicId)
    }

    //upload new Photo
    const cloudResponse = await uploadMedia(profilePhoto.path);
   
    const photoUrl = cloudResponse.secure_url;

    const updatedData = {name,photoUrl};
    const updatedUser = await User.findByIdAndUpdate(userId,updatedData, {new:true}).select("-password")
    return res.status(200).json({
      success:true,
      user:updatedUser,
      message:"Profile Updated Successfully "
    })
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        error: error,
        success: false,
        message: "Failed To Update Profile",
      });
  }
};
