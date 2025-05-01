import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export const PostDetails = () => {
  const [postDetails, setPostDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchPostDetails() {
      try {
        const response = await axios.get(`${apiUrl}/api/v1/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setPostDetails(response.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    }
    fetchPostDetails();
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Post Details</h1>

        <div className="space-y-2 text-left">
          <h2 className="text-lg font-semibold text-gray-700">Title</h2>
          <p className="text-gray-900 break-words">{postDetails.title}</p>
        </div>

        <div className="space-y-2 text-left">
          <h2 className="text-lg font-semibold text-gray-700">Content</h2>
          <p className="text-gray-700 break-words">{postDetails.content}</p>
        </div>

        <div className="space-y-2 text-left">
          <h2 className="text-lg font-semibold text-gray-700">Author</h2>
          <p className="text-gray-600 break-words">{postDetails.author}</p>
        </div>
      </div>
    </div>
  );
};
