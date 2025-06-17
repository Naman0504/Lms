import React from "react";
import Course from "./Course";

const MyLearning = () => {
  const isLoading = false;
  const myLearningCourses = [1, 2, 3, 4, 5];
  return (
    <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
      <h1 className="font-bold text-2xl">MY LEARNING</h1>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton number={myLearningCourses.length || 6} />
        ) : myLearningCourses.length === 0 ? (
          <p className="text-gray-400">You are not Enrolled to any courses</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {myLearningCourses.map((course,index) => (
              <Course key={index} />
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
