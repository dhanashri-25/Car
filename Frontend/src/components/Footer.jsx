// components/Footer.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  TruckIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const [showContactOptions, setShowContactOptions] = useState(false);

  const phoneNumber = "917499454264";
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    "Hello, I want to inquire about car parts."
  )}`;
  const callURL = `tel:+${phoneNumber}`;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <TruckIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">CarParts Pro</span>
                <span className="text-xs text-blue-400 block leading-none">
                  प्रो
                </span>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              भारत का सबसे भरोसेमंद कार पार्ट्स मार्केटप्लेस। गुणवत्ता की गारंटी
              के साथ सभी प्रकार के कार पार्ट्स उपलब्ध हैं।
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.624 5.367 11.99 11.988 11.99s11.99-5.366 11.99-11.99C24.007 5.367 18.641.001 12.017.001zm6.624 18.611c-.862.862-1.956 1.299-3.094 1.299h-7.058c-1.138 0-2.232-.437-3.094-1.299-.862-.862-1.299-1.956-1.299-3.094V8.483c0-1.138.437-2.232 1.299-3.094.862-.862 1.956-1.299 3.094-1.299h7.058c1.138 0 2.232.437 3.094 1.299.862.862 1.299 1.956 1.299 3.094v7.034c0 1.138-.437 2.232-1.299 3.094z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/cars"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  All Cars
                </Link>
              </li>
              <li>
                <Link
                  to="/become-seller"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Become Seller
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setShowContactOptions(!showContactOptions)}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Contact Us
                </button>
                {showContactOptions && (
                  <div className="mt-2 ml-4 space-y-2">
                    <a
                      href={whatsappURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
                    >
                      <FaWhatsapp className="h-4 w-4" />
                      Chat on WhatsApp
                    </a>
                    <a
                      href={callURL}
                      className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <PhoneIcon className="h-4 w-4" />
                      Make a Call
                    </a>
                  </div>
                )}
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="relative">
                <button
                  onClick={() => setShowContactOptions(!showContactOptions)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors w-full text-left"
                >
                  <PhoneIcon className="h-5 w-5 text-blue-400" />
                  <span>+91 74994 54264</span>
                </button>
                {showContactOptions && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                    <a
                      href={whatsappURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-green-400 hover:text-green-300 hover:bg-gray-700 rounded-t-lg transition-colors"
                    >
                      <FaWhatsapp className="h-4 w-4" />
                      Chat on WhatsApp
                    </a>
                    <a
                      href={callURL}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-blue-400 hover:text-blue-300 hover:bg-gray-700 rounded-b-lg transition-colors"
                    >
                      <PhoneIcon className="h-4 w-4" />
                      Make a Call
                    </a>
                  </div>
                )}
              </li>
              <li className="flex items-center space-x-2">
                <EnvelopeIcon className="h-5 w-5 text-blue-400" />
                <a
                  href="mailto:info@carpartspro.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  info@carpartspro.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPinIcon className="h-5 w-5 text-blue-400 mt-0.5" />
                <span className="text-gray-300">
                  123 Auto Street
                  <br />
                  Mumbai, Maharashtra 400001
                </span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 CarParts Pro. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              to="/privacy"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
