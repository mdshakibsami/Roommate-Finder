import { Link } from "react-router";
import { FaMapMarkerAlt, FaRegClock, FaUserFriends } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useEffect, useState } from "react";
import { useTheme } from "../hooks/use-theme";

const FeaturesPost = () => {
  const [features, setFeatures] = useState([]);

  const { theme } = useTheme();

  useEffect(() => {
    fetch("https://roommate-finder-server-kappa.vercel.app/available-roommates")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        return setFeatures(data);
      });
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
          className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
        >
          Find your perfect roommate match from our featured listings
        </p>
      </div>{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((post) => (
          <div
            key={post._id}
            className={`${
              theme === "dark"
                ? "bg-gray-800 text-white border border-gray-700"
                : "bg-white border border-gray-200"
            } rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 flex flex-col group`}
            style={{ minHeight: 340 }}
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-40 object-cover rounded-t-2xl border-b border-gray-100 group-hover:brightness-95 transition-all duration-300"
            />
            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-[#3289c9] transition-colors duration-200">
                {post.title}
              </h3>
              <div
                className={`space-y-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <p className="flex items-center gap-2 text-base">
                  <FaMapMarkerAlt className="text-[#3289c9]" />
                  {post.location}
                </p>
                <p className="flex items-center gap-2 text-base">
                  <MdOutlineAttachMoney className="text-[#3289c9]" />$
                  {post.rentAmount}/month
                </p>
              </div>
              <div className="flex justify-between items-center mt-8">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                    post.availability
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {post.availability ? "Available" : "Not Available"}
                </span>
                <Link
                  to={`/roommates-details/${post._id}`}
                  className="text-[#3289c9] hover:text-[#2778b5] font-semibold text-sm border border-[#3289c9] px-3 py-1 rounded-full transition-colors duration-200"
                >
                  See Details
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
