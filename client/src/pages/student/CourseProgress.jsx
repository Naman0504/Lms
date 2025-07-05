import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import {
  CheckCircle,
  CheckCircle2,
  CheckSquare2,
  CirclePlay,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [
    completeCourse,
    { data: markCompleteData, isSuccess: completedSuccess },
  ] = useCompleteCourseMutation();
  const [
    inCompleteCourse,
    { data: markInCompleteData, isSuccess: inCompletedSuccess },
  ] = useInCompleteCourseMutation();
  const [currentLecture, setCurrentLecture] = useState(null);
  if (isLoading) return <p>Loadind...</p>;
  if (isError) return <p>Failed to Load Data...</p>;

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle } = courseDetails;

  //initilize the 1st lecture if not exist
  const initialLecture =
    currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  //select Video Handle for watching video
  const selectVideoHandler = (lecture) => {
    setCurrentLecture(lecture);
    refetch();
  };

  const updateLectureProgressHandler = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId }).unwrap();
    refetch();
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };
  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  useEffect(() => {
    console.log(markCompleteData)
    if (completedSuccess) {
      toast.success(markCompleteData.message);
    }

    if (inCompletedSuccess) {
      toast.success(markInCompleteData.message);
    }
  }, [completedSuccess, inCompletedSuccess]);

  return (
    <div className="mt-20 h-full max-w-7xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseTitle}</h1>
        <Button
          variant={completed ? "outline" : "default"}
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
        >
          {completed ? (
            <div className="flex items-center gap-2">
              {" "}
              <CheckCircle /> <span> Completed </span>
            </div>
          ) : (
            "Mark as Completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>
            <video
              src={currentLecture?.videoUrl || initialLecture.videoUrl}
              controls
              className="w-full h-auto md:rounded-lg"
              onPlay={() =>
                updateLectureProgressHandler(
                  currentLecture?._id || initialLecture._id
                )
              }
            ></video>
          </div>
          <div className="mt-2">
            <h3 className="font-medium text-lg">
              {`Lecture ${
                courseDetails.lectures.findIndex(
                  (lec) =>
                    lec._id === (currentLecture?._id || initialLecture._id)
                ) + 1
              } : ${
                currentLecture?.lectureTitle || initialLecture.lectureTitle
              }`}
            </h3>
          </div>
        </div>
        {/* sidebar */}
        <div className="w-full flex flex-col md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>
          <div className="flex-1 overflow-y-auto">
            {courseDetails?.lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={`mb-3 py-3 hover:cursor-pointer hover:bg-green-200 duration-300 transition transform ${
                  lecture._id === currentLecture?._id
                    ? "bg-gray-200"
                    : "dark:bg-gray-800"
                }`}
                onClick={() => selectVideoHandler(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 className="text-green-500 mr-2" size={24} />
                    ) : (
                      <CirclePlay className="text-gray-500 mr-2" size={24} />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>

                  {isLectureCompleted(lecture._id) && (
                    <Badge
                      className="bg-green-200 text-green-600"
                      variant="outline"
                    >
                      completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
