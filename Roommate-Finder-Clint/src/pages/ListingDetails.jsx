import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import {
  FaHome,
  FaDollarSign,
  FaMapMarkerAlt,
  FaCalendar,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHeart,
  FaBed,
  FaBath,
  FaWifi,
  FaCar,
  FaUtensils,
  FaTv,
  FaSnowflake,
  FaFire,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { AuthContext } from "../contexts/auth";
import { useTheme } from "../hooks/use-theme";
import defaultImage from "../assets/1.jpg";

const ListingDetails = () => {
  const roommate = useLoaderData();
  console.log(roommate)
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();
  const [likeCount, setLikeCount] = useState(roommate?.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [showContact, setShowContact] = useState(false);

  // Add loading state check
  if (!roommate) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-[#3289c9] mb-4"></div>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Loading listing details...</p>
        </div>
      </div>
    );
  }

  const handleLike = async () => {
    if (!user) {
      toast.error("Please login to like this listing");
      return;
    }

    // Prevent liking own post
    if (user.email === roommate.email) {
      toast.error("You cannot like your own listing");
      return;
    }

    try {
      const response = await fetch(
        `https://roommate-finder-server-kappa.vercel.app/like/${roommate._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userEmail: user.email }),
        }
      );
      const data = await response.json();

      if (data.message === "Cannot like your own post") {
        toast.error("You cannot like your own listing");
        return;
      }
      if (data.success) {
        setLikeCount((prev) => prev + 1);
        setShowContact(true);
        setIsLiked(true);
        toast.success(
          "Like added successfully! Contact number is now visible."
        );
      } else {
        toast.error(data.message || "Failed to add like");
      }
    } catch (error) {
      console.error("Error liking listing:", error);
      toast.error("Failed to like listing");
    }
  };

  return (
    <div className={`min-h-screen py-4 sm:py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-2 sm:px-4">
        <div className={`max-w-6xl mx-auto rounded-lg shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Header with Image */}
          <div className="relative">
            <img
              src={roommate.imageUrl || defaultImage}
              alt={roommate.title}
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end">
              <div className="p-4 sm:p-6 text-white w-full">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 drop-shadow-lg">
                  {roommate.title}
                </h1>
                <div className="flex items-center gap-2 text-sm sm:text-base lg:text-lg drop-shadow-md">
                  <FaUser className="text-white" />
                  <span className="font-medium">{roommate.userName}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Like Button Section */}
          <div className={`p-4 sm:p-6 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                    roommate.availability
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {roommate.availability ? "Available Now" : "Not Available"}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-[#3289c9]">
                  ${roommate.rentAmount}/month
                </span>
              </div>
              <button
                onClick={handleLike}
                disabled={user?.email === roommate.email}
                className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-lg transition-all duration-300 transform ${
                  user?.email === roommate.email
                    ? theme === 'dark' ? "bg-gray-600 text-gray-500 cursor-not-allowed" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : isLiked
                    ? "bg-pink-100 text-pink-500 scale-105"
                    : theme === 'dark' ? "bg-gray-600 hover:bg-pink-100 text-gray-200 hover:text-pink-500 hover:scale-105" : "bg-gray-100 hover:bg-pink-100 text-gray-600 hover:text-pink-500 hover:scale-105"
                }`}
              >
                <FaHeart
                  className={`transform transition-all duration-300 ${
                    isLiked ? "text-pink-500 scale-110" : "scale-100"
                  }`}
                />
                <span className="font-semibold">
                  {likeCount} {likeCount === 1 ? "Like" : "Likes"}
                </span>
              </button>
            </div>

            {/* Contact Number Reveal */}
            <div
              className={`mt-4 overflow-hidden transition-all duration-500 ${
                showContact
                  ? "max-h-20 opacity-100 transform translate-y-0"
                  : "max-h-0 opacity-0 transform -translate-y-4"
              }`}
            >
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-700 font-medium text-sm sm:text-base">
                  <FaPhone className="inline mr-2" />
                  Contact Number: {roommate.contactInfo}
                </p>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Left Column - Basic Information */}
              <div>
                <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                  Property Details
                </h2>

                {/* Location and Rent Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className={`flex items-center gap-3 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}>
                    <FaMapMarkerAlt className="text-xl sm:text-2xl text-[#3289c9] flex-shrink-0" />
                    <div className="min-w-0">
                      <h3 className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Location</h3>
                      <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm sm:text-base truncate`} title={roommate.location}>{roommate.location}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-3 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-green-50'}`}>
                    <FaDollarSign className="text-xl sm:text-2xl text-[#3289c9] flex-shrink-0" />
                    <div>
                      <h3 className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                        Monthly Rent
                      </h3>
                      <p className={`font-bold text-sm sm:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        ${roommate.rentAmount}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Room Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className={`flex items-center gap-3 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-purple-50'}`}>
                    <FaHome className="text-xl sm:text-2xl text-[#3289c9] flex-shrink-0" />
                    <div>
                      <h3 className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Room Type</h3>
                      <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm sm:text-base`}>{roommate.roomType}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-3 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-yellow-50'}`}>
                    <FaCalendar className="text-xl sm:text-2xl text-[#3289c9] flex-shrink-0" />
                    <div>
                      <h3 className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                        Move-in Date
                      </h3>
                      <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm sm:text-base`}>
                        {roommate.moveInDate
                          ? new Date(roommate.moveInDate).toLocaleDateString()
                          : "Flexible"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                {(roommate.bedrooms ||
                  roommate.bathrooms ||
                  roommate.furnished) && (
                  <div className="mb-4 sm:mb-6">
                    <h3 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                      Room Features
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                      {roommate.bedrooms && (
                        <div className={`flex items-center gap-2 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <FaBed className="text-[#3289c9] flex-shrink-0" />
                          <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {roommate.bedrooms} Bedrooms
                          </span>
                        </div>
                      )}
                      {roommate.bathrooms && (
                        <div className={`flex items-center gap-2 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <FaBath className="text-[#3289c9] flex-shrink-0" />
                          <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {roommate.bathrooms} Bathrooms
                          </span>
                        </div>
                      )}
                      {roommate.furnished && (
                        <div className={`flex items-center gap-2 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <FaHome className="text-[#3289c9] flex-shrink-0" />
                          <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Furnished</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Amenities */}
                {(roommate.wifi ||
                  roommate.parking ||
                  roommate.kitchen ||
                  roommate.tv ||
                  roommate.ac ||
                  roommate.heating) && (
                  <div className="mb-4 sm:mb-6">
                    <h3 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                      Amenities
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {roommate.wifi && (
                        <div className={`flex items-center gap-2 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}>
                          <FaWifi className="text-[#3289c9] flex-shrink-0" />
                          <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>WiFi</span>
                        </div>
                      )}
                      {roommate.parking && (
                        <div className={`flex items-center gap-2 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}>
                          <FaCar className="text-[#3289c9] flex-shrink-0" />
                          <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Parking</span>
                        </div>
                      )}
                      {roommate.kitchen && (
                        <div className={`flex items-center gap-2 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}>
                          <FaUtensils className="text-[#3289c9] flex-shrink-0" />
                          <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Kitchen</span>
                        </div>
                      )}
                      {roommate.tv && (
                        <div className={`flex items-center gap-2 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}>
                          <FaTv className="text-[#3289c9] flex-shrink-0" />
                          <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>TV</span>
                        </div>
                      )}
                      {roommate.ac && (
                        <div className={`flex items-center gap-2 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}>
                          <FaSnowflake className="text-[#3289c9] flex-shrink-0" />
                          <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Air Conditioning</span>
                        </div>
                      )}
                      {roommate.heating && (
                        <div className={`flex items-center gap-2 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}>
                          <FaFire className="text-[#3289c9] flex-shrink-0" />
                          <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Heating</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Description and Contact */}
              <div>
                <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                  About This Place
                </h2>

                {/* Description */}
                <div className={`mb-4 sm:mb-6 p-4 sm:p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h3 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                    Description
                  </h3>
                  <p className={`leading-relaxed whitespace-pre-wrap text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {roommate.description}
                  </p>
                </div>

                {/* Roommate Preferences */}
                {(roommate.preferredGender ||
                  roommate.ageRange ||
                  roommate.lifestyle) && (
                  <div className={`mb-4 sm:mb-6 p-4 sm:p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-indigo-50'}`}>
                    <h3 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                      Roommate Preferences
                    </h3>
                    <div className="space-y-3">
                      {roommate.preferredGender && (
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm sm:text-base`}>
                            Gender Preference:
                          </span>
                          <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'} text-sm sm:text-base`}>
                            {roommate.preferredGender}
                          </span>
                        </div>
                      )}
                      {roommate.ageRange && (
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm sm:text-base`}>
                            Age Range:
                          </span>
                          <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'} text-sm sm:text-base`}>
                            {roommate.ageRange}
                          </span>
                        </div>
                      )}
                      {roommate.lifestyle && (
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm sm:text-base`}>
                            Lifestyle:
                          </span>
                          <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'} text-sm sm:text-base`}>
                            {roommate.lifestyle}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                <div className={`p-4 sm:p-6 rounded-lg border ${theme === 'dark' ? 'bg-gradient-to-r from-gray-700 to-gray-600 border-gray-600' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'}`}>
                  <h3 className={`font-semibold mb-4 text-lg sm:text-xl ${theme === 'dark' ? 'text-gray-100' : 'text-gray-700'}`}>
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className={`flex items-center gap-3 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`}>
                      <FaUser className="text-[#3289c9] text-lg flex-shrink-0" />
                      <div className="min-w-0">
                        <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm sm:text-base`}>
                          Posted by:
                        </span>
                        <span className={`ml-2 font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-700'} text-sm sm:text-base`}>
                          {roommate.userName}
                        </span>
                      </div>
                    </div>
                    <div className={`flex items-center gap-3 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`}>
                      <FaEnvelope className="text-[#3289c9] text-lg flex-shrink-0" />
                      <div className="min-w-0">
                        <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm sm:text-base`}>Email:</span>
                        <span className={`ml-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-700'} text-sm sm:text-base break-all`}>
                          {roommate.email}
                        </span>
                      </div>
                    </div>
                    {!showContact && (
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-700 font-medium">
                          💡 Like this listing to view the contact number and get
                          in touch with the poster!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
