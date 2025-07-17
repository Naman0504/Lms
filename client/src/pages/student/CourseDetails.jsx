import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetCourseByIdQuery } from "@/features/api/courseApi";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/paymentApi";
import ReactPlayer from "react-player";
import Preloader from "@/components/Preloader";

const CourseDetails = () => {
      const param = useParams();
  const courseId = param.courseId;
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth);
//   const { data: course, isLoading } = useGetCourseByIdQuery(courseId);



const {data,isLoading,isSuccess,isError} = useGetCourseDetailWithStatusQuery(courseId)
  if (isLoading) return (<Preloader/>);
  if (isError) return <h1>Failed to Load Course Details</h1>;
//   if (!course) return <p>Course not found</p>;
const {course,purchased} = data;

console.log("Course==",course)
console.log("purchased==",purchased)


const handleContinueCourse=()=>{
    if(purchased){
        navigate(`/course-progress/${courseId}`)
    }
}



  return (
    <div className="mt-0 space-y-5">
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">{course?.courseTitle}</h1>
          <p className="text-base md:text-sm">{course?.subTitle}</p>
          <p>
            Created By{""}{" "}
            <span className="text-[#C0C4FC] underline italic">{course?.creator.name}</span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last update {course?.createdAt.split("T")[0]}</p>
          </div>
          <p>Student enrolled : {course.enrolledStudents.length}</p>
        </div>
      </div>
      <div className="max-w-7xl flex mx-auto my-5 px-4 md:px-8 flex-col lg:flex-row  justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="text-xl font-bold md:text-2xl">Description</h1>
          <p className="text-sm" dangerouslySetInnerHTML={{__html:course.description}}/>
            
          <Card className="rounded-md">
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>{course.lectures.length} lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.lectures.map((lecture, index) => (
                <div key={index} className="flex gap-3 items-center text-sm">
                  <span>
                    {true ? <PlayCircle size={15} /> : <Lock size={15} />}
                  </span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="w-full lg:w-1/3 relative">
          <Card className="gap-2">
            <CardContent className=" flex flex-col mt-2">
              <div className="w-full aspect-video mb-4">
                
                <ReactPlayer width="100%" height="100%" url={course.lectures[0].videoUrl} controls={true} />
              </div>
              <h1 className="px-4 py-1 w-fit rounded-lg bg-gradient-to-l from-yellow-100 via-green-100 to-green-200 text-gray-900 text-center text-xs absolute -left-2 -top-1.5">{course.courseTitle}</h1>
              <Separator className="my-2" />
              <h1 className="text-lg font-bold md:text-xl">
                Course Price - {course.coursePrice} ₹
              </h1>
            </CardContent>
            <CardFooter className="flex justify-center px-4 py-2">
              
              {purchased ? (
                <Button className="w-full" onClick={handleContinueCourse}>Continue Course</Button>
              ) : (
                <BuyCourseButton
                  amount={course.coursePrice}
                  courseId={courseId}
                  userId={user._id}
                  user={user}
                  courseName={course.courseTitle}
                  courseThumbnail={course.courseThumbnail}
                //   currency={course.currency || "INR"}
                />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
