import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
export const PostDetails = () => {
  const [posts, setPosts] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await axios.get(`${apiUrl}/api/v1/posts/${params.id}`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error getting data:", error);
      }
    }

    fetchPost();
  }, [params.id]); // Depend on params.id to refetch if route changes

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 w-96 max-w-full text-center overflow-hidden">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Post Details
          </h1>
          <h2 className="text-lg font-semibold text-gray-700 break-words">
            <h1 className="text-xl font-bold">Title:</h1> {posts.title}
          </h2>
          <p className="text-gray-600 mt-2 break-words text-wrap">
            {" "}
            <h1 className="text-xl font-bold">Content:</h1> {posts.content}
          </p>
          <p className="text-gray-500 mt-2 font-medium break-words">
            <h1 className="text-xl font-bold">Author:</h1>
            {posts.author}
          </p>
        </div>
      </div>
    </>
  );
};
