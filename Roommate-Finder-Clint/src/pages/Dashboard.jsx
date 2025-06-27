import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { AuthContext } from "../contexts/auth";
import { useTheme } from "../hooks/use-theme";
import Swal from "sweetalert2";
import {
  FaHome,
  FaList,
  FaPlus,
  FaSearch,
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
  FaInfoCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import logo from "../assets/roommateLogo.png";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    myListings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total listings from all users
        const totalResponse = await fetch(
          "https://roommate-finder-server-kappa.vercel.app/browse_listing"
        );
        const totalData = await totalResponse.json();

        // Fetch user's listings
        let myListingsData = [];
        if (user?.email) {
          const myResponse = await fetch(
            `https://roommate-finder-server-kappa.vercel.app/browse_listing/${user.email}`
          );
          myListingsData = await myResponse.json();
        }

        // Calculate active listings (assuming availability: true means active)
        const activeListings = totalData.filter(
          (listing) => listing.availability
        ).length;

        setStats({
          totalListings: totalData.length,
          activeListings: activeListings,
          myListings: myListingsData.length,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, [user?.email]);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3289c9',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Logged Out!',
              text: 'You have been successfully logged out.',
              timer: 1500,
              showConfirmButton: false,
              position: 'top-end',
              toast: true,
            });
            navigate("/");
          })
          .catch((error) => {
            console.error("Error logging out:", error);
            Swal.fire({
              icon: 'error',
              title: 'Logout Failed',
              text: 'There was an error logging you out. Please try again.',
              showConfirmButton: true,
              position: 'center',
            });
          });
      }
    });
  };

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar Navigation */}
      <div className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        fixed lg:static inset-y-0 left-0 z-50 w-64 shadow-lg flex flex-col transition-transform duration-300 ease-in-out
        ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
      `}>
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className={`p-2 rounded-lg ${theme === 'dark' ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Header */}
        <div className={`p-4 lg:p-6 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg border-2 border-[#3289c9]" />
            <span className="text-lg lg:text-xl font-bold text-[#3289c9]">
              RoommateFinder
            </span>
          </Link>
        </div>

        {/* User Profile Section */}
        <div className={`p-4 lg:p-6 border-b ${theme === 'dark' ? 'border-gray-700 bg-gradient-to-r from-gray-700 to-gray-600' : 'border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#3289c9] rounded-full flex items-center justify-center">
              <FaUser className="text-white text-base lg:text-lg" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className={`font-semibold text-sm lg:text-base truncate ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                {user?.displayName || "User"}
              </h3>
              <p className={`text-xs lg:text-sm truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 lg:p-4 flex-1">
          <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Navigation
          </h3>
          <ul className="space-y-1 lg:space-y-2">
            <li>
              <Link
                to="/dashboard"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 p-2 lg:p-3 rounded-lg transition-all duration-200 bg-[#3289c9] text-white shadow-md"
              >
                <FaTachometerAlt className="text-base lg:text-lg flex-shrink-0" />
                <span className="font-medium text-sm lg:text-base">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/add"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 p-2 lg:p-3 rounded-lg transition-all duration-200 ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700 hover:text-[#3289c9]' : 'text-gray-700 hover:bg-gray-100 hover:text-[#3289c9]'}`}
              >
                <FaPlus className="text-base lg:text-lg flex-shrink-0" />
                <span className="font-medium text-sm lg:text-base">Add Item</span>
              </Link>
            </li>
            <li>
              <Link
                to={`/dashboard/my-items/${user?.email}`}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 p-2 lg:p-3 rounded-lg transition-all duration-200 ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700 hover:text-[#3289c9]' : 'text-gray-700 hover:bg-gray-100 hover:text-[#3289c9]'}`}
              >
                <FaList className="text-base lg:text-lg flex-shrink-0" />
                <span className="font-medium text-sm lg:text-base">My Items</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/browse"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 p-2 lg:p-3 rounded-lg transition-all duration-200 ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700 hover:text-[#3289c9]' : 'text-gray-700 hover:bg-gray-100 hover:text-[#3289c9]'}`}
              >
                <FaSearch className="text-base lg:text-lg flex-shrink-0" />
                <span className="font-medium text-sm lg:text-base">Browse Items</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className={`p-3 lg:p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center gap-3 p-2 lg:p-3 rounded-lg transition-all duration-200 mb-2 ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            )}
            <span className="font-medium text-sm lg:text-base">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>
          
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 p-2 lg:p-3 rounded-lg transition-colors duration-200 ${theme === 'dark' ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-red-50'}`}
          >
            <FaSignOutAlt className="text-base lg:text-lg flex-shrink-0" />
            <span className="font-medium text-sm lg:text-base">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Navbar */}
        <div className={`shadow-sm border-b ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="px-3 sm:px-4 lg:px-6 py-3 lg:py-4">
            <div className="flex items-center justify-between">
              {/* Mobile Menu Button & Navigation */}
              <div className="flex items-center gap-3 lg:gap-6">
                {/* Mobile Hamburger Menu */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className={`lg:hidden p-2 rounded-lg ${theme === 'dark' ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FaBars className="w-5 h-5" />
                </button>

                {/* Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center gap-6">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-[#3289c9] text-white"
                          : theme === 'dark' 
                          ? "text-gray-300 hover:bg-gray-700 hover:text-[#3289c9]"
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
                          : theme === 'dark' 
                          ? "text-gray-300 hover:bg-gray-700 hover:text-[#3289c9]"
                          : "text-gray-700 hover:bg-gray-100 hover:text-[#3289c9]"
                      }`
                    }
                  >
                    <FaTachometerAlt className="text-sm" />
                    <span className="font-medium">Dashboard</span>
                  </NavLink>
                </nav>
              </div>

              {/* User Actions */}
              <div className="flex items-center gap-2 sm:gap-4">
                {/* Theme Toggle Button in Top Navbar */}
                <button
                  onClick={toggleTheme}
                  className={`p-1.5 sm:p-2 rounded-full transition-all duration-300 ${theme === 'dark' ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-100 text-gray-800'}`}
                  title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  {theme === 'light' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    </svg>
                  )}
                </button>

                <div className={`hidden sm:block text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Welcome back,{" "}
                  <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                    {user?.displayName}
                  </span>
                  !
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-3 sm:p-4 lg:p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard Overview */}
            <div className="mb-6 lg:mb-8">
              <div className="bg-gradient-to-r from-[#3289c9] to-[#2778b5] rounded-lg p-4 sm:p-6 text-white mb-4 sm:mb-6">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
                  Welcome to your Dashboard! 👋
                </h1>
                <p className="text-blue-100 text-sm sm:text-base">
                  Manage your roommate listings and discover new opportunities
                  from here.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 lg:mb-8">
                <div className={`p-4 sm:p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xs sm:text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Total Listings
                      </p>
                      <p className={`text-xl sm:text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                        {loading ? "..." : stats.totalListings}
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 rounded-full bg-blue-500">
                      <FaHome className="text-white text-lg sm:text-xl" />
                    </div>
                  </div>
                </div>
                <div className={`p-4 sm:p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xs sm:text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Active Listings
                      </p>
                      <p className={`text-xl sm:text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                        {loading ? "..." : stats.activeListings}
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 rounded-full bg-green-500">
                      <FaList className="text-white text-lg sm:text-xl" />
                    </div>
                  </div>
                </div>
                <div className={`p-4 sm:p-6 rounded-lg shadow-lg sm:col-span-2 lg:col-span-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xs sm:text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        My Listings
                      </p>
                      <p className={`text-xl sm:text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                        {loading ? "..." : stats.myListings}
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 rounded-full bg-purple-500">
                      <FaList className="text-white text-lg sm:text-xl" />
                    </div>
                  </div>
                </div>
              </div>

              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
