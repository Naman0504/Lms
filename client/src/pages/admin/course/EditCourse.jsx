import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import CourseTab from './CourseTab'

const EditCourse = () => {
  return (
    <div className="flex-1">
        <div className='flex flex-col md:flex-row items-left md:items-center justify-between mb-5'>
            <h1 className='fnt-bold text-xl'>Add detailed information regarding course</h1>
            <Link to="lecture">
            <Button variant="ghost" className="font-semibold mt-1.5 md:mt-0 bg-black lg:bg-transparent text-white md:text-black">Go to Lectures</Button>
            </Link>
        </div>
        <CourseTab/>

    </div>
  )
}

export default EditCourse