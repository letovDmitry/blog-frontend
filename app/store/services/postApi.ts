import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPost } from "./model/interfaces";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3000/posts`,
  }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPosts: builder.query<{ count: number; rows: IPost[] }, number>({
      query(data) {
        return {
          url: "?page=" + data,
        };
      },
      providesTags: ["Posts"],
    }),

    createPost: builder.mutation<
      IPost,
      Omit<IPost, "createdAt" | "updatedAt" | "id">
    >({
      query(data) {
        return {
          url: "/",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const { useGetPostsQuery, useCreatePostMutation } = postsApi;
