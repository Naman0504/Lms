import { Badge } from '@/components/ui/badge'
import React from 'react'
import { Link } from 'react-router-dom'

const SearchResult = ({course}) => {
    const courseId = "2233shjhxsb"
  return (
    <div className='flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 gap-4 py-4'>
        <Link to={`/course-details/${courseId}`} className='flex flex-col md:flex-row gap-4 w-full md:w-auto'>
       <div className='border p-2 border-gray-100 rounded'>

        <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/online-course-youtube-thumbnail-design-template-510d40e9c62f9dd5e580c746b3d07159_screen.jpg?ts=1747678223" className='h-32 w-full md:w-56 object-cover rounded'/>
       </div>
        <div className='flex flex-col gap-2'>
            <h1 className='font-bold text-lg md:text-xl'>Course Title</h1>
            <p className='text-sm text-gray-500'>Sub Title</p>
            <p className='text-sm text-gray-700'>Instructor : <span className='font-bold'> Naman Matiyara </span></p>
            <Badge className="w-fit mt-2 md:mt-0">Medium</Badge>

        </div>
        </Link>
    </div>
  )
}

export default SearchResult