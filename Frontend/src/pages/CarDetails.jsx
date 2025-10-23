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
  SparklesIcon,
  UserIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [formStep, setFormStep] = useState(1);
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

  useEffect(() => {
    if (showEnquiryForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setFormStep(1);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showEnquiryForm]);

  const fetchCarDetails = async () => {
    try {
      const response = await fetch(
        `https://car-tt1u.onrender.com/api/cars/${id}`
      );
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

  const nextStep = () => {
    if (
      formStep === 1 &&
      (!enquiryForm.buyerName ||
        !enquiryForm.buyerEmail ||
        !enquiryForm.buyerPhone ||
        !enquiryForm.buyerLocation)
    ) {
      alert("कृपया सभी आवश्यक फ़ील्ड भरें");
      return;
    }
    if (formStep === 2 && !enquiryForm.interestedParts) {
      alert("कृपया रुचि रखने वाले पार्ट्स बताएं");
      return;
    }
    setFormStep(formStep + 1);
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-8 border-gray-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <SparklesIcon className="h-12 w-12 text-blue-600 animate-pulse" />
            </div>
          </div>
          <p className="mt-6 text-lg font-semibold text-gray-700 animate-pulse">
            Loading detailed car information...
          </p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <ExclamationCircleIcon className="h-20 w-20 text-gray-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            कार नहीं मिली
          </h2>
          <p className="text-gray-600">Car not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Car Header with Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
            <img
              src={car.image}
              alt={car.carName}
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute top-6 right-6 z-20">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg backdrop-blur-sm">
                {car.year}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
              <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 drop-shadow-2xl">
                {car.carName}
              </h1>
              <p className="text-2xl text-white font-semibold drop-shadow-lg">
                {car.brand} {car.model} • {car.year}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            {/* Basic Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300 shadow-md">
                <h3 className="font-bold text-blue-900 text-sm mb-2">Brand</h3>
                <p className="text-blue-700 text-xl font-bold">{car.brand}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300 shadow-md">
                <h3 className="font-bold text-green-900 text-sm mb-2">Model</h3>
                <p className="text-green-700 text-xl font-bold">{car.model}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300 shadow-md">
                <CalendarIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-bold text-purple-900 text-sm mb-2">Year</h3>
                <p className="text-purple-700 text-xl font-bold">{car.year}</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300 shadow-md">
                <MapPinIcon className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-bold text-orange-900 text-sm mb-2">
                  Location
                </h3>
                <p className="text-orange-700 text-xl font-bold">
                  {car.sellerInfo?.location}
                </p>
              </div>
            </div>

            {/* Available Parts Categories */}
            <div className="mb-10">
              <div className="flex items-center space-x-3 mb-6">
                <SparklesIcon className="h-8 w-8 text-green-600" />
                <h2 className="text-3xl font-black text-gray-900">
                  Available Parts Categories
                </h2>
              </div>
              <p className="text-gray-600 mb-6 text-lg">
                उपलब्ध पार्ट्स की श्रेणियां
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {getAvailableCategoriesText().map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-xl border-l-4 border-green-500 transform hover:scale-105 hover:shadow-lg transition-all duration-300"
                  >
                    <CheckCircleIcon className="h-8 w-8 text-green-600 flex-shrink-0" />
                    <span className="text-green-800 font-bold text-base">
                      {category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Parts List */}
            {car.detailedParts && car.detailedParts.length > 0 && (
              <div className="mb-10">
                <div className="flex items-center space-x-3 mb-6">
                  <CheckCircleIcon className="h-8 w-8 text-blue-600" />
                  <h2 className="text-3xl font-black text-gray-900">
                    Detailed Parts List
                  </h2>
                </div>
                <p className="text-gray-600 mb-6 text-lg">
                  विस्तृत पार्ट्स सूची
                </p>

                {Object.entries(
                  car.detailedParts.reduce((acc, part) => {
                    if (!acc[part.category]) {
                      acc[part.category] = [];
                    }
                    acc[part.category].push(part);
                    return acc;
                  }, {})
                ).map(([category, parts]) => (
                  <div key={category} className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-blue-200 bg-gradient-to-r from-blue-50 to-transparent px-4 py-2 rounded-lg">
                      {category}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                      {parts.map((part, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-bold text-gray-900 text-base">
                              {part.partName}
                            </h4>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                                part.inStock
                                  ? "bg-green-500 text-white"
                                  : "bg-red-500 text-white"
                              }`}
                            >
                              {part.inStock ? "In Stock" : "Out"}
                            </span>
                          </div>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p className="flex items-center space-x-2">
                              <span className="font-semibold text-gray-900">
                                Condition:
                              </span>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
                                {part.condition}
                              </span>
                            </p>
                            {part.price > 0 && (
                              <div className="flex items-center space-x-1 bg-green-50 p-2 rounded-lg">
                                <CurrencyRupeeIcon className="h-5 w-5 text-green-600" />
                                <span className="font-black text-green-700 text-lg">
                                  {part.price.toLocaleString()}
                                </span>
                              </div>
                            )}
                            {part.quantity && (
                              <p>
                                <span className="font-semibold">Qty:</span>{" "}
                                <span className="font-bold text-blue-600">
                                  {part.quantity}
                                </span>
                              </p>
                            )}
                            {part.description && (
                              <p className="text-gray-500 italic text-xs mt-2 border-t border-gray-200 pt-2">
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

            {/* Seller Information */}
            <div className="mb-10">
              <div className="flex items-center space-x-3 mb-6">
                <UserIcon className="h-8 w-8 text-purple-600" />
                <h2 className="text-3xl font-black text-gray-900">
                  Seller Information
                </h2>
              </div>
              <p className="text-gray-600 mb-6 text-lg">विक्रेता की जानकारी</p>
              <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg border-2 border-blue-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-md transform hover:scale-105 transition-all">
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-full shadow-lg">
                      <span className="text-white font-black text-2xl">
                        {car.sellerInfo?.sellerName?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-500 text-xs">
                        Seller Name
                      </p>
                      <p className="text-gray-900 font-bold text-lg">
                        {car.sellerInfo?.sellerName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-md transform hover:scale-105 transition-all">
                    <MapPinIcon className="h-10 w-10 text-orange-600" />
                    <div>
                      <p className="font-bold text-gray-500 text-xs">
                        Location
                      </p>
                      <p className="text-gray-900 font-bold text-lg">
                        {car.sellerInfo?.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-md transform hover:scale-105 transition-all">
                    <PhoneIcon className="h-10 w-10 text-green-600" />
                    <div>
                      <p className="font-bold text-gray-500 text-xs">Contact</p>
                      <p className="text-gray-900 font-bold text-lg">
                        {car.sellerInfo?.contactNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-md transform hover:scale-105 transition-all">
                    <EnvelopeIcon className="h-10 w-10 text-blue-600" />
                    <div>
                      <p className="font-bold text-gray-500 text-xs">Email</p>
                      <p className="text-gray-900 font-bold text-lg break-all">
                        {car.sellerInfo?.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enquiry Button */}
            <div className="text-center">
              <button
                onClick={() => setShowEnquiryForm(true)}
                className="relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white font-black py-6 px-12 rounded-2xl transition-all duration-300 text-xl flex items-center space-x-4 mx-auto shadow-2xl transform hover:scale-110 hover:shadow-3xl group overflow-hidden"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <EnvelopeIcon className="h-8 w-8 animate-bounce" />
                <span>Send Enquiry - पूछताछ भेजें</span>
                <SparklesIcon className="h-6 w-6 animate-pulse" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Buyer Enquiry Form Modal */}
      {showEnquiryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform animate-slideUp">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-white opacity-10"></div>
              <div className="relative flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-black text-white flex items-center space-x-3">
                    <SparklesIcon className="h-8 w-8 animate-pulse" />
                    <span>Buyer Enquiry Form</span>
                  </h3>
                  <p className="text-white text-sm mt-1 font-semibold">
                    खरीदार पूछताछ फॉर्म
                  </p>
                </div>
                <button
                  onClick={() => setShowEnquiryForm(false)}
                  className="text-white hover:bg-white hover:text-gray-900 rounded-full p-2 transition-all duration-300 transform hover:rotate-90"
                >
                  <XMarkIcon className="h-7 w-7" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="relative mt-6 flex justify-between items-center">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex-1 relative">
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                          formStep >= step
                            ? "bg-white text-blue-600 shadow-lg scale-110"
                            : "bg-blue-400 text-white"
                        }`}
                      >
                        {formStep > step ? "✓" : step}
                      </div>
                      {step < 3 && (
                        <div
                          className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${
                            formStep > step ? "bg-white" : "bg-blue-400"
                          }`}
                        ></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Car Info Summary */}
              <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-6 rounded-2xl mb-8 border-2 border-blue-200 shadow-lg">
                <div className="flex items-start space-x-4">
                  <img
                    src={car.image}
                    alt={car.carName}
                    className="w-24 h-24 rounded-xl object-cover shadow-md"
                  />
                  <div>
                    <h4 className="font-black text-gray-900 text-xl mb-2">
                      Enquiry for: {car.carName}
                    </h4>
                    <p className="text-sm text-gray-600 font-semibold">
                      {car.brand} {car.model} • {car.year} •{" "}
                      {car.sellerInfo?.location}
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleEnquirySubmit}>
                {/* Step 1: Personal Details */}
                {formStep === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    <h4 className="text-xl font-black text-gray-900 flex items-center space-x-2 mb-4">
                      <UserIcon className="h-6 w-6 text-blue-600" />
                      <span>Personal Details - व्यक्तिगत विवरण</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className=" text-sm font-bold text-gray-700 mb-2">
                          Your Name - आपका नाम *
                        </label>
                        <input
                          type="text"
                          name="buyerName"
                          value={enquiryForm.buyerName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 font-medium"
                          placeholder="अपना पूरा नाम दर्ज करें"
                        />
                      </div>

                      <div>
                        <label className=" text-sm font-bold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="buyerEmail"
                          value={enquiryForm.buyerEmail}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 font-medium"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label className=" text-sm font-bold text-gray-700 mb-2">
                          Phone Number - फोन नंबर *
                        </label>
                        <input
                          type="tel"
                          name="buyerPhone"
                          value={enquiryForm.buyerPhone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 font-medium"
                          placeholder="10 digit mobile number"
                        />
                      </div>

                      <div>
                        <label className=" text-sm font-bold text-gray-700 mb-2">
                          Your Location - आपका स्थान *
                        </label>
                        <input
                          type="text"
                          name="buyerLocation"
                          value={enquiryForm.buyerLocation}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 font-medium"
                          placeholder="City, State"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Parts Interest */}
                {formStep === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    <h4 className="text-xl font-black text-gray-900 flex items-center space-x-2 mb-4">
                      <CheckCircleIcon className="h-6 w-6 text-green-600" />
                      <span>Parts & Budget - पार्ट्स और बजट</span>
                    </h4>
                    <div>
                      <label className=" text-sm font-bold text-gray-700 mb-2">
                        Interested Parts - रुचि रखने वाले पार्ट्स *
                      </label>
                      <textarea
                        name="interestedParts"
                        value={enquiryForm.interestedParts}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-300 focus:border-green-500 transition-all duration-300 font-medium"
                        placeholder="कौन से पार्ट्स चाहिए? जैसे: Engine parts, Body parts, etc."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className=" text-sm font-bold text-gray-700 mb-2 flex items-center space-x-2">
                          <CurrencyRupeeIcon className="h-5 w-5 text-green-600" />
                          <span>Budget Range - बजट (₹)</span>
                        </label>
                        <input
                          type="text"
                          name="budget"
                          value={enquiryForm.budget}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-300 focus:border-green-500 transition-all duration-300 font-medium"
                          placeholder="जैसे: 10,000 - 50,000"
                        />
                      </div>

                      <div>
                        <label className=" text-sm font-bold text-gray-700 mb-2 flex items-center space-x-2">
                          <ClockIcon className="h-5 w-5 text-orange-600" />
                          <span>Urgency - तत्काल आवश्यकता</span>
                        </label>
                        <select
                          name="urgency"
                          value={enquiryForm.urgency}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-300 focus:border-green-500 transition-all duration-300 font-medium bg-white"
                        >
                          <option value="Normal">Normal - सामान्य</option>
                          <option value="Urgent">Urgent - तत्काल</option>
                          <option value="Very Urgent">
                            Very Urgent - अत्यंत तत्काल
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Additional Message */}
                {formStep === 3 && (
                  <div className="space-y-6 animate-fadeIn">
                    <h4 className="text-xl font-black text-gray-900 flex items-center space-x-2 mb-4">
                      <EnvelopeIcon className="h-6 w-6 text-purple-600" />
                      <span>Additional Information - अतिरिक्त जानकारी</span>
                    </h4>
                    <div>
                      <label className=" text-sm font-bold text-gray-700 mb-2">
                        Additional Message - अतिरिक्त संदेश
                      </label>
                      <textarea
                        name="message"
                        value={enquiryForm.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 font-medium"
                        placeholder="कोई विशेष आवश्यकता या प्रश्न हो तो यहाँ लिखें..."
                      />
                    </div>

                    {/* Summary Review */}
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-200">
                      <h5 className="font-black text-gray-900 mb-4 text-lg">
                        📋 Review Your Details - अपनी जानकारी की समीक्षा करें
                      </h5>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-bold text-gray-700">Name:</span>{" "}
                          <span className="text-gray-900">
                            {enquiryForm.buyerName}
                          </span>
                        </p>
                        <p>
                          <span className="font-bold text-gray-700">
                            Email:
                          </span>{" "}
                          <span className="text-gray-900">
                            {enquiryForm.buyerEmail}
                          </span>
                        </p>
                        <p>
                          <span className="font-bold text-gray-700">
                            Phone:
                          </span>{" "}
                          <span className="text-gray-900">
                            {enquiryForm.buyerPhone}
                          </span>
                        </p>
                        <p>
                          <span className="font-bold text-gray-700">
                            Location:
                          </span>{" "}
                          <span className="text-gray-900">
                            {enquiryForm.buyerLocation}
                          </span>
                        </p>
                        <p>
                          <span className="font-bold text-gray-700">
                            Interested Parts:
                          </span>{" "}
                          <span className="text-gray-900">
                            {enquiryForm.interestedParts}
                          </span>
                        </p>
                        {enquiryForm.budget && (
                          <p>
                            <span className="font-bold text-gray-700">
                              Budget:
                            </span>{" "}
                            <span className="text-gray-900">
                              ₹{enquiryForm.budget}
                            </span>
                          </p>
                        )}
                        <p>
                          <span className="font-bold text-gray-700">
                            Urgency:
                          </span>{" "}
                          <span className="text-gray-900">
                            {enquiryForm.urgency}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex space-x-4 pt-8 mt-8 border-t-2 border-gray-200">
                  {formStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-black py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      ← Previous
                    </button>
                  )}
                  {formStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-black py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                    >
                      <CheckCircleIcon className="h-6 w-6" />
                      <span>Submit Enquiry - पूछताछ भेजें</span>
                    </button>
                  )}
                </div>

                {formStep === 1 && (
                  <button
                    type="button"
                    onClick={() => setShowEnquiryForm(false)}
                    className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl transition-all duration-200"
                  >
                    Cancel - रद्द करें
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CarDetails;
