import React from "react";
import Course from "./Course";
import { useLoadUserQuery } from "@/features/api/authApi";
import { Link } from "react-router-dom";

const MyLearning = () => {

  const {data,isLoading} = useLoadUserQuery();
  console.log("MyLearning data: ", data);
  const MyLearning = data?.user?.enrolledCourses || []
  console.log("MyLearning: ", MyLearning);
  // const myLearningCourses = [1, 2, 3, 4, 5];
  return (
    <div className="max-w-5xl mx-auto my-24 px-4 md:px-0 h-screen">
      <h1 className="font-bold text-2xl">My Learnings</h1>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton number={MyLearning.length || 6} />
        ) : MyLearning.length === 0 ? (
          <p className="text-gray-400">You are not Enrolled to any courses</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {MyLearning.map((course,index) => (
              <Link to={`/course-progress/${course._id}`} key={index}>
              <Course key={index} course={course}/>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

const MyLearningSkeleton = ({ number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: number }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
        ></div>
      ))}
    </div>
  );
};
