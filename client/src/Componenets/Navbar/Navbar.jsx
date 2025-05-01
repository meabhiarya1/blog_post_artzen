import React from "react";

export const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">My Blog</h1>
        <div className="space-x-4">
          <a href="/" className="text-white hover:text-gray-300">
            Home
          </a>
          <a href="/posts" className="text-white hover:text-gray-300">
            Posts
          </a>
          <a href="/about" className="text-white hover:text-gray-300">
            About
          </a>
        </div>
      </div>
    </nav>
  );
};
