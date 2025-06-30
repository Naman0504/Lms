import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_API = "http://localhost:8080/api/v1/media";

const LectureTab = () => {
  const params = useParams();
  const { courseId, lectureId } = params;
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);

  const [editLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();

  const [
    removeLecture,
    { data: removeData, isLaoding: removeLoading, isSuccess: removeSuccess },
  ] = useRemoveLectureMutation();

  const { data: lectureData } = useGetLectureByIdQuery(lectureId);

  const lecture = lectureData?.lecture;
  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle);
      setIsFree(lecture.isPreviewFree);
      setUploadVideoInfo(lecture.videoInfo);
    }
  }, []);

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        if (res.data.success) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url, //this data are coming from cloudinary and we are adding data in setmethod
            publicId: res.data.data.public_id, //this data are coming from cloudinary and we are adding data in setmethod
          });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Video uploade Failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const editLectureHandler = async () => {
    await editLecture({
      lectureTitle,
      videoInfo: uploadVideoInfo,
      courseId,
      lectureId,
      isPreviewFree: isFree,
    });
  };

  const removeLectureHandler = () => {
    removeLecture(lectureId);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
    }
    if (error) {
      toast.error(error.data?.message);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData.message);
    }
  }, [removeSuccess]);

  return (
    <Card className="">
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>Make your changes to the LEc</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="destructive"
            onClick={removeLectureHandler}
            diabled={removeLoading}
          >
            {removeLoading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please wait{" "}
              </>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            type="text"
            placeholder="Ex. Introduction to FrontEnd"
          />
        </div>
        <div className="space-y-2">
          <Label>
            Video<span className="text-red-500 pt-1">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            placeholder="Ex. Introduction to FrontEnd"
            className="w-fit"
            onChange={fileChangeHandler}
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch id="airplane-mode" checked={isFree} onCheckedChange={setIsFree} />
          <Label htmlFor="airplane-mode">Is this Video Free</Label>
        </div>
        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress} % uploaded</p>
          </div>
        )}
        <div className="mt-4">
          <Button 
            className=" text-black bg-gradient-to-r from-yellow-200 via-green-100 to-green-200"
            onClick={editLectureHandler}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please wait{" "}
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
