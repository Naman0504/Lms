import { useGetCourseDetailWithStatusQuery } from "@/features/api/paymentApi";
import { Navigate, useParams } from "react-router-dom"
import Preloader from "./Preloader";
const PurchasedCourseProtected =({children})=>{
    const {courseId} = useParams();
    const {data,isLoading} = useGetCourseDetailWithStatusQuery(courseId)

    if(isLoading) return (<Preloader/>)

    return data?.purchased ? children : <Navigate to={`/course-details/${courseId}`}/>
}



export default PurchasedCourseProtected;