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
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CourseTab = () => {
    const isLoading=false;
    const navigate = useNavigate()
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const isPublished = true;
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>Make changes to your courses here.</CardDescription>
        </div>
        <div className="space-x-2">
          <Button variant="outline">
            {isPublished ? "unpublished" : "Published"}
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
              <Select>
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
              <Select className="w-fit">
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
            <Input type="file" accept="image/*" className="w-fit" />
          </div>

          <div className="space-x-4">
            <Button variant="outline" onClick={()=>navigate("/admin/course")}>Cancel</Button>
            <Button disabled={isLoading}>
                {
                    isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin"/>Please wait</> : "Save"
                }
                </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
