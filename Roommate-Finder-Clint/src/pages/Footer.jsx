import { Link } from "react-router";
import {
  FaFacebook,
  FaLinkedin,
  FaGithub,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import logo from "../assets/roommateLogo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-white via-gray-50 to-gray-100 w-full border-t border-gray-200 mt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-10 justify-between items-start">
          {/* Brand and Contact Info */}
          <div className="space-y-3 flex flex-col  justify-start">
            <Link to="/" className="flex items-center gap-2 mb-2">
              <img
                src={logo}
                alt="RoommateFinder Logo"
                className="w-10 h-10 rounded-full border-2 border-[#3289c9] bg-white shadow"
              />
              <span className="text-2xl font-bold text-[#3289c9]">
                RoommateFinder
              </span>
            </Link>
            <div className="space-y-2 text-gray-600 text-sm">
              <p className="flex items-center gap-2">
                <FaPhone className="text-[#3289c9]" />
                <span>+880 1234-567890</span>
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-[#3289c9]" />
                <span>support@roommatefinder.com</span>
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#3289c9]" />
                <span>123 Living Street, Dhaka, Bangladesh</span>
              </p>
            </div>
          </div>
          {/* Quick Links */}
          <div className="justify-center flex">
            <div>
              <h3 className="footer-title mb-2 text-[#3289c9]">Quick Links</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>
                  <Link
                    to="/"
                    className="hover:text-[#3289c9] transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/add"
                    className="hover:text-[#3289c9] transition-colors"
                  >
                    Add Listing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="hover:text-[#3289c9] transition-colors"
                  >
                    Browse Listing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-[#3289c9] transition-colors"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Social Links */}
          <div className="flex  justify-end">
            <div>
              <h3 className="footer-title mb-2 text-[#3289c9]">
                Connect With Us
              </h3>
              <div className="flex gap-4 mb-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-base-100 flex items-center justify-center hover:bg-[#3289c9] hover:text-white transition-colors border border-gray-200"
                >
                  <FaFacebook size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-base-100 flex items-center justify-center hover:bg-[#3289c9] hover:text-white transition-colors border border-gray-200"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-base-100 flex items-center justify-center hover:bg-[#3289c9] hover:text-white transition-colors border border-gray-200"
                >
                  <FaGithub size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="py-4 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Copyright © {currentYear} RoommateFinder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
