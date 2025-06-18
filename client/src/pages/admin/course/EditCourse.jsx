import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import CourseTab from './CourseTab'

const EditCourse = () => {
  return (
    <div className="flex-1">
        <div className='flex items-center justify-between mb-5'>
            <h1 className='fnt-bold text-xl'>Add details information regarding course</h1>
            <Link to="lecture">
            <Button variant="ghost">Go to Lectures</Button>
            </Link>
        </div>
        <CourseTab/>

    </div>
  )
}

export default EditCourse