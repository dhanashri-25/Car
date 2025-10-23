import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PhotoIcon,
  PlusIcon,
  XMarkIcon,
  TruckIcon,
  CheckCircleIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ClockIcon,
  TagIcon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/outline";

const PostCar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [carImage, setCarImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    carName: "Hyundai Creta",
    brand: "Hyundai",
    model: "SX(O) Diesel",
    year: 2022,
    generalDescription:
      "Premium compact SUV with diesel engine, single owner, and all parts in excellent condition.",
    availablePartsCategories: {
      bodyParts: true,
      electricals: true,
      acParts: true,
      mechanicalParts: true,
      engineParts: true,
    },
    detailedParts: [
      {
        partName: "Clutch Plate",
        category: "Clutch System",
        price: 6500,
        condition: "Used",
        description: "Genuine Hyundai clutch plate, 6 months old, no damage.",
        quantity: 1,
        inStock: true,
      },
      {
        partName: "Headlight Assembly",
        category: "Lighting",
        price: 4200,
        condition: "Refurbished",
        description:
          "OEM headlight assembly with DRL, minor scratch only on casing.",
        quantity: 2,
        inStock: true,
      },
      {
        partName: "AC Compressor",
        category: "Air Conditioning",
        price: 8200,
        condition: "Good Condition",
        description:
          "Fully functional AC compressor, recently refilled refrigerant.",
        quantity: 1,
        inStock: true,
      },
    ],
    sellerInfo: {
      sellerName: "AutoZone Spares Hub",
      contactNumber: "9823416789",
      email: "sales@autozonespareshub.in",
      location: "Mumbai, Maharashtra",
    },
  });

  const [newPart, setNewPart] = useState({
    partName: "",
    category: "",
    price: "",
    condition: "Good Condition",
    description: "",
    quantity: 1,
    inStock: true,
  });

  const steps = [
    { number: 1, title: "Basic Info", icon: TruckIcon },
    { number: 2, title: "Parts Details", icon: TagIcon },
    { number: 3, title: "Seller Info", icon: ShieldCheckIcon },
  ];

  const partCategories = [
    "Maintenance Service Parts",
    "Air Conditioning",
    "Belts Chains and Rollers",
    "Bearings",
    "Body",
    "Control Cables",
    "Brake System",
    "Car Accessories",
    "Electric Components",
    "Sensors Relays and Control units",
    "Exhaust System",
    "Fuel Supply System",
    "Gaskets and Sealing",
    "Windscreen Cleaning System",
    "Interior and comfort",
    "Lighting",
    "Oils and Fluids",
    "Pipes and Hoses",
    "Glowplug System",
    "Steering",
    "Towbar Parts",
    "Transmission",
    "Trims",
    "Universal",
    "Wheels",
    "Engine",
    "Tyres and Alloys",
    "Clutch System",
    "Engine Cooling System",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCarImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePartInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPart((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addPart = () => {
    if (newPart.partName && newPart.category) {
      setFormData((prev) => ({
        ...prev,
        detailedParts: [
          ...prev.detailedParts,
          {
            ...newPart,
            price: parseFloat(newPart.price) || 0,
            quantity: parseInt(newPart.quantity) || 1,
          },
        ],
      }));
      setNewPart({
        partName: "",
        category: "",
        price: "",
        condition: "Good Condition",
        description: "",
        quantity: 1,
        inStock: true,
      });
    }
  };

  const removePart = (index) => {
    setFormData((prev) => ({
      ...prev,
      detailedParts: prev.detailedParts.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();

      if (carImage) {
        formDataToSend.append("carPhoto", carImage);
      }

      formDataToSend.append("carName", formData.carName);
      formDataToSend.append("brand", formData.brand);
      formDataToSend.append("model", formData.model);
      formDataToSend.append("year", formData.year);
      formDataToSend.append("generalDescription", formData.generalDescription);
      formDataToSend.append(
        "availablePartsCategories",
        JSON.stringify(formData.availablePartsCategories)
      );
      formDataToSend.append(
        "detailedParts",
        JSON.stringify(formData.detailedParts)
      );
      formDataToSend.append("sellerInfo", JSON.stringify(formData.sellerInfo));

      const response = await fetch(
        "https://car-tt1u.onrender.com/api/cars/post-car",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("✅ " + data.message);
        navigate("/cars");
      } else {
        alert("❌ Error: " + data.message);
      }
    } catch (error) {
      console.error("Error posting car:", error);
      alert("❌ Error posting car. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mb-4">
            <SparklesIcon className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-semibold text-blue-600">
              Sell Your Car Parts
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Post Your Car Parts
          </h1>
          <p className="text-xl text-gray-600">
            अपनी कार के पार्ट्स बेचने के लिए विवरण भरें
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep >= step.number
                        ? "bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg scale-110"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <step.icon className="h-8 w-8" />
                  </div>
                  <span
                    className={`mt-2 text-sm font-medium ${
                      currentStep >= step.number
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 w-24 rounded transition-all duration-300 ${
                      currentStep > step.number
                        ? "bg-gradient-to-r from-blue-600 to-green-600"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100">
          {/* Gradient Header */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 px-8 py-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <TruckIcon className="h-10 w-10 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">
                  List Your Premium Parts
                </h2>
                <p className="text-blue-100 mt-1">
                  Join thousands of sellers on our platform
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-10">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-8 animate-fade-in">
                {/* Car Image Upload */}
                <div>
                  <label className=" text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <PhotoIcon className="h-6 w-6 mr-2 text-blue-600" />
                    Car Photo - कार की फोटो *
                  </label>
                  <div className="border-3 border-dashed border-blue-200 rounded-2xl p-8 bg-gradient-to-br from-blue-50 to-purple-50 hover:border-blue-400 transition-all duration-300">
                    {imagePreview ? (
                      <div className="relative group">
                        <img
                          src={imagePreview}
                          alt="Car preview"
                          className="w-full h-80 object-cover rounded-2xl shadow-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => {
                              setCarImage(null);
                              setImagePreview(null);
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-xl transform hover:scale-110 transition-all duration-200"
                          >
                            <XMarkIcon className="h-6 w-6" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
                          <PhotoIcon className="h-12 w-12 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Upload Your Car Photo
                        </h3>
                        <p className="text-gray-600 mb-6">
                          High-quality images get more views!
                        </p>
                        <label className="cursor-pointer inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                          <PhotoIcon className="h-5 w-5 mr-2" />
                          Choose Photo
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            required
                          />
                        </label>
                        <p className="mt-4 text-sm text-gray-500">
                          PNG, JPG up to 5MB • Recommended: 1200x800px
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Basic Car Info */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <TruckIcon className="h-6 w-6 mr-2 text-blue-600" />
                    Basic Car Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className=" text-sm font-semibold text-gray-700 mb-2">
                        Car Name - कार का नाम *
                      </label>
                      <input
                        type="text"
                        name="carName"
                        value={formData.carName}
                        onChange={handleInputChange}
                        placeholder="e.g., Hyundai i20"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-300"
                        required
                      />
                    </div>

                    <div className="group">
                      <label className=" text-sm font-semibold text-gray-700 mb-2">
                        Brand - ब्रांड *
                      </label>
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        placeholder="e.g., Hyundai"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-300"
                        required
                      />
                    </div>

                    <div className="group">
                      <label className=" text-sm font-semibold text-gray-700 mb-2">
                        Model - मॉडल *
                      </label>
                      <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        placeholder="e.g., i20"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-300"
                        required
                      />
                    </div>

                    <div className="group">
                      <label className=" text-sm font-semibold text-gray-700 mb-2">
                        Year - साल *
                      </label>
                      <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        min="1990"
                        max={new Date().getFullYear() + 1}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-300"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* General Description */}
                <div>
                  <label className=" text-sm font-semibold text-gray-700 mb-2">
                    General Description - सामान्य विवरण
                  </label>
                  <textarea
                    name="generalDescription"
                    value={formData.generalDescription}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Describe your car and available parts in detail..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
                  />
                </div>

                {/* Available Parts Categories */}
                <div>
                  <label className=" text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <TagIcon className="h-6 w-6 mr-2 text-blue-600" />
                    Available Parts Categories
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { key: "bodyParts", label: "All Body Parts" },
                      { key: "electricals", label: "All Electricals" },
                      { key: "acParts", label: "AC Parts" },
                      { key: "mechanicalParts", label: "Mechanical Parts" },
                      { key: "engineParts", label: "Engine Parts" },
                    ].map((category) => (
                      <label
                        key={category.key}
                        className="group relative flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all duration-200"
                      >
                        <input
                          type="checkbox"
                          name={`availablePartsCategories.${category.key}`}
                          checked={
                            formData.availablePartsCategories[category.key]
                          }
                          onChange={handleInputChange}
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                          {category.label}
                        </span>
                        {formData.availablePartsCategories[category.key] && (
                          <CheckCircleIcon className="absolute right-2 top-2 h-5 w-5 text-green-500" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Next Step →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Parts Details */}
            {currentStep === 2 && (
              <div className="space-y-8 animate-fade-in">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <TagIcon className="h-6 w-6 mr-2 text-blue-600" />
                  Detailed Parts List
                </h3>

                {/* Add New Part */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-100">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                    <PlusIcon className="h-5 w-5 mr-2 text-blue-600" />
                    Add New Part
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <input
                      type="text"
                      name="partName"
                      value={newPart.partName}
                      onChange={handlePartInputChange}
                      placeholder="Part Name"
                      className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                    />
                    <select
                      name="category"
                      value={newPart.category}
                      onChange={handlePartInputChange}
                      className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="">Select Category</option>
                      {partCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <div className="relative">
                      <CurrencyRupeeIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        name="price"
                        value={newPart.price}
                        onChange={handlePartInputChange}
                        placeholder="Price"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                      />
                    </div>
                    <select
                      name="condition"
                      value={newPart.condition}
                      onChange={handlePartInputChange}
                      className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="New">New</option>
                      <option value="Used">Used</option>
                      <option value="Good Condition">Good Condition</option>
                      <option value="Refurbished">Refurbished</option>
                    </select>
                    <input
                      type="number"
                      name="quantity"
                      value={newPart.quantity}
                      onChange={handlePartInputChange}
                      placeholder="Quantity"
                      min="1"
                      className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                    />
                    <label className="flex items-center justify-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-white cursor-pointer transition-all duration-200">
                      <input
                        type="checkbox"
                        name="inStock"
                        checked={newPart.inStock}
                        onChange={handlePartInputChange}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        In Stock
                      </span>
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <textarea
                      name="description"
                      value={newPart.description}
                      onChange={handlePartInputChange}
                      placeholder="Part description (optional)"
                      rows={2}
                      className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={addPart}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 font-bold shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <PlusIcon className="h-5 w-5" />
                      <span>Add Part</span>
                    </button>
                  </div>
                </div>

                {/* Parts List */}
                {formData.detailedParts.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-900 flex items-center">
                      <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600" />
                      Added Parts ({formData.detailedParts.length})
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      {formData.detailedParts.map((part, index) => (
                        <div
                          key={index}
                          className="group relative bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h5 className="font-bold text-lg text-gray-900">
                                  {part.partName}
                                </h5>
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                                  {part.category}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-3 text-sm">
                                <span className="flex items-center text-green-600 font-bold">
                                  <CurrencyRupeeIcon className="h-4 w-4 mr-1" />
                                  {part.price}
                                </span>
                                <span className="px-3 py-1 bg-white rounded-full text-gray-700 font-medium border border-gray-200">
                                  {part.condition}
                                </span>
                                <span className="px-3 py-1 bg-white rounded-full text-gray-700 font-medium border border-gray-200">
                                  Qty: {part.quantity}
                                </span>
                                <span
                                  className={`px-3 py-1 rounded-full font-medium ${
                                    part.inStock
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {part.inStock ? "In Stock" : "Out of Stock"}
                                </span>
                              </div>
                              {part.description && (
                                <p className="mt-2 text-sm text-gray-600">
                                  {part.description}
                                </p>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removePart(index)}
                              className="ml-4 text-red-600 hover:text-white hover:bg-red-600 p-2 rounded-lg transition-all duration-200"
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-all duration-300"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl                    hover:scale-105"
                  >
                    Next Step →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Seller Info */}
            {currentStep === 3 && (
              <div className="space-y-8 animate-fade-in">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <ShieldCheckIcon className="h-6 w-6 mr-2 text-blue-600" />
                  Seller Information - विक्रेता की जानकारी
                </h3>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className=" text-sm font-semibold text-gray-700 mb-2">
                        Seller Name - विक्रेता का नाम *
                      </label>
                      <input
                        type="text"
                        name="sellerInfo.sellerName"
                        value={formData.sellerInfo.sellerName}
                        onChange={handleInputChange}
                        placeholder="Enter seller name"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-300"
                        required
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Contact Number - संपर्क नंबर *
                      </label>
                      <input
                        type="tel"
                        name="sellerInfo.contactNumber"
                        value={formData.sellerInfo.contactNumber}
                        onChange={handleInputChange}
                        placeholder="Enter contact number"
                        pattern="[0-9]{10}"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-300"
                        required
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address - ईमेल पता *
                      </label>
                      <input
                        type="email"
                        name="sellerInfo.email"
                        value={formData.sellerInfo.email}
                        onChange={handleInputChange}
                        placeholder="Enter email address"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-300"
                        required
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Location - स्थान *
                      </label>
                      <input
                        type="text"
                        name="sellerInfo.location"
                        value={formData.sellerInfo.location}
                        onChange={handleInputChange}
                        placeholder="City, State"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-300"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Summary Section */}
                <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl border-2 border-green-100">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                    <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600" />
                    Listing Summary - सूची सारांश
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <p className="font-semibold text-gray-700">
                        Car Details:
                      </p>
                      <p className="text-gray-600">
                        {formData.carName} ({formData.year})
                      </p>
                      <p className="text-gray-600">
                        {formData.brand} {formData.model}
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-700">
                        Total Parts:
                      </p>
                      <p className="text-gray-600">
                        {formData.detailedParts.length} parts listed
                      </p>
                      <p className="text-gray-600">
                        Total Value: ₹
                        {formData.detailedParts
                          .reduce(
                            (sum, part) => sum + part.price * part.quantity,
                            0
                          )
                          .toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {formData.detailedParts.length > 0 && (
                    <div className="mt-4">
                      <p className="font-semibold text-gray-700 mb-2">
                        Parts Overview:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {formData.detailedParts
                          .slice(0, 5)
                          .map((part, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-white rounded-full text-xs text-gray-700 border border-gray-200"
                            >
                              {part.partName}
                            </span>
                          ))}
                        {formData.detailedParts.length > 5 && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                            +{formData.detailedParts.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                    />
                    <div className="text-sm text-gray-700">
                      <p className="font-semibold mb-1">Terms and Conditions</p>
                      <p>
                        I agree to the terms of service and confirm that all
                        information provided is accurate. I understand that
                        providing false information may result in account
                        suspension.
                      </p>
                      <p className="mt-2 text-xs text-gray-600">
                        By submitting this form, you agree to our Privacy Policy
                        and Terms of Service.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-all duration-300"
                  >
                    ← Previous
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        <span>Publishing...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className="h-5 w-5" />
                        <span>Publish Listing</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <TruckIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Easy Listing</h3>
            <p className="text-sm text-gray-600">
              Simple 3-step process to list your car parts
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <CurrencyRupeeIcon className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Best Prices</h3>
            <p className="text-sm text-gray-600">
              Set competitive prices for your parts
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <ClockIcon className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Quick Sales</h3>
            <p className="text-sm text-gray-600">
              Connect with buyers instantly
            </p>
          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </div>
  );
};

export default PostCar;
