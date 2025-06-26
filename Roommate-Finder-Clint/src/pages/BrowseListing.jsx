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
import cardImage from "../assets/1.jpg";

const BrowseListing = () => {
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Browse Roommate Listings
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
          className="w-full md:w-80 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#3289c9]"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[#3289c9]"
        >
          <option value="asc">Sort: A-Z</option>
          <option value="desc">Sort: Z-A</option>
        </select>
      </div>

      {/* Listings Grid */}
      {filteredRoommates.length === 0 ? (
        <div className="text-center text-gray-600 py-12">
          <p className="text-xl">No listings found</p>
          <p className="text-gray-500 mt-2">
            Try adjusting your search criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredRoommates.map((listing) => (
            <div
              key={listing._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 flex flex-col group"
              style={{ minHeight: 340 }}
            >
              <img
                src={listing.imageURL || cardImage}
                alt={listing.title}
                className="w-full h-40 object-cover rounded-t-2xl border-b border-gray-100 group-hover:brightness-95 transition-all duration-300"
              />
              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-[#3289c9] transition-colors duration-200">
                  {listing.title}
                </h3>
                <div className="space-y-2 text-gray-600">
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
