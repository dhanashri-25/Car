// components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  TruckIcon,
  PhoneIcon,
  UserPlusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { FaWhatsapp } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContactOptions, setShowContactOptions] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Cars", href: "/cars", icon: TruckIcon },
    { name: "Contact", href: "#", icon: PhoneIcon }, // handled manually
    { name: "Become Seller", href: "/become-seller", icon: UserPlusIcon },
  ];

  const isActive = (path) => location.pathname === path;

  const phoneNumber = "917499454264";
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    "Hello, I want to inquire about car parts."
  )}`;
  const callURL = `tel:+${phoneNumber}`;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <TruckIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">
                  CarParts
                </span>
                <span className="text-xs text-blue-600 block leading-none">
                  प्रो
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8 relative">
              {navigation.map((item) => {
                const Icon = item.icon;
                const commonClasses = `flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`;

                if (item.name === "Contact") {
                  return (
                    <div key={item.name} className="relative">
                      <button
                        onClick={() =>
                          setShowContactOptions(!showContactOptions)
                        }
                        className={commonClasses}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </button>

                      {showContactOptions && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                          <a
                            href={whatsappURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-green-600 hover:bg-gray-50"
                          >
                            <FaWhatsapp className="h-4 w-4" />
                            Chat on WhatsApp
                          </a>
                          <a
                            href={callURL}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-gray-50"
                          >
                            <PhoneIcon className="h-4 w-4" />
                            Make a Call
                          </a>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={commonClasses}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search cars..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            {navigation.map((item) => {
              const Icon = item.icon;
              const commonClasses = `flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive(item.href)
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`;

              if (item.name === "Contact") {
                return (
                  <div key={item.name}>
                    <button
                      onClick={() => setShowContactOptions(!showContactOptions)}
                      className={commonClasses}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </button>

                    {showContactOptions && (
                      <div className="ml-6 mt-2 bg-white border border-gray-200 rounded-lg shadow-md">
                        <a
                          href={whatsappURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-green-600 hover:bg-gray-50"
                        >
                          <FaWhatsapp className="h-4 w-4" />
                          Chat on WhatsApp
                        </a>
                        <a
                          href={callURL}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-gray-50"
                        >
                          <PhoneIcon className="h-4 w-4" />
                          Make a Call
                        </a>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={commonClasses}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
