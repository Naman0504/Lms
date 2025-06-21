import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLeactureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const [lectureTitle, setLectureTitle] = useState();

  const [createLecture, { data, isLoading, error, isSuccess }] =
    useCreateLeactureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch
  } = useGetCourseLectureQuery(courseId);

  const CreateLectureHandler = async () => {
    createLecture({ lectureTitle, courseId });
  };

  console.log(lectureData);
  useEffect(() => {
    if (isSuccess) {
        refetch()
      toast.success(data?.message || "Lecture created");
    }

    if (error) {
      toast.error(error?.data?.message || "Failed to create lecture");
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-2xl">
          Add Lecture, add some basic details for your new Lecture
        </h1>
        <p className="text-sm ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non, itaque.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label className="mb-1">Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            placeholder="Your Lecture Title"
            onChange={(e) => setLectureTitle(e.target.value)}
          />
        </div>

        <div className="space-x-3">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to course
          </Button>
          <Button disabled={isLoading} onClick={CreateLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>
        <div className="mt-10">
          {lectureLoading ? (
            <p>Loading Lecture...</p>
          ) : lectureError ? (
            <p>Failed to load Lectures..</p>
          ) : lectureData.lectures.length === 0 ? (
            <p>No Lecture Available</p>
          ) : (
            lectureData.lectures.map((lecture, index) => (
              <Lecture key={lecture._id} lecture={lecture} index={index} courseId={courseId} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
