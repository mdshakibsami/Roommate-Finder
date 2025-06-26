import React from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle,
  FaShieldAlt,
  FaHandshake,
  FaHome,
} from "react-icons/fa";
import { useTheme } from "../hooks/use-theme";

const SafetyTips = () => {
  const { theme } = useTheme();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1
          className={`text-4xl font-bold mb-4 ${
            theme === "dark" ? "text-white" : ""
          }`}
        >
          Roommate Safety Guidelines
        </h1>
        <p
          className={`text-lg ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Stay safe and make informed decisions while finding your perfect
          roommate
        </p>
      </div>

      {/* Meeting Questions Section */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <FaQuestionCircle className="text-3xl text-[#3289c9]" />
          <h2
            className={`text-2xl font-semibold ${
              theme === "dark" ? "text-white" : ""
            }`}
          >
            Essential Questions for Potential Roommates
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Lifestyle */}
          <div
            className={`${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } p-6 rounded-lg shadow-md`}
          >
            <h3
              className={`text-xl font-semibold mb-4 ${
                theme === "dark" ? "text-white" : ""
              }`}
            >
              Lifestyle Questions
            </h3>
            <ul
              className={`space-y-3 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <li>• What's your typical daily schedule?</li>
              <li>• How do you feel about guests/overnight visitors?</li>
              <li>• Do you smoke or have any pets?</li>
              <li>• What are your cleaning habits?</li>
              <li>• How do you prefer to split household chores?</li>
            </ul>
          </div>
          {/* Financial */}
          <div
            className={`${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } p-6 rounded-lg shadow-md`}
          >
            <h3
              className={`text-xl font-semibold mb-4 ${
                theme === "dark" ? "text-white" : ""
              }`}
            >
              Financial Questions
            </h3>
            <ul
              className={`space-y-3 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <li>• What's your current employment status?</li>
              <li>• How do you prefer to handle shared expenses?</li>
              <li>• Can you provide proof of income?</li>
              <li>• What's your plan for security deposit?</li>
              <li>• How would you handle late payments?</li>
            </ul>
          </div>
          {/* Personal */}
          <div
            className={`${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } p-6 rounded-lg shadow-md`}
          >
            <h3
              className={`text-xl font-semibold mb-4 ${
                theme === "dark" ? "text-white" : ""
              }`}
            >
              Personal Compatibility
            </h3>
            <ul
              className={`space-y-3 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <li>• What are your hobbies and interests?</li>
              <li>• How do you feel about shared spaces?</li>
              <li>• What's your preferred thermostat setting?</li>
              <li>• How do you handle conflicts?</li>
              <li>• What are your expectations for quiet hours?</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Do's and Don'ts Section */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <FaHome className="text-3xl text-[#3289c9]" />
          <h2
            className={`text-2xl font-semibold ${
              theme === "dark" ? "text-white" : ""
            }`}
          >
            Room Tour Guidelines
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Do's */}
          <div
            className={`${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } p-6 rounded-lg shadow-md`}
          >
            <div className="flex items-center gap-2 mb-4">
              <FaCheckCircle className="text-green-500 text-xl" />
              <h3
                className={`text-xl font-semibold ${
                  theme === "dark" ? "text-white" : ""
                }`}
              >
                Do's
              </h3>
            </div>
            <ul
              className={`space-y-3 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Schedule viewings during daylight hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Bring a friend or family member</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Check all facilities and amenities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Take photos with permission</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Ask about security measures</span>
              </li>
            </ul>
          </div>
          {/* Don'ts */}
          <div
            className={`${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } p-6 rounded-lg shadow-md`}
          >
            <div className="flex items-center gap-2 mb-4">
              <FaTimesCircle className="text-red-500 text-xl" />
              <h3
                className={`text-xl font-semibold ${
                  theme === "dark" ? "text-white" : ""
                }`}
              >
                Don'ts
              </h3>
            </div>
            <ul
              className={`space-y-3 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                <span>Don't go alone to late-night viewings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                <span>Don't share personal financial information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                <span>Don't pay cash without proper documentation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                <span>Don't ignore red flags or suspicious behavior</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">✗</span>
                <span>
                  Don't rush into decisions without proper verification
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Safety Checklist */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <FaShieldAlt className="text-3xl text-[#3289c9]" />
          <h2 className="text-2xl font-semibold">
            Offline Meeting Safety Checklist
          </h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Before Meeting</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <FaHandshake className="text-[#3289c9]" />
                  <span>Verify their identity through social media</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaHandshake className="text-[#3289c9]" />
                  <span>Share meeting details with a trusted friend</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaHandshake className="text-[#3289c9]" />
                  <span>Choose a public meeting place</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">During Meeting</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <FaHandshake className="text-[#3289c9]" />
                  <span>Keep emergency contacts readily available</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaHandshake className="text-[#3289c9]" />
                  <span>Trust your instincts</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaHandshake className="text-[#3289c9]" />
                  <span>Maintain awareness of surroundings</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyTips;
