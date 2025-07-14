import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import React from "react";
const CourseCard = ({ course }) => {
  return (
    <Card className="overflow-hidden rounded-lg border-2 justify-normal p-0 m-0 bg-white  dark:bg-gray-800 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500">
      <div className="relative">
        <img
          className="h-36 w-full object-cover rounded-t-lg"
          src={course.courseThumbnail}
          alt=""
        />
      </div>
      <CardContent className="px-4 pb-2 pt-0">
        <h1 className="hover:underline font-semibold text-lg truncate">
          {course.courseTitle}
        </h1>
        <div className="flex items-center justify-between my-2">
            <div className="text-lg font-bold">
            <span> ₹{course.coursePrice}</span>
          </div>
          <div className="">
            <Badge
              className={`${
                course.courseLevel === "Begineer"
                  ? "bg-blue-500"
                  : course.courseLevel === "Medium"
                  ? "bg-green-500"
                  : "bg-red-500"
              } text-white px-2 py-1 text-xs rounded-full`}
            >
              {course.courseLevel}
            </Badge>
          </div>
          
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
