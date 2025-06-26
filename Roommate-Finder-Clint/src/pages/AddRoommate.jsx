import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import Swal from "sweetalert2";

const AddRoommate = () => {
  const { user } = useContext(AuthContext);

  const handleAddRoom = (e) => {
    e.preventDefault();

    // Get form data
    const form = e.target;
    const formData = new FormData(form);
    const newRoommate = Object.fromEntries(formData.entries());
    console.log(newRoommate);

    fetch("http://localhost:3000/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newRoommate),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Listing Added!",
            text: "Your roommate listing has been created successfully",
            timer: 1500,
            showConfirmButton: false,
            position: "top-end",
            toast: true,
          });
        }
      });

    // Reset form
    form.reset();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Add New Listing
      </h2>

      <form onSubmit={handleAddRoom} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            required
            placeholder="e.g., Looking for a roommate in NYC"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#3289c9] focus:border-[#3289c9]"
          />
        </div>

        {/* Location and Rent (2 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              required
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
                className="rounded text-[#3289c9] focus:ring-[#3289c9]"
              />
              <span>Pet Friendly</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="lifestyle.smoking"
                className="rounded text-[#3289c9] focus:ring-[#3289c9]"
              />
              <span>Smoking Allowed</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="lifestyle.nightOwl"
                className="rounded text-[#3289c9] focus:ring-[#3289c9]"
              />
              <span>Night Owl</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="lifestyle.earlyBird"
                className="rounded text-[#3289c9] focus:ring-[#3289c9]"
              />
              <span>Early Bird</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="lifestyle.drinking"
                className="rounded text-[#3289c9] focus:ring-[#3289c9]"
              />
              <span>Drinking Allowed</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="lifestyle.visitors"
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
            rows="4"
            placeholder="Describe the room and your preferences..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#3289c9] focus:border-[#3289c9]"
          ></textarea>
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
              className="rounded text-[#3289c9] focus:ring-[#3289c9]"
            />
            <span>Currently Available</span>
          </label>
        </div>

        {/* User Info (Read Only) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {" "}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              readOnly
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              name="userName"
              value={user.displayName}
              readOnly
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#3289c9] hover:bg-[#2778b5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3289c9]"
          >
            Add Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRoommate;
