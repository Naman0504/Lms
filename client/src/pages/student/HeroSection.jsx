import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const HeroSection = () => {
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
          action="
        "
          className="flex items-center bg-white dark:bg-gra-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
        >
          <Input
            type="text"
            placeholder="Search Courses"
            className="border-0 flex-grow focus-visible:ring-0 px-6 py-3 placeholder-gray-400  dark:placeholder-gray-500"
          />
          <Button className="bg-blue-400 rounded-full p-5 hover:bg-blue-600 duration-300 dark:bg-blue-600">
            Search
          </Button>

        </form>
          <Button className="bg-teal-400 rounded-full hover:bg-teal-500 duration-300 dark:bg-gray-800">Explore Courses</Button>
      </div>
    </div>
  );
};

export default HeroSection;
