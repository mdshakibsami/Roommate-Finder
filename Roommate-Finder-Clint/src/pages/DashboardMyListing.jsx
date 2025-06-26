import React, { useState } from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";

const DashboardMyListing = () => {
  const loadedListings = useLoaderData();
  const [myListings, setMyListings] = useState(loadedListings);
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
        fetch(`http://localhost:3000/delete-listing/${id}`, {
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
      <div className="w-full px-2 py-4">
        <div className="text-center py-12 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-3">No Listings Found</h2>
          <p className="text-gray-600 mb-4">
            You haven't added any listings yet.
          </p>
          <Link
            to="/add"
            className="bg-[#3289c9] text-white px-4 py-2 rounded-lg hover:bg-[#2778b5] transition-colors inline-flex items-center gap-2"
          >
            <FaEdit className="text-sm" />
            Add Your First Listing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-2 py-4">
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">My Listings</h2>
        <Link
          to="/add"
          className="bg-[#3289c9] text-white px-4 py-2 rounded-lg hover:bg-[#2778b5] transition-colors duration-200 inline-flex items-center gap-2 text-sm"
        >
          <FaEdit className="text-sm" />
          Add New Listing
        </Link>
      </div>

      {/* Compact Table Format */}
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {myListings.map((listing) => (
                <tr key={listing._id} className="hover:bg-gray-50">
                  {/* Compact Image */}
                  <td className="px-3 py-2">
                    <div className="w-10 h-10 rounded-md overflow-hidden bg-gradient-to-br from-[#3289c9] to-[#2778b5]">
                      {listing.imageURL ? (
                        <img
                          src={listing.imageURL}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                          </svg>
                        </div>
                      )}
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

                  {/* Compact Actions */}
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-center gap-1">
                      <Link
                        to={`/roommates-details/${listing._id}`}
                        className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-100 transition-colors"
                        title="View Details"
                      >
                        <FaEye className="w-3 h-3" />
                      </Link>
                      <Link
                        to={`/update-listing/${listing._id}`}
                        className="text-[#3289c9] hover:text-[#2778b5] p-1 rounded hover:bg-blue-50 transition-colors"
                        title="Edit"
                      >
                        <FaEdit className="w-3 h-3" />
                      </Link>
                      <button
                        onClick={() => handleDelete(listing._id)}
                        className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <FaTrash className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardMyListing;
