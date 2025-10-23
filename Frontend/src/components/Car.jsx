// components/Car.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  PhoneIcon,
  MapPinIcon,
  XMarkIcon,
  CheckCircleIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

const Car = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    interestedPart: "",
  });

  useEffect(() => {
    fetchCarDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchCarDetails = async () => {
    try {
      const response = await fetch(`/api/cars/${id}`);
      const data = await response.json();
      if (data.success) {
        setCar(data.data);
      }
    } catch (error) {
      console.error("Error fetching car details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Data:", contactForm);
    console.log("Car Details:", {
      carId: id,
      carName: car?.carName,
      sellerInfo: car?.sellerInfo,
    });
    alert("संपर्क फॉर्म सबमिट हो गया! Contact form submitted successfully!");
    setShowContactForm(false);
    setContactForm({
      name: "",
      email: "",
      phone: "",
      message: "",
      interestedPart: "",
    });
  };

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  // Get available categories text (main highlights)
  const getAvailableCategoriesText = () => {
    const categories = [];
    if (car.availablePartsCategories?.bodyParts)
      categories.push("All Body Parts");
    if (car.availablePartsCategories?.electricals)
      categories.push("All Electricals");
    if (car.availablePartsCategories?.acParts)
      categories.push("Good Condition AC Parts");
    if (car.availablePartsCategories?.mechanicalParts)
      categories.push("All Mechanical Parts");
    if (car.availablePartsCategories?.engineParts)
      categories.push("All Engine parts available");
    return categories;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Car not found
          </h2>
          <p className="text-gray-600">कार नहीं मिली</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Car Image and Basic Info */}
          <div className="relative">
            <img
              src={car.image}
              alt={car.carName}
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full font-medium">
              {car.year}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {car.carName}
              </h1>
              <p className="text-xl text-gray-200">
                Model: {car.brand} {car.model}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Basic Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold text-blue-900">Brand</h3>
                <p className="text-blue-700 text-lg">{car.brand}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold text-green-900">Model</h3>
                <p className="text-green-700 text-lg">{car.model}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <CalendarIcon className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                <h3 className="font-semibold text-purple-900">Year</h3>
                <p className="text-purple-700 text-lg">{car.year}</p>
              </div>
            </div>

            {/* General Description */}
            {car.generalDescription && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Description - विवरण
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed bg-gray-50 p-4 rounded-lg">
                  {car.generalDescription}
                </p>
              </div>
            )}

            {/* Main Available Parts Categories - Simple Grid */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Available Parts - उपलब्ध पार्ट्स
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {getAvailableCategoriesText().map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 bg-green-50 p-4 rounded-lg border-l-4 border-green-500"
                  >
                    <CheckCircleIcon className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span className="text-green-800 font-semibold text-lg">
                      {category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Seller Button */}
            <div className="text-center">
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg flex items-center space-x-2 mx-auto shadow-lg"
              >
                <PhoneIcon className="h-6 w-6" />
                <span>Contact Seller - विक्रेता से संपर्क करें</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Contact Seller - विक्रेता से संपर्क करें
                </h3>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Seller Info Preview */}
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium text-blue-900 mb-2">
                  Seller Information
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Name:</span>
                    <span>{car.sellerInfo?.sellerName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="h-4 w-4 text-gray-500" />
                    <span>{car.sellerInfo?.location}</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name - आपका नाम *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="अपना नाम दर्ज करें"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone - फोन नंबर *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10 digit mobile number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Interested Part - रुचि रखने वाला पार्ट
                  </label>
                  <input
                    type="text"
                    name="interestedPart"
                    value={contactForm.interestedPart}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Which part are you interested in?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message - संदेश *
                  </label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="अपना संदेश यहाँ लिखें..."
                  ></textarea>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                  >
                    Send Message
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Car;
