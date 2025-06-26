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
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { AuthContext } from "../contexts/auth";

const ListingDetails = () => {
  const roommate = useLoaderData();
  const { user } = useContext(AuthContext);
  const [likeCount, setLikeCount] = useState(roommate.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [showContact, setShowContact] = useState(false);

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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header with Like Button */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {roommate.title}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-gray-600">
                <FaUser className="text-[#3289c9]" />
                <span className="font-medium">{roommate.userName}</span>
              </div>
            </div>{" "}
            <button
              onClick={handleLike}
              disabled={user?.email === roommate.email}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 transform ${
                user?.email === roommate.email
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : isLiked
                  ? "bg-pink-100 text-pink-500 scale-105"
                  : "bg-gray-100 hover:bg-pink-100 text-gray-600 hover:text-pink-500 hover:scale-105"
              }`}
            >
              <FaHeart
                className={`transform transition-all duration-300 ${
                  isLiked ? "text-pink-500 scale-110" : "scale-100"
                }`}
              />
              <span>
                {likeCount} {likeCount === 1 ? "Like" : "Likes"}
              </span>
            </button>
            <div
              className={`mt-2 overflow-hidden transition-all duration-500 ${
                showContact
                  ? "max-h-20 opacity-100 transform translate-y-0"
                  : "max-h-0 opacity-0 transform -translate-y-4"
              }`}
            >
              <div className="p-2 bg-green-50 rounded-md">
                <p className="text-sm text-green-700">
                  <FaPhone className="inline mr-2" />
                  Contact: {roommate.contactInfo}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Location and Rent Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-2xl text-[#3289c9]" />
              <div>
                <h3 className="font-semibold text-gray-700">Location</h3>
                <p className="text-gray-600">{roommate.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaDollarSign className="text-2xl text-[#3289c9]" />
              <div>
                <h3 className="font-semibold text-gray-700">Monthly Rent</h3>
                <p className="text-gray-600">${roommate.rentAmount}</p>
              </div>
            </div>
          </div>
          {/* Room Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center gap-3">
              <FaHome className="text-2xl text-[#3289c9]" />
              <div>
                <h3 className="font-semibold text-gray-700">Room Type</h3>
                <p className="text-gray-600">{roommate.roomType}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaCalendar className="text-2xl text-[#3289c9]" />
              <div>
                <h3 className="font-semibold text-gray-700">Availability</h3>
                <p className="text-gray-600">
                  {roommate.availability ? "Available Now" : "Not Available"}
                </p>
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {roommate.description}
            </p>
          </div>{" "}
          {/* Contact Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-4">
              Contact Information
            </h3>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FaEnvelope className="text-[#3289c9]" />
                <span className="text-gray-600">{roommate.email}</span>
              </div>
              {!showContact && (
                <p className="text-sm text-gray-500 mt-2">
                  Like this listing to view the contact number
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
