import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "@/features/api/courseApi";
import { toast } from "sonner";

const CourseTab = () => {
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;
  const [previewThumbnail, setPreviewThumbnail] = useState();
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const [EditCourse, { data, isSuccess, isLoading, error }] =
    useEditCourseMutation();
  const { data: courseByIdData, isLoading: courseByIdLoading,refetch } =
    useGetCourseByIdQuery(courseId);

    const [publishCourse]=usePublishCourseMutation()

  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData?.course;
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: "",
      });
    }
  }, [courseByIdData]); // ✅ This runs only when the fetched course changes

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };
  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  //get file
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);

      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);

    await EditCourse({ formData, courseId });
    // console.log(input);
  };

  const publishStatusHandler = async(action) => {
    try {
      console.log("ISorNOT:",action)
      const response = await publishCourse({courseId,query:action});
      if(response.data){
        refetch()
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error("failed to publsih or unpublish course")
      
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course Updated");
    }

    if (error) {
      toast.error(error.data.message || "Failed to update course");
    }
  }, [isSuccess, error]);

  if (courseByIdLoading)
    return <Loader2 className="m-auto w-4 h-4 animate-spin" />;

  
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>Make changes to your courses here.</CardDescription>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            disabled={courseByIdData?.course.lectures.length ===0}
            onClick={() =>
              publishStatusHandler(
                courseByIdData?.course.isPublished ? "false" : "true"
              )
            }
          >
            {courseByIdData?.course.isPublished ? "unpublished" : "Publish"}
          </Button>
          <Button>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div className="flex flex-col gap-2">
            <Label>Title</Label>
            <Input
              type="text"
              value={input.courseTitle}
              onChange={changeEventHandler}
              name="courseTitle"
              placeholder="Ex. Fullstack Developer"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Sub Title</Label>
            <Input
              type="text"
              value={input.subTitle}
              onChange={changeEventHandler}
              name="subTitle"
              placeholder="Ex. Become a Fullstack Developer"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>

          <div className="flex items-center gap-5">
            <div className="flex flex-col gap-2">
              <Label>Category</Label>
              <Select onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Next JS">Next JS</SelectItem>
                    <SelectItem value="Data Science ">Data Science </SelectItem>
                    <SelectItem value="Frontend Development">
                      Frontend Development
                    </SelectItem>
                    <SelectItem value="Javascript">Javascript</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Course Level</Label>
              <Select className="w-fit" onValueChange={selectCourseLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Course Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Begineer">Begineer</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>price in (INR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="199"
                className="w-fit"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="w-fit"
            />
            {previewThumbnail && (
              <img src={previewThumbnail} className="w-48 h-48 my-2" />
            )}
          </div>

          <div className="space-x-4">
            <Button variant="outline" onClick={() => navigate("/admin/course")}>
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={updateCourseHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
