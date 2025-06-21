import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import {
  deleteMediaFromCloudinary,
  deleteVideoFromCloudinary,
  uploadMedia,
} from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        message: "Course title and category are required",
      });
    }

    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });

    return res
      .status(200)
      .json({ course, message: "Course Created Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed To Create Course", error });
  }
};

export const getcreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({ courses: [], message: "Course not found" });
    }

    return res.status(200).json({ courses });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed To Get Course", error });
  }
};

export const editCourses = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const thumbnail = req.file;

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course Not Found" });
    }

    //delete Old thumbnail
    let courseThumbnail;
    if (courseThumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }

      //upload thumbnail on cloudinary
      courseThumbnail = await uploadMedia(thumbnail.path);
    }

    const updatedData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: courseThumbnail?.secure_url,
    };

    course = await Course.findByIdAndUpdate(courseId, updatedData);
    return res
      .status(200)
      .json({ course, message: "Course Updated Successfully." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed To Get Course", error });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course Not Found" });
    }

    return res.status(200).json({ course });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed To Get Course by Id", error });
  }
};

//Lecture Controller
export const createLeacture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res
        .status(400)
        .json({ message: "Lecture title and course id i required" });
    }

    //create Lecture
    const lecture = await Lecture.create({ lectureTitle });
    const course = await Course.findById(courseId);
    if (course) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res
      .status(200)
      .json({ lecture, message: "Lecture Created Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to create Lecture", error });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({ message: "Lectures Not Found" });
    }
    res.status(200).json({ lectures: course.lectures });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to get Lecture", error });
  }
};

export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, isPreviewFree, videoInfo } = req.body;
    const { courseId, lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "LEcture Not Found" });
    }
    //update Lecture
    if (lectureTitle) lecture.lectureTitle = lectureTitle;

    if (videoInfo.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
    if (videoInfo.publicId) lecture.publicId = videoInfo.publicId;
    if (isPreviewFree) lecture.isPreviewFree = isPreviewFree;
    await lecture.save();

    //Endure the course still has the lecture id if It was not alreadey added
    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture, _id);
    }

    await course.save();

    return res
      .status(200)
      .json({ lecture, message: "Lecture Updated Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to Update Lecture", error });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "lecture Not Found" });
    }

    //delete the lecture From Cloudinary
    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }

    //remove the lecture Reference from Particular Course
    await Course.updateOne(
      { lectures: lectureId }, //find the course that contain the lecture
      { $pull: { lectures: lectureId } } //Remove thye lecture id from the lectures array
    );

    return res.status(200).json({ message: "Lecture Removed Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to Delete Lecture", error });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "lecture Not Found" });
    }

    return res.status(200).json({lecture})
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to Get Lecture By Id", error });
  }
};
