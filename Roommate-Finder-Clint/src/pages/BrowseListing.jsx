import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  FaHome,
  FaDollarSign,
  FaMapMarkerAlt,
  FaCalendar,
  FaUser,
  FaTable,
  FaTh,
} from "react-icons/fa";

const BrowseListing = () => {
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("card");

  useEffect(() => {
    fetch(
      "http://localhost:3000/browse_listing"
    )
      .then((res) => res.json())
      .then((data) => {
        setRoommates(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load listings");
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#3289c9]"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }
  const CardView = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {roommates.map((listing) => (
        <div
          key={listing._id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          {/* Card Header */}
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {listing.title}
            </h3>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <FaUser className="text-[#3289c9]" />
              {listing.userName}
            </p>
          </div>

          {/* Card Body */}
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <FaMapMarkerAlt className="text-[#3289c9]" />
              <span>{listing.location}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <FaDollarSign className="text-[#3289c9]" />
              <span>${listing.rentAmount}/month</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <FaHome className="text-[#3289c9]" />
              <span>{listing.roomType}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <FaCalendar className="text-[#3289c9]" />
              <span>
                {listing.availability ? "Available Now" : "Not Available"}
              </span>
            </div>

            {/* Preview of Description */}
            <p className="text-gray-600 text-sm line-clamp-2">
              {listing.description}
            </p>
          </div>

          {/* Card Footer */}
          <div className="p-4 bg-gray-50 border-t border-gray-100">
            <Link
              to={`/roommates-details/${listing._id}`}
              className="block w-full text-center py-2 px-4 bg-[#3289c9] text-white rounded-md hover:bg-[#2778b5] transition-colors duration-300"
            >
              See More Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );

  const TableView = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Rent
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Room Type
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {roommates.map((listing) => (
            <tr key={listing._id}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 font-medium text-gray-900">
                  {listing.title}
                </div>
                <div className="text-sm leading-5 text-gray-500">
                  {listing.userName}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-500">
                  {listing.location}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">
                  ${listing.rentAmount}/month
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-500">
                  {listing.roomType}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <Link
                  to={`/roommates-details/${listing._id}`}
                  className="text-[#3289c9] hover:text-[#2778b5]"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Available Roommate Listings
        </h2>
        <div className="flex gap-4">
          {" "}
          <button
            onClick={() => setViewMode("card")}
            className={`px-4 py-2 rounded transition-colors flex items-center gap-2 ${
              viewMode === "card"
                ? "bg-[#3289c9] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <FaTh />
            Card View
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 rounded transition-colors flex items-center gap-2 ${
              viewMode === "table"
                ? "bg-[#3289c9] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <FaTable />
            Table View
          </button>
        </div>
      </div>

      {roommates.length === 0 ? (
        <div className="text-center text-gray-600">No listings available</div>
      ) : viewMode === "card" ? (
        <CardView />
      ) : (
        <TableView />
      )}
    </div>
  );
};

export default BrowseListing;
