import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/purchase",
    credentials: "include",
  }),
  endpoints: (b) => ({
    createOrder: b.mutation({
      query: ({ amount, courseId, userId }) => ({
        url: "/create-order",
        method: "POST",
        body: { amount, courseId, userId },
      }),
    }),
    verifyPayment: b.mutation({
      query: (data) => ({
        url: "/verify-payment",
        method: "POST",
        body: data,
      }),
    }),
    getCourseDetailWithStatus: b.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),
    getPurchasedCourses: b.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useVerifyPaymentMutation,
  useGetCourseDetailWithStatusQuery,
  useGetPurchasedCoursesQuery,
} = paymentApi;
