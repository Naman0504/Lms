import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLoadUserQuery } from "@/features/api/authApi";
import { useGetPurchasedCoursesQuery } from "@/features/api/paymentApi";
import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Dashboard = () => {
  const { data, isSuccess, isLoading, isError } = useGetPurchasedCoursesQuery();
  const { data: userData } = useLoadUserQuery();

  console.log("User data: ", userData);
  console.log("dashboard data: ", data);

  const userid = userData?.user?._id; // Adjust based on your actual user schema

  // Filter courses for this user
  const purchasedCourses =
    data?.purchasedCourse.filter((course) => course?.courseId?.creator === userid) || [];

  console.log("Filtered Purchased Courses: ", purchasedCourses);

  if (isLoading) return <h1>Loading...</h1>;
  if (isLoading)
    return <h1 className="text-red-500">Failed to get Purchased Course.</h1>;

  // const  purchasedCourses  = data || [];

  const courseData = purchasedCourses.map((course) => ({
    name: course.courseId.courseTitle,
    price: course.courseId.coursePrice,
  }));

  const totalRevenue = purchasedCourses.reduce((acc, ele) => {
    acc + ele.amount || 0;
    return acc + ele.amount;
  }, 0);

  const sales = purchasedCourses.length;

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-700">{sales}</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-700">{totalRevenue}</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Course Prices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                angle={-30} // Rotated labels for better visibility
                textAnchor="end"
                interval={0} // Display all labels
              />
              <YAxis stroke="#6b7280" />
              <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#4a90e2" // Changed color to a different shade of blue
                strokeWidth={3}
                dot={{ stroke: "#4a90e2", strokeWidth: 2 }} // Same color for the dot
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
