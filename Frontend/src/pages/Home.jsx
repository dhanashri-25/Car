// components/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRightIcon,
  StarIcon,
  ShieldCheckIcon,
  TruckIcon,
  PhoneIcon,
  SparklesIcon,
  ClockIcon,
  CurrencyRupeeIcon,
  UserGroupIcon,
  CheckBadgeIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    fetchFeaturedCars();
    const timer = setTimeout(() => setStatsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const fetchFeaturedCars = async () => {
    try {
      const response = await fetch(
        "https://car-tt1u.onrender.com/api/cars/featured"
      );
      const data = await response.json();
      if (data.success) {
        setFeaturedCars(data.data);
      }
    } catch (error) {
      console.error("Error fetching featured cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: "Happy Customers", value: "10,000+", icon: UserGroupIcon },
    { label: "Parts Available", value: "50,000+", icon: SparklesIcon },
    { label: "Years Experience", value: "15+", icon: ClockIcon },
    { label: "Verified Sellers", value: "500+", icon: CheckBadgeIcon },
  ];

  const services = [
    {
      icon: <ShieldCheckIcon className="h-12 w-12 text-blue-600" />,
      title: "Quality Assured",
      description:
        "सभी पार्ट्स की गुणवत्ता की गारंटी। हमारे सभी उत्पाद उच्च गुणवत्ता के साथ आते हैं।",
      features: ["100% Genuine Parts", "Warranty Included", "Quality Tested"],
    },
    {
      icon: <TruckIcon className="h-12 w-12 text-green-600" />,
      title: "Fast Delivery",
      description:
        "तेज़ डिलीवरी सेवा। आपके ऑर्डर को जल्दी और सुरक्षित रूप से पहुंचाते हैं।",
      features: ["Same Day Dispatch", "Track Your Order", "Safe Packaging"],
    },
    {
      icon: <PhoneIcon className="h-12 w-12 text-purple-600" />,
      title: "24/7 Support",
      description:
        "24/7 ग्राहक सहायता। किसी भी समस्या के लिए हमारी टीम उपलब्ध है।",
      features: ["Live Chat Support", "Expert Guidance", "Quick Response"],
    },
  ];

  const benefits = [
    { icon: CurrencyRupeeIcon, text: "Best Prices Guaranteed" },
    { icon: CheckBadgeIcon, text: "Verified Products" },
    { icon: TruckIcon, text: "Free Shipping on Orders ₹999+" },
    { icon: ArrowTrendingUpIcon, text: "Easy Returns & Refunds" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Enhanced Hero Section with Car Image */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 z-10">
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/30 backdrop-blur-sm rounded-full border border-blue-400/50">
                <SparklesIcon className="h-5 w-5 mr-2 text-yellow-300" />
                <span className="text-sm font-medium">
                  India's #1 Car Parts Platform
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
                <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Premium Car Parts
                </span>
                <span className="block text-4xl sm:text-5xl lg:text-6xl mt-2 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                  सबसे बेहतरीन कार पार्ट्स
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-blue-100 leading-relaxed max-w-2xl">
                Find authentic car parts for all major brands. Quality
                guaranteed, fast delivery, and expert support.
                <span className="block mt-2 text-lg text-blue-200">
                  हर गाड़ी के लिए असली पार्ट्स, गारंटी के साथ
                </span>
              </p>

              {/* Benefits List */}
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-blue-100"
                  >
                    <benefit.icon className="h-5 w-5 text-green-400" />
                    <span className="text-sm font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/cars"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 hover:scale-105"
                >
                  Browse All Cars
                  <ChevronRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/become-seller"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-green-500/50 hover:scale-105"
                >
                  Become a Seller
                  <ChevronRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Side - Car Image */}
            <div className="relative lg:block hidden">
              <div className="relative z-10">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-purple-500/30 rounded-3xl blur-2xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80"
                  alt="Premium Car"
                  className="relative rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 z-20 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 animate-float">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <CheckBadgeIcon className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">100%</p>
                    <p className="text-sm text-gray-600">Genuine Parts</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute -top-6 -right-6 z-20 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 animate-float"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <TruckIcon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">24hr</p>
                    <p className="text-sm text-gray-600">Fast Delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 relative z-10">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 transition-all duration-500 hover:bg-white/20 hover:scale-105 ${
                  statsVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <stat.icon className="h-8 w-8 text-blue-300 mb-3" />
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-blue-200 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-16 fill-white"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-4">
              <SparklesIcon className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm font-semibold text-blue-600">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Our Premium Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              हमारी सेवाएं आपको सबसे अच्छा अनुभव प्रदान करती हैं
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 text-center">
                    {service.description}
                  </p>

                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-sm text-gray-700"
                      >
                        <CheckBadgeIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
              <StarIcon className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm font-semibold text-blue-600">
                Popular Picks
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Featured Cars
            </h2>
            <p className="text-xl text-gray-600">
              नवीनतम कार पार्ट्स के साथ फीचर्ड कारें
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse"
                >
                  <div className="h-56 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="h-4 w-4 bg-gray-300 rounded mr-1"
                        ></div>
                      ))}
                    </div>
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="flex gap-2 mb-4">
                      <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
                      <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="h-12 bg-gray-300 rounded-xl"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCars.map((car) => (
                <div
                  key={car._id}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.carName}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      {car.year}
                    </div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
                      Featured
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                      <span className="ml-2 text-sm font-semibold text-gray-600">
                        (4.9)
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {car.carName}
                    </h3>
                    <p className="text-gray-600 mb-4 font-medium">
                      {car.brand} {car.model} • {car.year}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {Object.keys(car.availablePartsCategories || {})
                        .filter((key) => car.availablePartsCategories[key])
                        .slice(0, 3)
                        .map((category, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 text-xs font-semibold rounded-full capitalize border border-blue-200"
                          >
                            {category.replace(/([A-Z])/g, " $1")}
                          </span>
                        ))}

                      {Object.keys(car.availablePartsCategories || {}).filter(
                        (key) => car.availablePartsCategories[key]
                      ).length > 3 && (
                        <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full border border-gray-200">
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
                      className="group/button block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <span className="flex items-center justify-center">
                        View Details
                        <ChevronRightIcon className="ml-2 h-5 w-5 group-hover/button:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-12 max-w-md mx-auto border-2 border-gray-100">
                <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <TruckIcon className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  No Featured Cars Available
                </h3>
                <p className="text-gray-600 mb-6">
                  कोई फीचर्ड कारें उपलब्ध नहीं हैं
                </p>
                <Link
                  to="/become-seller"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Be the First Seller
                  <ChevronRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          )}

          {!loading && featuredCars.length > 0 && (
            <div className="text-center mt-16">
              <Link
                to="/cars"
                className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-2xl hover:shadow-gray-500/50 hover:scale-105"
              >
                Explore All Cars
                <ChevronRightIcon className="ml-2 h-6 w-6" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <SparklesIcon className="h-5 w-5 mr-2" />
            <span className="text-sm font-semibold">Start Your Journey</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            Ready to Sell Your Car Parts?
          </h2>
          <p className="text-xl sm:text-2xl mb-10 text-green-100 max-w-3xl mx-auto">
            अपने कार पार्ट्स बेचना चाहते हैं? आज ही शुरू करें!
            <span className="block mt-2 text-lg">
              Join thousands of successful sellers on our platform
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/become-seller"
              className="group inline-flex items-center px-10 py-5 bg-white text-green-600 hover:bg-gray-100 font-bold text-lg rounded-xl transition-all duration-300 shadow-2xl hover:scale-105"
            >
              Start Selling Today
              <ChevronRightIcon className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/cars"
              className="inline-flex items-center px-10 py-5 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white/50 font-bold text-lg rounded-xl transition-all duration-300"
            >
              Browse Parts
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            {[
              { label: "Zero Commission", value: "0%" },
              { label: "Quick Setup", value: "5 min" },
              { label: "Seller Rating", value: "4.8★" },
              { label: "Support", value: "24/7" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              >
                <p className="text-3xl font-bold mb-1">{item.value}</p>
                <p className="text-sm text-green-100">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
