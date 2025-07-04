import mongoose from "mongoose";

const LectureProgressSchema = new mongoose.Schema({
  lectureId: { type: String },
  viewed: { type: Boolean },
});

const CourseProgressSchema = new mongoose.Schema({
  userId: { type: String },
  courseId: { type: String },
  completed: { type: Boolean },
  lectureProgress: [LectureProgressSchema],
});

export const CourseProgress =mongoose.model("CourseProgress",CourseProgressSchema)