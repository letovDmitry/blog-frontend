import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IComment } from "./model/interfaces";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3000/comments`,
  }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    createComment: builder.mutation<
      IComment,
      Omit<IComment, "createdAt" | "updatedAt" | "id">
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

    updateComment: builder.mutation<
      IComment,
      { comment: Partial<IComment>; commentId: number }
    >({
      query(data) {
        return {
          url: "/" + data.commentId,
          method: "PATCH",
          body: data.comment,
        };
      },
      invalidatesTags: ["Posts"],
    }),

    deleteComment: builder.mutation<IComment, number>({
      query(data) {
        return {
          url: "/" + data,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
