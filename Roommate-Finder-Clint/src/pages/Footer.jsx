import { Link } from "react-router";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-white via-gray-50 to-gray-100 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-10">
          {/* Brand and Contact Info */}
          <div className="space-y-3">
            <Link to="/" className="text-2xl font-bold text-[#3289c9]">
              RoommateFinder
            </Link>
            <div className="space-y-2">
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
          <div>
            <h3 className="footer-title">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/browse"
                  className="hover:text-[#3289c9] transition-colors"
                >
                  Browse Listings
                </Link>
              </li>
              <li>
                <Link
                  to="/add-roommate"
                  className="hover:text-[#3289c9] transition-colors"
                >
                  Add Listing
                </Link>
              </li>
              <li>
                <Link
                  to="/my-listings"
                  className="hover:text-[#3289c9] transition-colors"
                >
                  My Listings
                </Link>
              </li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h3 className="footer-title">Terms & Conditions</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms"
                  className="hover:text-[#3289c9] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="hover:text-[#3289c9] transition-colors"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
          {/* Social Links */}
          <div>
            <h3 className="footer-title">Connect With Us</h3>
            <div className="flex gap-4 mb-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-base-100 flex items-center justify-center hover:bg-[#3289c9] hover:text-white transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-base-100 flex items-center justify-center hover:bg-[#3289c9] hover:text-white transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-base-100 flex items-center justify-center hover:bg-[#3289c9] hover:text-white transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-base-100 flex items-center justify-center hover:bg-[#3289c9] hover:text-white transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
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
