import { Badge } from '@/components/ui/badge'
import React from 'react'
import { Link } from 'react-router-dom'

const SearchResult = ({course}) => {
    
  return (
    <div className='flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 gap-4 py-4'>
        <Link to={`/course-details/${course._id}`} className='flex flex-col md:flex-row gap-4 w-full md:w-auto'>
       <div className='border p-2 border-gray-100 rounded'>

        <img src={course.courseThumbnail} className='h-32 w-full md:w-56 object-cover rounded'/>
       </div>
        <div className='flex flex-col gap-2'>
            <h1 className='font-bold text-lg md:text-xl'>{course.courseTitle}</h1>
            <p className='text-sm text-gray-500'>{course.subTitle}</p>
            <p className='text-sm text-gray-700'>Instructor : <span className='font-bold'> {course.creator?.name} </span></p>
            <Badge className="w-fit mt-2 md:mt-0">{course.courseLevel}</Badge>

        </div>
        </Link>
        <div className='w-full md:w-auto mt-4 md:mt-0 md:text-right'>
            <h1 className='font-bold text-xl md:text-2xl'>₹{course.coursePrice}</h1>
        </div>
    </div>
  )
}

export default SearchResult