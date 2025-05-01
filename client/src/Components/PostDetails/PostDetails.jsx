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
        const response = await axios.get(`${apiUrl}/api/v1/posts/${id}`);
        setPostDetails(response.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    }

    fetchPostDetails();
  }, [id]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 max-w-full text-center overflow-hidden">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Details</h1>

        <div className="text-lg font-semibold text-gray-700 break-words">
          <h2 className="text-xl font-bold">Title:</h2>
          <p>{postDetails.title}</p>
        </div>

        <div className="text-gray-600 mt-2 break-words text-wrap">
          <h2 className="text-xl font-bold">Content:</h2>
          <p>{postDetails.content}</p>
        </div>

        <div className="text-gray-500 mt-2 font-medium break-words">
          <h2 className="text-xl font-bold">Author:</h2>
          <p>{postDetails.author}</p>
        </div>
      </div>
    </div>
  );
};

