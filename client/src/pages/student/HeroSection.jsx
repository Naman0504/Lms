import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };
  return (
    <div className="relative bg-gradient-to-r from-yellow-200 via-green-200 to-green-300 py-24 text-center px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-black font-bold mb-4 text-4xl">
          Find the Best Courses for You
        </h1>
        <p className="text-black dark:text-ray-400 mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
          illo!
        </p>

        <form
          onSubmit={searchHandler}
          className="flex items-center bg-white dark:bg-gra-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Courses"
            className="border-0 flex-grow focus-visible:ring-0 px-6 py-3 placeholder-gray-400  dark:placeholder-gray-500"
          />
          <Button
            type="submit"
            className="bg-blue-400 rounded-full p-5 hover:bg-blue-600 duration-300 dark:bg-blue-600"
          >
            Search
          </Button>
        </form>
        <Button className="bg-teal-400 rounded-full hover:bg-teal-500 duration-300 dark:bg-gray-800"
        onClick={()=> navigate(`/course/search?query`)}>
          Explore Courses
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
