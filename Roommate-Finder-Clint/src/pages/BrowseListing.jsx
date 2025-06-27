import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  FaHome,
  FaDollarSign,
  FaMapMarkerAlt,
  FaCalendar,
  FaUser,
} from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useTheme } from "../hooks/use-theme";
import cardImage from "../assets/1.jpg";

const BrowseListing = () => {
  const { theme } = useTheme();
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");

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
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <span className="loading loading-spinner loading-lg text-[#3289c9]"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark"
            ? "bg-gray-900 text-red-400"
            : "bg-gray-50 text-red-500"
        }`}
      >
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-11/12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1
          className={`text-4xl font-bold mb-4 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Browse Roommate Listings
        </h1>
        <p
          className={`text-lg max-w-2xl mx-auto ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Discover the perfect roommate and living space that matches your
          lifestyle. Browse through verified listings from trusted members of
          our community.
        </p>
      </div>

      {/* Search and Sort Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title, location, or user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full md:w-80 border rounded-md px-4 py-2 focus:outline-none focus:border-[#3289c9] transition-colors ${
            theme === "dark"
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
          }`}
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className={`border rounded-md px-4 py-2 focus:outline-none focus:border-[#3289c9] transition-colors ${
            theme === "dark"
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        >
          <option value="asc">Sort: A-Z</option>
          <option value="desc">Sort: Z-A</option>
        </select>
      </div>

      {/* Listings Grid */}
      {filteredRoommates.length === 0 ? (
        <div
          className={`text-center py-12 ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          <p className="text-xl">No listings found</p>
          <p
            className={`mt-2 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Try adjusting your search criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredRoommates.map((listing) => (
            <div
              key={listing._id}
              className={`border rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 flex flex-col group ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
              style={{ minHeight: 340 }}
            >
              <img
                src={listing.imageUrl || cardImage}
                alt={listing.title}
                className="w-full h-40 object-cover rounded-t-2xl border-b border-gray-100 group-hover:brightness-95 transition-all duration-300"
              />
              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <h3
                  className={`text-xl font-bold mb-3 tracking-tight group-hover:text-[#3289c9] transition-colors duration-200 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {listing.title}
                </h3>
                <div
                  className={`space-y-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <p className="flex items-center gap-2 text-base">
                    <FaMapMarkerAlt className="text-[#3289c9]" />
                    {listing.location}
                  </p>
                  <p className="flex items-center gap-2 text-base">
                    <MdOutlineAttachMoney className="text-[#3289c9]" />$
                    {listing.rentAmount}/month
                  </p>
                </div>
                <div className="flex justify-between items-center mt-8">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                      listing.availability
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {listing.availability ? "Available" : "Not Available"}
                  </span>
                  <Link
                    to={`/roommates-details/${listing._id}`}
                    className="text-[#3289c9] hover:text-[#2778b5] font-semibold text-sm border border-[#3289c9] px-3 py-1 rounded-full transition-colors duration-200"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseListing;
