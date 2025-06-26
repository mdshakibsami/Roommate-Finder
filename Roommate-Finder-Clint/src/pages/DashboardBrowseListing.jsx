import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  FaEye,
  FaMapMarkerAlt,
  FaDollarSign,
} from "react-icons/fa";
import cardImage from "../assets/1.jpg";

const DashboardBrowseListing = () => {
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/browse_listing")
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

  // Filter and sort logic
  const filteredRoommates = roommates
    .filter(
      (listing) =>
        listing.title.toLowerCase().includes(search.toLowerCase()) ||
        listing.location.toLowerCase().includes(search.toLowerCase()) ||
        (listing.userName &&
          listing.userName.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

  if (loading) {
    return (
      <div className="w-full px-2 py-4">
        <div className="text-center py-12 bg-white rounded-lg shadow-lg">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#3289c9]"></div>
          <p className="mt-2 text-gray-600">Loading listings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-2 py-4">
        <div className="text-center py-12 bg-white rounded-lg shadow-lg text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-2 py-4">
      {/* Header Section */}
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Browse Listings</h2>
        
        {/* Search and Sort Section */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Search listings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#3289c9]"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#3289c9]"
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
      </div>

      {/* Listings Table */}
      {filteredRoommates.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-lg">
          <p className="text-lg font-medium text-gray-600">No listings found</p>
          <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Image
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Title
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Location
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Rent
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRoommates.map((listing) => (
                  <tr key={listing._id} className="hover:bg-gray-50">
                    {/* Compact Image */}
                    <td className="px-3 py-2">
                      <div className="w-10 h-10 rounded-md overflow-hidden bg-gradient-to-br from-[#3289c9] to-[#2778b5]">
                        <img
                          src={listing.imageURL || cardImage}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    {/* Compact Title */}
                    <td className="px-3 py-2">
                      <div className="font-medium text-gray-900 max-w-[150px] truncate" title={listing.title}>
                        {listing.title}
                      </div>
                    </td>

                    {/* Compact Location */}
                    <td className="px-3 py-2">
                      <div className="text-gray-600 max-w-[120px] truncate" title={listing.location}>
                        {listing.location}
                      </div>
                    </td>

                    {/* Compact Rent */}
                    <td className="px-3 py-2">
                      <div className="font-semibold text-[#3289c9]">
                        ${listing.rentAmount}
                        <div className="text-gray-400 text-xs">/month</div>
                      </div>
                    </td>

                    {/* Compact Room Type */}
                    <td className="px-3 py-2">
                      {listing.roomType && (
                        <span className="inline-block px-2 py-1 rounded text-xs bg-gray-100 text-gray-700 max-w-[80px] truncate">
                          {listing.roomType}
                        </span>
                      )}
                    </td>

                    {/* Compact Status */}
                    <td className="px-3 py-2">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          listing.availability
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {listing.availability ? "Available" : "Unavailable"}
                      </span>
                    </td>

                    {/* Compact Action */}
                    <td className="px-3 py-2">
                      <div className="flex items-center justify-center">
                        <Link
                          to={`/roommates-details/${listing._id}`}
                          className="text-[#3289c9] hover:text-[#2778b5] p-1 rounded hover:bg-blue-50 transition-colors"
                          title="View Details"
                        >
                          <FaEye className="w-3 h-3" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardBrowseListing;
