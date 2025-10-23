// components/CarDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  XMarkIcon,
  CalendarIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/outline";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    buyerName: "",
    buyerEmail: "",
    buyerPhone: "",
    buyerLocation: "",
    interestedParts: "",
    budget: "",
    message: "",
    urgency: "Normal",
  });

  useEffect(() => {
    fetchCarDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchCarDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/cars/${id}`);
      const data = await response.json();
      console.log("cardata : ", data.data);
      if (data.success) {
        setCar(data.data);
      }
    } catch (error) {
      console.error("Error fetching car details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();

    console.log("=== BUYER ENQUIRY FORM SUBMITTED ===");
    console.log("Buyer Details:", enquiryForm);
    console.log("Car Information:", {
      carId: id,
      carName: car?.carName,
      brand: car?.brand,
      model: car?.model,
      year: car?.year,
    });
    console.log("Seller Information:", car?.sellerInfo);
    console.log("Available Parts Categories:", car?.availablePartsCategories);
    console.log("Detailed Parts:", car?.detailedParts);
    console.log("=====================================");

    alert(
      `✅ पूछताछ सफलतापूर्वक भेजी गई!\n\nBuyer: ${enquiryForm.buyerName}\nInterested in: ${enquiryForm.interestedParts}\nBudget: ₹${enquiryForm.budget}\n\nविक्रेता जल्दी ही आपसे संपर्क करेंगे।`
    );

    setShowEnquiryForm(false);
    setEnquiryForm({
      buyerName: "",
      buyerEmail: "",
      buyerPhone: "",
      buyerLocation: "",
      interestedParts: "",
      budget: "",
      message: "",
      urgency: "Normal",
    });
  };

  const handleInputChange = (e) => {
    setEnquiryForm({
      ...enquiryForm,
      [e.target.name]: e.target.value,
    });
  };

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
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Loading detailed car information...
          </p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ExclamationCircleIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            कार नहीं मिली
          </h2>
          <p className="text-gray-600">Car not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Car Header with Image */}
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
                {car.brand} {car.model} • {car.year}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Basic Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold text-orange-900">Location</h3>
                <p className="text-orange-700 text-lg">
                  {car.sellerInfo?.location}
                </p>
              </div>
            </div>

            {/* Available Parts Categories */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Available Parts Categories - उपलब्ध पार्ट्स की श्रेणियां
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {getAvailableCategoriesText().map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 bg-green-50 p-4 rounded-lg border-l-4 border-green-500"
                  >
                    <CheckCircleIcon className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span className="text-green-800 font-semibold">
                      {category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Parts List - ALL DETAILS */}
            {car.detailedParts && car.detailedParts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Detailed Parts List - विस्तृत पार्ट्स सूची
                </h2>

                {/* Group parts by category */}
                {Object.entries(
                  car.detailedParts.reduce((acc, part) => {
                    if (!acc[part.category]) {
                      acc[part.category] = [];
                    }
                    acc[part.category].push(part);
                    return acc;
                  }, {})
                ).map(([category, parts]) => (
                  <div key={category} className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-2">
                      {category}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {parts.map((part, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 p-4 rounded-lg border hover:shadow-md transition-all duration-200"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-gray-900 text-sm">
                              {part.partName}
                            </h4>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                part.inStock
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {part.inStock ? "In Stock" : "Out of Stock"}
                            </span>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p>
                              <span className="font-medium">Condition:</span>{" "}
                              {part.condition}
                            </p>
                            {part.price > 0 && (
                              <div className="flex items-center space-x-1">
                                <CurrencyRupeeIcon className="h-4 w-4 text-green-600" />
                                <span className="font-bold text-green-600">
                                  {part.price.toLocaleString()}
                                </span>
                              </div>
                            )}
                            {part.quantity && (
                              <p>
                                <span className="font-medium">Qty:</span>{" "}
                                {part.quantity}
                              </p>
                            )}
                            {part.description && (
                              <p className="text-gray-500 italic text-xs">
                                {part.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Complete Seller Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Seller Information - विक्रेता की जानकारी
              </h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-600 p-2 rounded-full">
                      <span className="text-white font-bold text-lg">
                        {car.sellerInfo?.sellerName?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Seller Name</p>
                      <p className="text-blue-700">
                        {car.sellerInfo?.sellerName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPinIcon className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">Location</p>
                      <p className="text-blue-700">
                        {car.sellerInfo?.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <PhoneIcon className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">Contact</p>
                      <p className="text-blue-700">
                        {car.sellerInfo?.contactNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <EnvelopeIcon className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">Email</p>
                      <p className="text-blue-700">{car.sellerInfo?.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enquiry Button */}
            <div className="text-center">
              <button
                onClick={() => setShowEnquiryForm(true)}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg flex items-center space-x-3 mx-auto shadow-lg transform hover:scale-105"
              >
                <EnvelopeIcon className="h-6 w-6" />
                <span>Send Enquiry - पूछताछ भेजें</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Buyer Enquiry Form Modal */}
      {showEnquiryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Buyer Enquiry Form - खरीदार पूछताछ फॉर्म
                </h3>
                <button
                  onClick={() => setShowEnquiryForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Car Info Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg mb-6 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Enquiry for: {car.carName}
                </h4>
                <p className="text-sm text-gray-600">
                  {car.brand} {car.model} • {car.year} •{" "}
                  {car.sellerInfo?.location}
                </p>
              </div>

              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                {/* Complete Buyer Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name - आपका नाम *
                    </label>
                    <input
                      type="text"
                      name="buyerName"
                      value={enquiryForm.buyerName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="अपना पूरा नाम दर्ज करें"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="buyerEmail"
                      value={enquiryForm.buyerEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number - फोन नंबर *
                    </label>
                    <input
                      type="tel"
                      name="buyerPhone"
                      value={enquiryForm.buyerPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="10 digit mobile number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Location - आपका स्थान *
                    </label>
                    <input
                      type="text"
                      name="buyerLocation"
                      value={enquiryForm.buyerLocation}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="City, State"
                    />
                  </div>
                </div>

                {/* Interested Parts */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Interested Parts - रुचि रखने वाले पार्ट्स *
                  </label>
                  <textarea
                    name="interestedParts"
                    value={enquiryForm.interestedParts}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="कौन से पार्ट्स चाहिए? जैसे: Engine parts, Body parts, etc."
                  />
                </div>

                {/* Budget and Urgency */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Budget Range - बजट (₹)
                    </label>
                    <input
                      type="text"
                      name="budget"
                      value={enquiryForm.budget}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="जैसे: 10,000 - 50,000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Urgency - तत्काल आवश्यकता
                    </label>
                    <select
                      name="urgency"
                      value={enquiryForm.urgency}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Normal">Normal - सामान्य</option>
                      <option value="Urgent">Urgent - तत्काल</option>
                      <option value="Very Urgent">
                        Very Urgent - अत्यंत तत्काल
                      </option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Message - अतिरिक्त संदेश
                  </label>
                  <textarea
                    name="message"
                    value={enquiryForm.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="कोई विशेष आवश्यकता या प्रश्न हो तो यहाँ लिखें..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                  >
                    Send Enquiry - पूछताछ भेजें
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEnquiryForm(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Cancel - रद्द करें
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

export default CarDetails;
