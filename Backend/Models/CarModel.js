// models/Car.js
import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  carName: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1
  },
  image: {
    type: String,
    required: true,
    default: 'https://via.placeholder.com/400x300?text=Car+Image'
  },
  
  // Main categories of available parts (like in your image)
  availablePartsCategories: {
    bodyParts: {
      type: Boolean,
      default: false
    },
    electricals: {
      type: Boolean,
      default: false
    },
    acParts: {
      type: Boolean,
      default: false
    },
    mechanicalParts: {
      type: Boolean,
      default: false
    },
    engineParts: {
      type: Boolean,
      default: false
    }
  },

  // Detailed parts list (like in your image)
  detailedParts: [{
    partName: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Maintenance Service Parts', 'Air Conditioning', 'Belts Chains and Rollers',
        'Bearings', 'Body', 'Control Cables', 'Brake System', 'Car Accessories',
        'Electric Components', 'Sensors Relays and Control units', 'Exhaust System',
        'Fuel Supply System', 'Gaskets and Sealing', 'Windscreen Cleaning System',
        'Interior and comfort', 'Lighting', 'Oils and Fluids', 'Pipes and Hoses',
        'Glowplug System', 'Steering', 'Towbar Parts', 'Transmission', 'Trims',
        'Universal', 'Wheels', 'Engine', 'Tyres and Alloys', 'Clutch System',
        'Engine Cooling System'
      ]
    },
    price: {
      type: Number,
      min: 0
    },
    condition: {
      type: String,
      enum: ['New', 'Used', 'Good Condition', 'Refurbished'],
      default: 'Good Condition'
    },
    inStock: {
      type: Boolean,
      default: true
    },
    quantity: {
      type: Number,
      default: 1,
      min: 0
    },
    description: {
      type: String,
      trim: true
    }
  }],

  // General description (like "All Body Parts", "All Electricals" etc.)
  generalDescription: {
    type: String,
    trim: true
  },

  // Seller info (hidden on frontend)
  sellerInfo: {
    sellerName: {
      type: String,
      required: true,
      trim: true
    },
    contactNumber: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    location: {
      type: String,
      required: true,
      trim: true
    }
  },

  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
carSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for better search performance
carSchema.index({ carName: 'text', brand: 'text', model: 'text' });
carSchema.index({ brand: 1, model: 1, year: 1 });
carSchema.index({ 'detailedParts.category': 1 });

export const CarModel = mongoose.model("Car", carSchema);
