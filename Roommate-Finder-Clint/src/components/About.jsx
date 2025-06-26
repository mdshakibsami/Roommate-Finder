import React from "react";
import {
  FaUserFriends,
  FaSearch,
  FaMobileAlt,
  FaRegLightbulb,
  FaLock,
} from "react-icons/fa";
import { useTheme } from "../hooks/use-theme";
import bannerImg from "../assets/roommateLogo.png";

const About = () => {
  const { theme } = useTheme();
  
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 text-center">
      {/* Banner Section */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={bannerImg}
          alt="RoommateFinder Banner"
          className="w-24 h-24 mb-4 rounded-full shadow-lg border-4 border-[#3289c9] bg-white object-cover"
        />
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-[#3289c9]">
          About RoommateFinder
        </h1>
        <p className={`text-lg max-w-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          RoommateFinder is a platform designed to make finding and sharing
          living spaces easy, safe, and convenient. Whether you're looking for a
          roommate or want to list your available room, our website connects you
          with like-minded individuals in your area.
        </p>
      </div>
      {/* What We Offer Section */}
      <div className="mb-8">
        <h2 className={`text-xl font-semibold mb-4 flex items-center justify-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          <FaRegLightbulb className="text-[#3289c9] text-2xl" /> What We Offer
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none max-w-xl mx-auto">
          <li className={`flex items-center gap-3 rounded-lg shadow p-4 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
            <FaSearch className="text-[#3289c9] text-xl" />
            <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}>Browse and search available roommate listings</span>
          </li>
          <li className={`flex items-center gap-3 rounded-lg shadow p-4 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
            <FaUserFriends className="text-[#3289c9] text-xl" />
            <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}>Add your own room or roommate listing</span>
          </li>
          <li className={`flex items-center gap-3 rounded-lg shadow p-4 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
            <FaMobileAlt className="text-[#3289c9] text-xl" />
            <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}>Modern, responsive design for all devices</span>
          </li>
          <li className={`flex items-center gap-3 rounded-lg shadow p-4 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
            <FaLock className="text-[#3289c9] text-xl" />
            <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}>Secure authentication with Firebase</span>
          </li>
        </ul>
      </div>
      {/* Mission Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-[#3289c9]">
          Our Mission
        </h2>
        <p className={`max-w-xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Our mission is to simplify the process of finding a compatible
          roommate and to help you feel at home, wherever you are. We believe
          everyone deserves a safe and comfortable living environment.
        </p>
      </div>
      {/* Contact Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2 text-[#3289c9]">Contact</h2>
        <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
          For questions, feedback, or support, please contact us at{" "}
          <a
            href="mailto:support@roommatefinder.com"
            className="text-[#3289c9] underline hover:text-[#2778b5] transition-colors"
          >
            support@roommatefinder.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default About;
