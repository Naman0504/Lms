import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { Link } from "react-router-dom";

const Course = ({course}) => {
  return (
    <Link to={`course-details/${course._id}`}>
    <Card className="overflow-hidden rounded-lg p-0 m-0  border-2 border-red-800 bg-white  dark:bg-gray-800 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500">
      <div className="relative border-2 border-green-700">
        <img
          className="h-36 w-full object-cover rounded-t-lg border-2 border-amber-300"
          src={course.courseThumbnail}
          alt=""
        />
      </div>
      <CardContent className="px-4 py-4 border-2 border-blue-600">
        <h1 className="hover:underline font-semibold text-lg truncate">
          {course.courseTitle}
        </h1>
        <div className="flex items-center justify-between my-2">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage
                className="w-8 h-8 rounded-full"
                src={course.creator?.photoUrl || "https://github.com/shadcn.png"}
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">{course.creator?.name}</h1>
          </div>
          <Badge className="bg-blue-500 text-white px-2 py-1 text-xs rounded-full">{course.courseLevel}</Badge>
          
        </div>
        <div className="text-lg font-bold">
            <span > ₹{course.coursePrice}</span>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
};

export default Course;
