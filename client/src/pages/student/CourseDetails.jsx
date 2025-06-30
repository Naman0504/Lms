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
import { useParams } from "react-router-dom";

const CourseDetails = () => {
    const param = useParams();
    const courseId = param.courseId
  const purchasedCourse = 0;
  return (
    <div className="mt-16 space-y-5">
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">Course Title</h1>
          <p className="text-base md:text-lg">Course Sub-title</p>
          <p>
            Created By{""}{" "}
            <span className="text-[#C0C4FC] underline italic">Naman</span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last update 24-6-2025</p>
          </div>
          <p>Student enrolled : 10</p>
        </div>
      </div>
      <div className="max-w-7xl flex mx-auto my-5 px-4 md:px-8 flex-col lg:flex-row  justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="text-xl font-bold md:text-2xl">Description</h1>
          <p className="text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            impedit laborum id soluta necessitatibus porro voluptatem provident
            eius? Dolor repellat aspernatur ex labore, nihil eaque qui quae
            beatae ullam autem!
          </p>
          <Card className="rounded-md">
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>4 lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3].map((lecture, index) => (
                <div key={index} className="flex gap-3 items-center text-sm">
                  <span>
                    {true ? <PlayCircle size={15} /> : <Lock size={15} />}
                  </span>
                  <p>Lecture Title</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="w-full lg:w-1/3">
          <Card className="gap-2">
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
                React player Video ayga
              </div>
              <h1>Lecture Title</h1>
              <Separator className="my-2" />
              <h1 className="text-lg font-semi-bold md:text-xl">
                Course Price
              </h1>
            </CardContent>
            <CardFooter className="flex justify-center px-4 py-2">
              {purchasedCourse ? (
                <Button className="w-full">Continue Course</Button>
              ) : (
                <BuyCourseButton/>

              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
