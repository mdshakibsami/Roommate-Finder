import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../contexts/auth";
import { 
  FaHome, 
  FaList, 
  FaPlus, 
  FaSearch, 
  FaUser, 
  FaSignOutAlt,
  FaTachometerAlt,
  FaInfoCircle
} from "react-icons/fa";
import logo from "../assets/roommateLogo.png";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar Navigation */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-10 h-10" />
            <span className="text-xl font-bold text-[#3289c9]">RoommateFinder</span>
          </Link>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#3289c9] rounded-full flex items-center justify-center">
              <FaUser className="text-white text-lg" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{user?.displayName || "User"}</h3>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 flex-1">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Navigation</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 bg-[#3289c9] text-white shadow-md"
              >
                <FaTachometerAlt className="text-lg" />
                <span className="font-medium">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to={`/my-listings/${user?.email}`}
                className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-100 hover:text-[#3289c9]"
              >
                <FaList className="text-lg" />
                <span className="font-medium">My Items</span>
              </Link>
            </li>
            <li>
              <Link
                to="/add"
                className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-100 hover:text-[#3289c9]"
              >
                <FaPlus className="text-lg" />
                <span className="font-medium">Add Item</span>
              </Link>
            </li>
            <li>
              <Link
                to="/browse"
                className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-100 hover:text-[#3289c9]"
              >
                <FaSearch className="text-lg" />
                <span className="font-medium">Browse Items</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <FaSignOutAlt className="text-lg" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Top Navigation Links */}
              <nav className="flex items-center gap-6">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-[#3289c9] text-white"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#3289c9]"
                    }`
                  }
                >
                  <FaHome className="text-sm" />
                  <span className="font-medium">Home</span>
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-[#3289c9] text-white"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#3289c9]"
                    }`
                  }
                >
                  <FaTachometerAlt className="text-sm" />
                  <span className="font-medium">Dashboard</span>
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-[#3289c9] text-white"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#3289c9]"
                    }`
                  }
                >
                  <FaInfoCircle className="text-sm" />
                  <span className="font-medium">About Us</span>
                </NavLink>
              </nav>

              {/* User Actions */}
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  Welcome back, <span className="font-semibold text-gray-800">{user?.displayName}</span>!
                </div>
                <Link
                  to="/add"
                  className="bg-[#3289c9] text-white px-4 py-2 rounded-lg hover:bg-[#2778b5] transition-colors duration-200 flex items-center gap-2"
                >
                  <FaPlus className="text-sm" />
                  <span>Quick Add</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard Overview */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-[#3289c9] to-[#2778b5] rounded-lg p-6 text-white mb-6">
                <h1 className="text-3xl font-bold mb-2">
                  Welcome to your Dashboard! 👋
                </h1>
                <p className="text-blue-100">
                  Manage your roommate listings and discover new opportunities from here.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Listings</p>
                      <p className="text-2xl font-bold text-gray-900">0</p>
                    </div>
                    <div className="p-3 rounded-full bg-blue-500">
                      <FaHome className="text-white text-xl" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Listings</p>
                      <p className="text-2xl font-bold text-gray-900">0</p>
                    </div>
                    <div className="p-3 rounded-full bg-green-500">
                      <FaList className="text-white text-xl" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Views</p>
                      <p className="text-2xl font-bold text-gray-900">0</p>
                    </div>
                    <div className="p-3 rounded-full bg-purple-500">
                      <FaSearch className="text-white text-xl" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Messages</p>
                      <p className="text-2xl font-bold text-gray-900">0</p>
                    </div>
                    <div className="p-3 rounded-full bg-orange-500">
                      <FaUser className="text-white text-xl" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Link
                    to="/add"
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-green-100 text-green-600">
                        <FaPlus className="text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Add New Listing</h3>
                        <p className="text-sm text-gray-600">Create a new roommate listing</p>
                      </div>
                    </div>
                  </Link>
                  <Link
                    to={`/my-listings/${user?.email}`}
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                        <FaList className="text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">View My Listings</h3>
                        <p className="text-sm text-gray-600">Manage your existing listings</p>
                      </div>
                    </div>
                  </Link>
                  <Link
                    to="/browse"
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                        <FaSearch className="text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Browse All</h3>
                        <p className="text-sm text-gray-600">Explore available listings</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
