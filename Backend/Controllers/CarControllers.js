import { CarModel } from "../Models/CarModel.js";
import dotenv from 'dotenv';
dotenv.config();

export const PostCar = async (req, res) => {

  try {

    const {
      carName,
      brand,
      model,
      year,
      availablePartsCategories,
      detailedParts,
      generalDescription,
      sellerInfo
    } = req.body;

    const carImage = req.file ? req.file.path : 'https://via.placeholder.com/400x300?text=Car+Image';

    if (!carName || !brand || !model || !year || !sellerInfo) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: carName, brand, model, year, and sellerInfo'
      });
    }

    // Parse JSON strings if they come as strings from form data
    const parsedSellerInfo = typeof sellerInfo === 'string' ? JSON.parse(sellerInfo) : sellerInfo;
    const parsedAvailablePartsCategories = typeof availablePartsCategories === 'string' 
      ? JSON.parse(availablePartsCategories) : availablePartsCategories || {};
    const parsedDetailedParts = typeof detailedParts === 'string' 
      ? JSON.parse(detailedParts) : detailedParts || [];

    // Validate seller info
    const { sellerName, contactNumber, email, location } = parsedSellerInfo;
    if (!sellerName || !contactNumber || !email || !location) {
      return res.status(400).json({
        success: false,
        message: 'कृपया विक्रेता की पूरी जानकारी प्रदान करें'
      });
    }

    // Create new car document
    const newCar = new CarModel({
      carName,
      brand,
      model,
      year: parseInt(year),
      image: carImage,
      availablePartsCategories: parsedAvailablePartsCategories,
      detailedParts: parsedDetailedParts,
      generalDescription,
      sellerInfo: {
        sellerName,
        contactNumber,
        email,
        location
      }
    });

    // Save to database
    const savedCar = await newCar.save();

    res.status(201).json({
      success: true,
      message: 'कार सफलतापूर्वक जोड़ी गई! Car posted successfully!',
      data: {
        ...savedCar.toObject(),
        sellerInfo: undefined // Hide seller info in response
      }
    });

  } catch (error) {
    console.error('Error posting car:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get all cars (hide seller info)
export const getAllCars = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search = '',
      brand = '',
      minYear = '',
      maxYear = ''
    } = req.query;

    let query = { isActive: true };

    if (search) {
      query.$or = [
        { carName: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } }
      ];
    }

    if (brand) {
      query.brand = { $regex: brand, $options: 'i' };
    }

    if (minYear || maxYear) {
      query.year = {};
      if (minYear) query.year.$gte = parseInt(minYear);
      if (maxYear) query.year.$lte = parseInt(maxYear);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const cars = await CarModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-sellerInfo -__v'); // Hide seller info

    const totalCars = await CarModel.countDocuments(query);
    const totalPages = Math.ceil(totalCars / parseInt(limit));

    res.status(200).json({
      success: true,
      data: cars,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCars,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1
      }
    });

  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};


export const getCarById = async (req, res) => {
  try {
    console.log("aaya")
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Car ID is required'
      });
    }

    const car = await CarModel.findById(id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'कार नहीं मिली - Car not found'
      });
    }

    console.log(car)

    res.status(200).json({
      success: true,
      data: car
    });

  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get featured cars for homepage
export const getFeaturedCars = async (req, res) => {
  try {
    const featuredCars = await CarModel.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .select('carName brand model year image availablePartsCategories generalDescription');


    res.status(200).json({
      success: true,
      data: featuredCars
    });

  } catch (error) {
    console.error('Error fetching featured cars:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};





export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { pin } = req.body;

    // Validate inputs
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Car ID is required - कार आईडी आवश्यक है'
      });
    }

    if (!pin) {
      return res.status(400).json({
        success: false,
        message: 'PIN is required - पिन आवश्यक है'
      });
    }

    // Verify PIN from environment variable
    const DELETE_PIN = process.env.DELETE_PIN ;
    
    if (pin !== DELETE_PIN) {
      return res.status(401).json({
        success: false,
        message: 'Invalid PIN - गलत पिन'
      });
    }

    // Find and delete the car
    const deletedCar = await CarModel.findByIdAndDelete(id);

    if (!deletedCar) {
      return res.status(404).json({
        success: false,
        message: 'Car not found - कार नहीं मिली'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Car deleted successfully - कार सफलतापूर्वक हटा दी गई',
      data: {
        deletedCarId: id,
        carName: deletedCar.carName
      }
    });

  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};