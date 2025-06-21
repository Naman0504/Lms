import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Lecture = ({ lecture, index, courseId }) => {
  const navigate = useNavigate();
  const goToUpdateLecture = () => {
    navigate(`${lecture._id}`);
  };
  return (
    <div className="flex items-center justify-between bg-[#F7F9FA] dark:bg-[#1F1F1F] px-4 py-2 rounded-md my-2">
      <h1 className="font-semibold text-gray-700 dark:text-gray-400">
       Lecture - {index+1} : {lecture.lectureTitle}
      </h1>
      <Edit
        className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:to-blue-400"
        size={20}
        onClick={goToUpdateLecture}
      />
    </div>
  );
};

export default Lecture;
