import { useState } from "react";
import { Link } from "react-router-dom";
import { StarIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";

const CarCard = ({ car, variant = "default", onDelete }) => {
  const isHomeVariant = variant === "home";
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePin, setDeletePin] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteCar = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (deletePin.length !== 4) {
      alert("कृपया 4 अंकों का पिन दर्ज करें! Please enter a 4-digit PIN!");
      return;
    }

    setDeleteLoading(true);

    try {
      const response = await fetch(
        `https://car-tt1u.onrender.com/api/cars/delete/${car._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pin: deletePin }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("कार सफलतापूर्वक हटा दी गई! Car deleted successfully!");
        setShowDeleteModal(false);
        setDeletePin("");
        // Call onDelete callback if provided (to refresh the list)
        if (onDelete) {
          onDelete(car._id);
        }
      } else {
        alert(data.message || "गलत पिन! Wrong PIN!");
      }
    } catch (error) {
      console.error("Error deleting car:", error);
      alert("कार को हटाने में त्रुटि! Error deleting car!");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  return (
    <>
      <div
        className={`group bg-white ${
          isHomeVariant
            ? "rounded-2xl shadow-lg hover:shadow-2xl border-2 border-gray-100 hover:border-blue-200 hover:-translate-y-2"
            : "rounded-lg shadow-md hover:shadow-xl"
        } overflow-hidden transition-all duration-300 relative`}
      >
        {/* Delete Button */}
        <button
          onClick={handleDeleteClick}
          className="absolute top-2 left-2 z-10 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors opacity-0 group-hover:opacity-100"
          title="Delete Car"
        >
          <TrashIcon className="h-4 w-4" />
        </button>

        <div className={`relative ${isHomeVariant ? "overflow-hidden" : ""}`}>
          <img
            src={car.image}
            alt={car.carName}
            className={`w-full object-cover ${
              isHomeVariant
                ? "h-56 group-hover:scale-110 transition-transform duration-500"
                : "h-48"
            }`}
          />
          {isHomeVariant && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
                Featured
              </div>
            </>
          )}
          <div
            className={`absolute ${
              isHomeVariant
                ? "top-4 right-4 bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                : "top-2 right-2 bg-blue-600 px-2 py-1 rounded text-sm"
            } text-white`}
          >
            {car.year}
          </div>
        </div>
        <div className={isHomeVariant ? "p-6" : "p-4"}>
          <div
            className={`flex items-center ${isHomeVariant ? "mb-3" : "mb-2"}`}
          >
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`${
                  isHomeVariant ? "h-5 w-5" : "h-4 w-4"
                } text-yellow-400 fill-yellow-400`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">(4.9)</span>
          </div>
          <h3
            className={`font-bold text-gray-900 ${
              isHomeVariant ? "text-xl mb-2" : "text-lg mb-1"
            }`}
          >
            {car.brand} {car.model}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            {car.year} • Premium Quality Parts Available
          </p>
          <div className="flex items-center justify-between">
            <Link
              to={`/car/${car._id}`}
              className={`${
                isHomeVariant
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-6 py-3 text-sm font-semibold shadow-lg hover:shadow-xl"
                  : "bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm"
              } text-white rounded-lg transition-all duration-200`}
            >
              View Parts
            </Link>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowDeleteModal(false);
              setDeletePin("");
            }
          }}
        >
          <div
            className="bg-white rounded-lg max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Car - कार हटाएं
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteModal(false);
                  setDeletePin("");
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-800 text-sm font-medium mb-1">
                  ⚠️ Warning: This action cannot be undone!
                </p>
                <p className="text-red-800 text-sm">
                  चेतावनी: यह क्रिया पूर्ववत नहीं की जा सकती!
                </p>
                <p className="text-red-700 text-xs mt-2">
                  Deleting:{" "}
                  <span className="font-semibold">
                    {car.brand} {car.model} ({car.year})
                  </span>
                </p>
              </div>

              <form onSubmit={handleDeleteCar} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter 4-Digit PIN - 4 अंकों का पिन दर्ज करें *
                  </label>
                  <input
                    type="password"
                    value={deletePin}
                    onChange={(e) =>
                      setDeletePin(
                        e.target.value.replace(/\D/g, "").slice(0, 4)
                      )
                    }
                    maxLength={4}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-center text-2xl tracking-widest"
                    placeholder="••••"
                    autoFocus
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={deleteLoading || deletePin.length !== 4}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                  >
                    {deleteLoading ? "Deleting..." : "Delete"}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeleteModal(false);
                      setDeletePin("");
                    }}
                    disabled={deleteLoading}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarCard;
