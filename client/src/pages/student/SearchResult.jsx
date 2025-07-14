import { Badge } from '@/components/ui/badge'
import React from 'react'
import { Link } from 'react-router-dom'

const SearchResult = ({course}) => {
    
  return (
    <div className='mt-3 border-0 p-4 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 gap-4 py-2 shadow-sm'>
        <Link to={`/course-details/${course._id}`} className='flex flex-col md:flex-row gap-4 w-full md:w-auto'>
       <div className='border-gray-100 rounded w-full h-32 lg:w-48'>

        <img src={course.courseThumbnail} className='h-full w-full rounded'/>
       </div>
        <div className='flex-1 flex-col gap-2'>
            <h1 className='font-bold text-md md:text-lg'>{course.courseTitle}</h1>
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