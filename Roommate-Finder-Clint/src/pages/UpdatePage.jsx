import React, { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../contexts/auth";
import Swal from "sweetalert2";

const UpdatePage = () => {
  const singleRoommate = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleUpdate = (e) => {
    e.preventDefault();

    // Get form data
    const form = e.target;
    const formData = new FormData(form);
    const updatedRoommate = Object.fromEntries(formData.entries());

    // Handle checkbox fields explicitly
    updatedRoommate.availability = form.availability.checked;

    // Add user info
    updatedRoommate.userName = user?.displayName;
    updatedRoommate.userEmail = user?.email;
    fetch(`http://localhost:3000/update-listing/${singleRoommate._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedRoommate),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Updated Successfully!",
            text: "Your listing has been updated.",
            timer: 1500,
            showConfirmButton: false,
            position: "top-end",
            toast: true,
          });
          navigate(`/my-listings/${user.email}`);
        } else {
          Swal.fire({
            icon: "warning",
            title: "No Changes Made",
            text: "No changes were detected in your listing.",
            timer: 2000,
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
          title: "Update Failed",
          text: "There was an error updating your listing. Please try again.",
          showConfirmButton: true,
          position: "center",
        });
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Update Listing
      </h2>

      <form onSubmit={handleUpdate} className="space-y-6">
        {/* User Info - Read Only */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              name="userName"
              value={user?.displayName}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Email
            </label>
            <input
              type="email"
              name="userEmail"
              value={user?.email}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            required
            defaultValue={singleRoommate.title}
            placeholder="e.g., Looking for a roommate in NYC"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#3289c9] focus:border-[#3289c9]"
          />
        </div>

        {/* Location and Rent */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              required
              defaultValue={singleRoommate.location}
              placeholder="City, Area"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#3289c9] focus:border-[#3289c9]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rent Amount
            </label>
            <input
              type="number"
              name="rentAmount"
              required
              defaultValue={singleRoommate.rentAmount}
              placeholder="Monthly rent in $"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#3289c9] focus:border-[#3289c9]"
            />
          </div>
        </div>

        {/* Room Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Room Type
          </label>
          <select
            name="roomType"
            defaultValue={singleRoommate.roomType}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#3289c9] focus:border-[#3289c9]"
          >
            <option value="Single">Single Room</option>
            <option value="Shared">Shared Room</option>
            <option value="Master">Master Bedroom</option>
            <option value="Studio">Studio Apartment</option>
          </select>
        </div>

        {/* Lifestyle Preferences */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Lifestyle Preferences
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="lifestyle.pets"
                defaultChecked={singleRoommate.lifestyle?.pets}
                className="rounded text-[#3289c9] focus:ring-[#3289c9]"
              />
              <span>Pet Friendly</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="lifestyle.smoking"
                defaultChecked={singleRoommate.lifestyle?.smoking}
                className="rounded text-[#3289c9] focus:ring-[#3289c9]"
              />
              <span>Smoking Allowed</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="lifestyle.nightOwl"
                defaultChecked={singleRoommate.lifestyle?.nightOwl}
                className="rounded text-[#3289c9] focus:ring-[#3289c9]"
              />
              <span>Night Owl</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="lifestyle.earlyBird"
                defaultChecked={singleRoommate.lifestyle?.earlyBird}
                className="rounded text-[#3289c9] focus:ring-[#3289c9]"
              />
              <span>Early Bird</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="lifestyle.drinking"
                defaultChecked={singleRoommate.lifestyle?.drinking}
                className="rounded text-[#3289c9] focus:ring-[#3289c9]"
              />
              <span>Drinking Allowed</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="lifestyle.visitors"
                defaultChecked={singleRoommate.lifestyle?.visitors}
                className="rounded text-[#3289c9] focus:ring-[#3289c9]"
              />
              <span>Visitors Allowed</span>
            </label>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            required
            defaultValue={singleRoommate.description}
            rows="4"
            placeholder="Describe the room and your preferences..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#3289c9] focus:border-[#3289c9]"
          ></textarea>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL
          </label>
          <input
            type="url"
            name="imageURL"
            defaultValue={singleRoommate.imageURL}
            placeholder="Enter image URL for your listing"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#3289c9] focus:border-[#3289c9]"
          />
          <p className="text-sm text-gray-500 mt-1">
            Provide a URL to an image that represents your listing
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="number"
            name="contactInfo"
            required
            defaultValue={singleRoommate.contactInfo}
            placeholder="Phone number or preferred contact method"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#3289c9] focus:border-[#3289c9]"
          />
        </div>

        {/* Availability */}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="availability"
              defaultChecked={singleRoommate.availability}
              className="rounded text-[#3289c9] focus:ring-[#3289c9]"
            />
            <span>Currently Available</span>
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-[#3289c9] text-white py-2 px-4 rounded-lg hover:bg-[#2778b5] transition-colors"
          >
            Update Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePage;
