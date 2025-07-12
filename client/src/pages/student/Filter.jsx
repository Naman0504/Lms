import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Funnel } from "lucide-react";
import React, { useEffect, useState } from "react";

const Filter = ({ handleFilterChange }) => {
  // const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");
  const categories = [
    { id: "nextjs", label: "Next JS" },
    { id: "data science", label: "Data Science" },
    { id: "frontend development", label: "Frontend Development" },
    { id: "fullstack development", label: "Fullstack Development" },
    { id: "mern stack development", label: "MERN Stack Development" },
    { id: "backend development", label: "Backend Development" },
    { id: "javascript", label: "Javascript" },
    { id: "python", label: "Python" },
    { id: "docker", label: "Docker" },
    { id: "mongodb", label: "MongoDB" },
    { id: "html", label: "HTML" },
  ];

 useEffect(() => {
    // Trigger filter update on load
    if (sortByPrice) {
      handleFilterChange(sortByPrice);
    }
  }, []);




  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedValue);
  };

  return (
    <div className="w-full md:w-[15%]">
      <h1 className="font-semibold flex items-center text-lg gap-0.5 md:text-xl">
        Filters <Funnel size={16} />
      </h1>
      <div className="flex flex-row md:flex-col gap-2 w-full mt-4">
        <Select onValueChange={selectByPriceHandler} className="w-full">
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort By Price</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>


    
      </div>



    </div>
  );
};

export default Filter;
