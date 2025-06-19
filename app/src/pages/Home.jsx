import React from "react";
import { Link } from "react-router-dom";
import Blogs from "./Students";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-100 to-white flex items-center justify-center px-4">
      <div className="max-w-3xl w-full text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-4">
          Student Management System
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Manage student records, courses — all in one place.
        </p>
        
      </div>
    </div>
  );
};

export default Home;
