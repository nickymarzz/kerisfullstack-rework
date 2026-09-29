import React from "react";
import Cookies from "js-cookie";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("user");
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Header Section */}
      <div className="bg-black bg-opacity-50 mt-8 p-6 rounded-lg text-center shadow-lg max-w-2xl">
        <h1 className="text-3xl text-white font-bold sm:text-4xl">
          Admin Dashboard
        </h1>
        <p className="text-lg text-gray-200 mt-2">
          Manage scholars and scholarships efficiently.
        </p>

        <div className=" mt-2 text-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Scholars List */}
        <Link to="/admin/scholar-list">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center cursor-pointer hover:bg-gray-200 transition">
            <h2 className="text-xl font-semibold text-gray-800">📜 Scholars</h2>
            <p className="text-gray-600 mt-2">View and manage scholars' records.</p>
          </div>
        </Link>

        {/* Scholarships List */}
        <Link to="/admin/scholarship-list">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center cursor-pointer hover:bg-gray-200 transition">
            <h2 className="text-xl font-semibold text-gray-800">🎓 Scholarships</h2>
            <p className="text-gray-600 mt-2">Browse available scholarships.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
