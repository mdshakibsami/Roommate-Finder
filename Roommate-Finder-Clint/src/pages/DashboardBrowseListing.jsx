import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  FaEye,
  FaMapMarkerAlt,
  FaDollarSign,
} from "react-icons/fa";
import { useTheme } from "../hooks/use-theme";
import cardImage from "../assets/1.jpg";

const DashboardBrowseListing = () => {
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    fetch("https://roommate-finder-server-kappa.vercel.app/browse_listing")
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
        <div className={`text-center py-12 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#3289c9]"></div>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Loading listings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-2 py-4">
        <div className={`text-center py-12 rounded-lg shadow-lg text-red-500 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-2 py-4">
      {/* Header Section */}
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Browse Listings</h2>
        
        {/* Search and Sort Section */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Search listings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-[#3289c9] ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className={`px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-[#3289c9] ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-300 text-gray-900'}`}
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
      </div>

      {/* Listings Table */}
      {filteredRoommates.length === 0 ? (
        <div className={`text-center py-12 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <p className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>No listings found</p>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className={`rounded-lg shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th className={`px-3 py-2 text-left text-xs font-medium uppercase ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    Image
                  </th>
                  <th className={`px-3 py-2 text-left text-xs font-medium uppercase ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    Title
                  </th>
                  <th className={`px-3 py-2 text-left text-xs font-medium uppercase ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    Location
                  </th>
                  <th className={`px-3 py-2 text-left text-xs font-medium uppercase ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    Rent
                  </th>
                  <th className={`px-3 py-2 text-left text-xs font-medium uppercase ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    Type
                  </th>
                  <th className={`px-3 py-2 text-left text-xs font-medium uppercase ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    Status
                  </th>
                  <th className={`px-3 py-2 text-center text-xs font-medium uppercase ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {filteredRoommates.map((listing) => (
                  <tr key={listing._id} className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
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
                      <div className={`font-medium max-w-[150px] truncate ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`} title={listing.title}>
                        {listing.title}
                      </div>
                    </td>

                    {/* Compact Location */}
                    <td className="px-3 py-2">
                      <div className={`max-w-[120px] truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} title={listing.location}>
                        {listing.location}
                      </div>
                    </td>

                    {/* Compact Rent */}
                    <td className="px-3 py-2">
                      <div className="font-semibold text-[#3289c9]">
                        ${listing.rentAmount}
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>/month</div>
                      </div>
                    </td>

                    {/* Compact Room Type */}
                    <td className="px-3 py-2">
                      {listing.roomType && (
                        <span className={`inline-block px-2 py-1 rounded text-xs max-w-[80px] truncate ${theme === 'dark' ? 'bg-gray-600 text-gray-200' : 'bg-gray-100 text-gray-700'}`}>
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
                          className={`text-[#3289c9] hover:text-[#2778b5] p-1 rounded transition-colors ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-blue-50'}`}
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
