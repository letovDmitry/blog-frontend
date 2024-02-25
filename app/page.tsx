"use client";

import CreatePostForm from "./components/createPostForm";
import Posts from "./components/posts";

export default function Home() {
  return (
    <div className="flex flex-col justify-center">
      <CreatePostForm />
      <Posts />
    </div>
  );
}
