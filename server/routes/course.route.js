import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, createLeacture, editCourses, editLecture, getCourseById, getCourseLecture, getcreatorCourses, getLectureById, getPublishedCourse, removeLecture, searchCourse, togglePublishCourse } from "../controllers/course.controller.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/search").get(isAuthenticated, searchCourse);
router.route("/published-courses").get(isAuthenticated, getPublishedCourse);
router.route("/").get(isAuthenticated, getcreatorCourses);
router.route("/:courseId").put(isAuthenticated,upload.single("courseThumbnail"), editCourses);
router.route("/:courseId").get(isAuthenticated,getCourseById);
router.route("/:courseId/lecture").post(isAuthenticated,createLeacture);
router.route("/:courseId/lecture").get(isAuthenticated,getCourseLecture);

router.route("/:courseId/lecture/:lectureId").post(isAuthenticated,editLecture);
router.route("/lecture/:lectureId").delete(isAuthenticated,removeLecture);
router.route("/lecture/:lectureId").get(isAuthenticated,getLectureById);

router.route("/:courseId").patch(isAuthenticated,togglePublishCourse)

export default router;
