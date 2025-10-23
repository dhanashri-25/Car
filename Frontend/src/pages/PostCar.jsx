import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PhotoIcon,
  PlusIcon,
  XMarkIcon,
  TruckIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const PostCar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [carImage, setCarImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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
        condition: "Used", // ✅ valid
        description: "Genuine Hyundai clutch plate, 6 months old, no damage.",
        quantity: 1,
        inStock: true,
      },
      {
        partName: "Headlight Assembly",
        category: "Lighting",
        price: 4200,
        condition: "Refurbished", // ✅ valid
        description:
          "OEM headlight assembly with DRL, minor scratch only on casing.",
        quantity: 2,
        inStock: true,
      },
      {
        partName: "AC Compressor",
        category: "Air Conditioning",
        price: 8200,
        condition: "Good Condition", // ✅ valid
        description:
          "Fully functional AC compressor, recently refilled refrigerant.",
        quantity: 1,
        inStock: true,
      },
      {
        partName: "Engine Oil Cooler",
        category: "Engine Cooling System",
        price: 3500,
        condition: "Used", // ✅ valid
        description: "No leaks, fits diesel engine variant, well maintained.",
        quantity: 1,
        inStock: true,
      },
      {
        partName: "Front Brake Disc",
        category: "Brake System",
        price: 2800,
        condition: "New", // ✅ valid
        description: "Original Hyundai part, minimal wear, evenly surfaced.",
        quantity: 2,
        inStock: true,
      },
    ],
    sellerInfo: {
      sellerName: "AutoZone Spares Hub",
      contactNumber: "9823416789", // ✅ 10 digits only (as per regex)
      email: "sales@autozonespareshub.in",
      location: "Mumbai, Maharashtra",
    },
  });

  const [newPart, setNewPart] = useState({
    partName: "Engine Mount Bracket",
    category: "Engine",
    price: 2400,
    condition: "Good Condition", // ✅ valid
    description: "Heavy-duty mount bracket, fits perfectly for Creta 2022.",
    quantity: 2,
    inStock: true,
  });

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

      // Add car image
      if (carImage) {
        formDataToSend.append("carPhoto", carImage);
      }

      // Add all form data
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

      const response = await fetch("http://localhost:5000/api/cars/post-car", {
        method: "POST",
        body: formDataToSend,
      });

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 px-6 py-4">
            <div className="flex items-center space-x-3">
              <TruckIcon className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">
                Post Your Car Parts
              </h1>
            </div>
            <p className="text-blue-100 mt-2">
              अपनी कार के पार्ट्स बेचने के लिए विवरण भरें
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Car Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Car Photo - कार की फोटो *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Car preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setCarImage(null);
                        setImagePreview(null);
                      }}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                        Choose Photo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          required
                        />
                      </label>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Basic Car Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Car Name - कार का नाम *
                </label>
                <input
                  type="text"
                  name="carName"
                  value={formData.carName}
                  onChange={handleInputChange}
                  placeholder="e.g., Hyundai i20"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand - ब्रांड *
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="e.g., Hyundai"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model - मॉडल *
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="e.g., i20"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year - साल *
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  min="1990"
                  max={new Date().getFullYear() + 1}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* General Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                General Description - सामान्य विवरण
              </label>
              <textarea
                name="generalDescription"
                value={formData.generalDescription}
                onChange={handleInputChange}
                rows={3}
                placeholder="e.g., All parts available in good condition"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Available Parts Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Available Parts Categories - उपलब्ध पार्ट्स की श्रेणियां
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="availablePartsCategories.bodyParts"
                    checked={formData.availablePartsCategories.bodyParts}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">All Body Parts</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="availablePartsCategories.electricals"
                    checked={formData.availablePartsCategories.electricals}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">All Electricals</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="availablePartsCategories.acParts"
                    checked={formData.availablePartsCategories.acParts}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">AC Parts</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="availablePartsCategories.mechanicalParts"
                    checked={formData.availablePartsCategories.mechanicalParts}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Mechanical Parts
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="availablePartsCategories.engineParts"
                    checked={formData.availablePartsCategories.engineParts}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Engine Parts</span>
                </label>
              </div>
            </div>

            {/* Detailed Parts */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Detailed Parts List - विस्तृत पार्ट्स सूची
              </label>

              {/* Add New Part */}
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium text-gray-900 mb-3">Add New Part</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    name="partName"
                    value={newPart.partName}
                    onChange={handlePartInputChange}
                    placeholder="Part Name"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <select
                    name="category"
                    value={newPart.category}
                    onChange={handlePartInputChange}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    {partCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    name="price"
                    value={newPart.price}
                    onChange={handlePartInputChange}
                    placeholder="Price (₹)"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <select
                    name="condition"
                    value={newPart.condition}
                    onChange={handlePartInputChange}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={newPart.inStock}
                      onChange={handlePartInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">In Stock</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="description"
                    value={newPart.description}
                    onChange={handlePartInputChange}
                    placeholder="Description (optional)"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addPart}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors flex items-center space-x-2"
                  >
                    <PlusIcon className="h-4 w-4" />
                    <span>Add Part</span>
                  </button>
                </div>
              </div>

              {/* Parts List */}
              {formData.detailedParts.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">
                    Added Parts ({formData.detailedParts.length}):
                  </h4>
                  {formData.detailedParts.map((part, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-blue-50 p-3 rounded-lg"
                    >
                      <div className="flex-1">
                        <span className="font-medium">{part.partName}</span>
                        <span className="text-gray-600 ml-2">
                          ({part.category})
                        </span>
                        {part.price > 0 && (
                          <span className="text-green-600 ml-2">
                            ₹{part.price}
                          </span>
                        )}
                        <span className="text-sm text-gray-500 ml-2">
                          [{part.condition}]
                        </span>
                        <span className="text-sm text-gray-500 ml-2">
                          Qty: {part.quantity}
                        </span>
                        <span
                          className={`text-xs ml-2 px-2 py-1 rounded ${
                            part.inStock
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {part.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removePart(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Seller Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Seller Information - विक्रेता की जानकारी *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="sellerInfo.sellerName"
                  value={formData.sellerInfo.sellerName}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <input
                  type="tel"
                  name="sellerInfo.contactNumber"
                  value={formData.sellerInfo.contactNumber}
                  onChange={handleInputChange}
                  placeholder="Contact Number (10 digits)"
                  pattern="[0-9]{10}"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <input
                  type="email"
                  name="sellerInfo.email"
                  value={formData.sellerInfo.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  name="sellerInfo.location"
                  value={formData.sellerInfo.location}
                  onChange={handleInputChange}
                  placeholder="Location/City"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/cars")}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-colors flex items-center space-x-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <CheckCircleIcon className="h-5 w-5" />
                )}
                <span>{loading ? "Posting..." : "Post Car Parts"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostCar;
