// components/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRightIcon,
  StarIcon,
  ShieldCheckIcon,
  TruckIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedCars();
  }, []);

  const fetchFeaturedCars = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cars/featured");
      const data = await response.json();
      console.log(data.data);
      if (data.success) {
        setFeaturedCars(data.data);
      }
    } catch (error) {
      console.error("Error fetching featured cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const services = [
    {
      icon: <ShieldCheckIcon className="h-12 w-12 text-blue-600" />,
      title: "Quality Assured",
      description:
        "सभी पार्ट्स की गुणवत्ता की गारंटी। हमारे सभी उत्पाद उच्च गुणवत्ता के साथ आते हैं।",
    },
    {
      icon: <TruckIcon className="h-12 w-12 text-green-600" />,
      title: "Fast Delivery",
      description:
        "तेज़ डिलीवरी सेवा। आपके ऑर्डर को जल्दी और सुरक्षित रूप से पहुंचाते हैं।",
    },
    {
      icon: <PhoneIcon className="h-12 w-12 text-purple-600" />,
      title: "24/7 Support",
      description:
        "24/7 ग्राहक सहायता। किसी भी समस्या के लिए हमारी टीम उपलब्ध है।",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block">Premium Car Parts</span>
              <span className="block text-blue-300">
                सबसे बेहतरीन कार पार्ट्स
              </span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Find authentic car parts for all major brands. Quality guaranteed,
              fast delivery, and expert support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/cars"
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-lg"
              >
                Browse All Cars
                <ChevronRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/become-seller"
                className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-lg"
              >
                Become a Seller
                <ChevronRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              हमारी सेवाएं आपको सबसे अच्छा अनुभव प्रदान करती हैं
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Cars
            </h2>
            <p className="text-lg text-gray-600">
              नवीनतम कार पार्ट्स के साथ फीचर्ड कारें
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="h-4 w-4 bg-gray-300 rounded mr-1"
                        ></div>
                      ))}
                    </div>
                    <div className="h-5 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="flex gap-2 mb-4">
                      <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
                      <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
                      <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="h-12 bg-gray-300 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredCars.length > 0 ? (
            /* Loaded Cars */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCars.map((car) => (
                <div
                  key={car._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.carName}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-medium">
                      {car.year}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <StarIcon className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <StarIcon className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <StarIcon className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <StarIcon className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <StarIcon className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-2 text-sm text-gray-600">(4.9)</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {car.carName}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {car.brand} {car.model} • {car.year}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Object.keys(car.availablePartsCategories || {})
                        .filter((key) => car.availablePartsCategories[key]) // show only 'true' categories
                        .slice(0, 3)
                        .map((category, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full capitalize"
                          >
                            {category.replace(/([A-Z])/g, " $1")}{" "}
                            {/* Makes “engineParts” → “engine Parts” */}
                          </span>
                        ))}

                      {Object.keys(car.availablePartsCategories || {}).filter(
                        (key) => car.availablePartsCategories[key]
                      ).length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                          +
                          {Object.keys(
                            car.availablePartsCategories || {}
                          ).filter((key) => car.availablePartsCategories[key])
                            .length - 3}{" "}
                          more
                        </span>
                      )}
                    </div>

                    <Link
                      to={`/car/${car._id}`}
                      className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
                <TruckIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Featured Cars Available
                </h3>
                <p className="text-gray-600 mb-4">
                  कोई फीचर्ड कारें उपलब्ध नहीं हैं
                </p>
                <Link
                  to="/become-seller"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Be the First Seller
                  <ChevronRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          )}

          {/* Explore All Cars Button - Only show when cars are loaded */}
          {!loading && featuredCars.length > 0 && (
            <div className="text-center mt-12">
              <Link
                to="/cars"
                className="inline-flex items-center px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg"
              >
                Explore All Cars
                <ChevronRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Sell Your Car Parts?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            अपने कार पार्ट्स बेचना चाहते हैं? आज ही शुरू करें!
          </p>
          <Link
            to="/become-seller"
            className="inline-flex items-center px-8 py-4 bg-white text-green-600 hover:bg-gray-100 font-semibold text-lg rounded-lg transition-colors duration-200 shadow-lg"
          >
            Start Selling Today
            <ChevronRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
