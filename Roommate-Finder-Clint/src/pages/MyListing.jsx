import React, { useState } from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useTheme } from "../hooks/use-theme";
import Swal from "sweetalert2";

const MyListing = () => {
  const loadedListings = useLoaderData();
  const [myListings, setMyListings] = useState(loadedListings);
  const { theme } = useTheme();
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3289c9",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://roommate-finder-server-kappa.vercel.app/delete-listing/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              // Update the local state by filtering out the deleted listing
              setMyListings(myListings.filter((listing) => listing._id !== id));
              Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Your listing has been deleted.",
                timer: 1500,
                showConfirmButton: false,
                position: "top-end",
                toast: true,
              });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            Swal.fire({
              icon: "error",
              title: "Delete Failed",
              text: "There was an error deleting your listing.",
              showConfirmButton: true,
              position: "center",
            });
          });
      }
    });
  };

  if (myListings.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2
          className={`text-2xl font-bold mb-4 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          No Listings Found
        </h2>
        <p
          className={`mb-4 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          You haven't added any listings yet.
        </p>
        <Link
          to="/add"
          className="bg-[#3289c9] text-white px-6 py-2 rounded-lg hover:bg-[#2778b5] transition-colors"
        >
          Add Your First Listing
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-11/12 px-4 py-8">
      <div className="text-center mb-8">
        <h2
          className={`text-3xl font-bold mb-4 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          My Listings
        </h2>
        <p
          className={`text-lg mb-6 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Manage your roommate listings. Edit, delete, or add new listings to
          find the perfect roommate.
        </p>
        <Link
          to="/add"
          className="bg-[#3289c9] text-white px-6 py-3 rounded-lg hover:bg-[#2778b5] transition-colors duration-200 inline-flex items-center gap-2"
        >
          <FaEdit className="text-sm" />
          Add New Listing
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {myListings.map((listing) => (
          <div
            key={listing._id}
            className={`rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            {/* Card Header with Image */}
            <div className="relative h-48 bg-gradient-to-br from-[#3289c9] to-[#2778b5]">
              {listing.imageUrl ? (
                <img
                  src={listing.imageUrl}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium">No Image</p>
                  </div>
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full shadow-md ${
                    listing.availability
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {listing.availability ? "Available" : "Not Available"}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              {/* Title */}
              <h3
                className={`text-lg font-bold mb-2 line-clamp-2 min-h-[3.5rem] ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                {listing.title}
              </h3>

              {/* Location */}
              <div
                className={`flex items-center gap-2 mb-3 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">{listing.location}</span>
              </div>

              {/* Rent Amount */}
              <div className="mb-4">
                <span className="text-2xl font-bold text-[#3289c9]">
                  ${listing.rentAmount}
                </span>
                <span
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  /month
                </span>
              </div>

              {/* Room Type */}
              {listing.roomType && (
                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm ${
                      theme === "dark"
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {listing.roomType}
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div
                className={`flex flex-col gap-2 pt-4 border-t ${
                  theme === "dark" ? "border-gray-700" : "border-gray-100"
                }`}
              >
                <Link
                  to={`/roommates-details/${listing._id}`}
                  className={`w-full py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium ${
                    theme === "dark"
                      ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <FaEye className="w-4 h-4" />
                  View Details
                </Link>
                <div className="flex gap-2">
                  <Link
                    to={`/update-listing/${listing._id}`}
                    className="flex-1 bg-[#3289c9] text-white py-2 px-4 rounded-lg hover:bg-[#2778b5] transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <FaEdit className="w-4 h-4" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(listing._id)}
                    className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <FaTrash className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListing;
