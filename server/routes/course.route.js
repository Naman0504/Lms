import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, getcreatorCourses } from "../controllers/course.controller.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/").get(isAuthenticated, getcreatorCourses);

export default router;
