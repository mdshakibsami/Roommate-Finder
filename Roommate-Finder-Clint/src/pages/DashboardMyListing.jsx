import React, { useState } from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useTheme } from "../hooks/use-theme";
import Swal from "sweetalert2";

const DashboardMyListing = () => {
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
      <div className="w-full px-2 py-4">
        <div className={`text-center py-12 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>No Listings Found</h2>
          <p className={`mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
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
        <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>My Listings</h2>
        <Link
          to="/add"
          className="bg-[#3289c9] text-white px-4 py-2 rounded-lg hover:bg-[#2778b5] transition-colors duration-200 inline-flex items-center gap-2 text-sm"
        >
          <FaEdit className="text-sm" />
          Add New Listing
        </Link>
      </div>

      {/* Compact Table Format */}
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {myListings.map((listing) => (
                <tr key={listing._id} className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
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

                  {/* Compact Actions */}
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-center gap-1">
                      <Link
                        to={`/roommates-details/${listing._id}`}
                        className={`p-1 rounded transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                        title="View Details"
                      >
                        <FaEye className="w-3 h-3" />
                      </Link>
                      <Link
                        to={`/update-listing/${listing._id}`}
                        className={`text-[#3289c9] hover:text-[#2778b5] p-1 rounded transition-colors ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-blue-50'}`}
                        title="Edit"
                      >
                        <FaEdit className="w-3 h-3" />
                      </Link>
                      <button
                        onClick={() => handleDelete(listing._id)}
                        className={`text-red-600 hover:text-red-800 p-1 rounded transition-colors ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-red-50'}`}
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
