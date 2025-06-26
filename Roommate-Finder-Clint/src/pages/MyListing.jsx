import React, { useState } from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const MyListing = () => {
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
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">No Listings Found</h2>
        <p className="text-gray-600 mb-4">
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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        My Listings
      </h2>

      <div className="w-11/12 mx-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rent/Month
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {myListings.map((listing) => (
              <tr key={listing._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {listing.title}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {listing.location}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    ${listing.rentAmount}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      listing.availability
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {listing.availability ? "Available" : "Not Available"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <Link
                      to={`/update-listing/${listing._id}`}
                      className="text-[#3289c9] hover:text-[#2778b5] transition-colors"
                    >
                      <FaEdit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(listing._id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyListing;
