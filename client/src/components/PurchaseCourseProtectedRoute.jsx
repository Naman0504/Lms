import { useGetCourseDetailWithStatusQuery } from "@/features/api/paymentApi";
import { Navigate, useParams } from "react-router-dom"
const PurchasedCourseProtected =({children})=>{
    const {courseId} = useParams();
    const {data,isLoading} = useGetCourseDetailWithStatusQuery(courseId)

    if(isLoading) return <p>Loading...</p>

    return data?.purchased ? children : <Navigate to={`/course-details/${courseId}`}/>
}



export default PurchasedCourseProtected;