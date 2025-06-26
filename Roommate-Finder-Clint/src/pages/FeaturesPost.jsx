import { Link } from "react-router";
import { FaMapMarkerAlt, FaRegClock, FaUserFriends } from "react-icons/fa";
import { BsGenderAmbiguous } from "react-icons/bs";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useEffect, useState } from "react";
import { useTheme } from "../hooks/use-theme";

const FeaturesPost = () => {
  const [features, setFeatures] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    fetch("https://roommate-finder-server-kappa.vercel.app/available-roommates")
      .then((res) => res.json())
      .then((data) => setFeatures(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-3 ${
            theme === "dark" ? "text-white" : ""
          }`}
        >
          Featured Available Roommates
        </h2>
        <p
          className={`${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Find your perfect roommate match from our featured listings
        </p>
      </div>{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((post) => (
          <div
            key={post._id}
            className={`${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
            } rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300`}
          >
            {/* Content */}
            <div className="p-5 space-y-4">
              <h3 className="text-xl font-semibold">{post.title}</h3>

              <div
                className={`space-y-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#3289c9]" />
                  {post.location}
                </p>
                <p className="flex items-center gap-2">
                  <MdOutlineAttachMoney className="text-[#3289c9]" />$
                  {post.rentAmount}/month
                </p>
                <p className="flex items-center gap-2">
                  <FaRegClock className="text-[#3289c9]" />
                  {post.roomType}
                </p>
                <p className="flex items-center gap-2">
                  <FaUserFriends className="text-[#3289c9]" />
                  Contact: {post.contactInfo}
                </p>
              </div>

              <p
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                } line-clamp-2`}
              >
                {post.description}
              </p>

              <div className="flex justify-between items-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    post.availability
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {post.availability ? "Available" : "Not Available"}
                </span>
                <Link
                  to={`/roommates-details/${post._id}`}
                  className="text-[#3289c9] hover:text-[#2778b5] font-semibold"
                >
                  See Details →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesPost;
