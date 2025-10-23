// backend/scripts/dummyCars.js
import mongoose from 'mongoose';
import { CarModel } from './models/CarModel.js';
import dotenv from 'dotenv';

dotenv.config();

const dummyCarsData = [
  {
    carName: "Hyundai i20 All parts available",
    brand: "Hyundai",
    model: "i20",
    year: 2018,
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&h=300&fit=crop",
    generalDescription: "All parts available in good condition. Complete dismantled car with all original parts.",
    availablePartsCategories: {
      bodyParts: true,
      electricals: true,
      acParts: true,
      mechanicalParts: true,
      engineParts: true
    },
    detailedParts: [
      { partName: "Front Bumper", category: "Body", price: 8500, condition: "Good Condition", inStock: true, quantity: 1, description: "Original front bumper without any damage" },
      { partName: "Headlight Assembly", category: "Lighting", price: 12000, condition: "Good Condition", inStock: true, quantity: 2, description: "Both left and right headlights available" },
      { partName: "Engine Block", category: "Engine", price: 45000, condition: "Good Condition", inStock: true, quantity: 1, description: "Complete engine block in working condition" },
      { partName: "AC Compressor", category: "Air Conditioning", price: 15000, condition: "Good Condition", inStock: true, quantity: 1, description: "Working AC compressor" },
      { partName: "Brake Pads", category: "Brake System", price: 2500, condition: "New", inStock: true, quantity: 4, description: "Brand new brake pads set" },
      { partName: "Manual Transmission", category: "Transmission", price: 35000, condition: "Good Condition", inStock: true, quantity: 1, description: "Manual transmission in good working condition" }
    ],
    sellerInfo: {
      sellerName: "Rajesh Kumar",
      contactNumber: "9876543210",
      email: "rajesh.kumar@email.com",
      location: "Delhi, India"
    }
  },
  
  {
    carName: "Maruti Swift Complete Parts",
    brand: "Maruti Suzuki",
    model: "Swift",
    year: 2016,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=300&fit=crop",
    generalDescription: "Complete Maruti Swift parts available. All major components in stock.",
    availablePartsCategories: {
      bodyParts: true,
      electricals: true,
      acParts: false,
      mechanicalParts: true,
      engineParts: true
    },
    detailedParts: [
      { partName: "Rear Door", category: "Body", price: 6500, condition: "Good Condition", inStock: true, quantity: 2, description: "Left and right rear doors" },
      { partName: "Alternator", category: "Electric Components", price: 8500, condition: "Refurbished", inStock: true, quantity: 1, description: "Refurbished alternator" },
      { partName: "Clutch Assembly", category: "Clutch System", price: 12000, condition: "Good Condition", inStock: true, quantity: 1, description: "Complete clutch assembly" },
      { partName: "Fuel Pump", category: "Fuel Supply System", price: 4500, condition: "Good Condition", inStock: true, quantity: 1, description: "Electric fuel pump" }
    ],
    sellerInfo: {
      sellerName: "Amit Sharma",
      contactNumber: "9876543211",
      email: "amit.sharma@email.com",
      location: "Mumbai, India"
    }
  },

  {
    carName: "Honda City Engine & Body Parts",
    brand: "Honda",
    model: "City",
    year: 2019,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&h=300&fit=crop",
    generalDescription: "Honda City dismantled parts. Engine and body parts in excellent condition.",
    availablePartsCategories: {
      bodyParts: true,
      electricals: true,
      acParts: true,
      mechanicalParts: false,
      engineParts: true
    },
    detailedParts: [
      { partName: "Hood", category: "Body", price: 9500, condition: "Good Condition", inStock: true, quantity: 1, description: "Front hood without dents" },
      { partName: "ECU", category: "Electric Components", price: 18000, condition: "Good Condition", inStock: true, quantity: 1, description: "Engine control unit" },
      { partName: "Radiator", category: "Engine Cooling System", price: 7500, condition: "Good Condition", inStock: true, quantity: 1, description: "Cooling radiator" },
      { partName: "Side Mirror", category: "Body", price: 2500, condition: "Good Condition", inStock: true, quantity: 2, description: "Power side mirrors" }
    ],
    sellerInfo: {
      sellerName: "Suresh Gupta",
      contactNumber: "9876543212",
      email: "suresh.gupta@email.com",
      location: "Bangalore, India"
    }
  },

  {
    carName: "Tata Nexon All Mechanical Parts",
    brand: "Tata",
    model: "Nexon",
    year: 2020,
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500&h=300&fit=crop",
    generalDescription: "Tata Nexon mechanical parts available. Perfect for repairs and replacements.",
    availablePartsCategories: {
      bodyParts: false,
      electricals: true,
      acParts: true,
      mechanicalParts: true,
      engineParts: true
    },
    detailedParts: [
      { partName: "Shock Absorber", category: "Belts Chains and Rollers", price: 8500, condition: "Good Condition", inStock: true, quantity: 4, description: "Complete shock absorber set" },
      { partName: "Battery", category: "Electric Components", price: 6500, condition: "New", inStock: true, quantity: 1, description: "Brand new car battery" },
      { partName: "Exhaust Pipe", category: "Exhaust System", price: 4500, condition: "Good Condition", inStock: true, quantity: 1, description: "Complete exhaust system" },
      { partName: "Steering Wheel", category: "Steering", price: 3500, condition: "Good Condition", inStock: true, quantity: 1, description: "Power steering wheel" }
    ],
    sellerInfo: {
      sellerName: "Vikram Singh",
      contactNumber: "9876543213",
      email: "vikram.singh@email.com",
      location: "Pune, India"
    }
  },

  {
    carName: "Mahindra XUV300 Body & Electric",
    brand: "Mahindra",
    model: "XUV300",
    year: 2021,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&h=300&fit=crop",
    generalDescription: "XUV300 body parts and electrical components. All parts tested and verified.",
    availablePartsCategories: {
      bodyParts: true,
      electricals: true,
      acParts: false,
      mechanicalParts: false,
      engineParts: false
    },
    detailedParts: [
      { partName: "Tail Light", category: "Lighting", price: 4500, condition: "Good Condition", inStock: true, quantity: 2, description: "LED tail lights" },
      { partName: "Dashboard", category: "Interior and comfort", price: 15000, condition: "Good Condition", inStock: true, quantity: 1, description: "Complete dashboard assembly" },
      { partName: "Wiring Harness", category: "Electric Components", price: 8500, condition: "Good Condition", inStock: true, quantity: 1, description: "Main wiring harness" },
      { partName: "Door Handle", category: "Body", price: 1500, condition: "Good Condition", inStock: true, quantity: 4, description: "All door handles" }
    ],
    sellerInfo: {
      sellerName: "Priya Patel",
      contactNumber: "9876543214",
      email: "priya.patel@email.com",
      location: "Ahmedabad, India"
    }
  },

  {
    carName: "Toyota Innova Engine Parts",
    brand: "Toyota",
    model: "Innova",
    year: 2017,
    image: "https://images.unsplash.com/photo-1570479231693-58c4c7928e8e?w=500&h=300&fit=crop",
    generalDescription: "Toyota Innova engine and transmission parts. High quality OEM parts.",
    availablePartsCategories: {
      bodyParts: false,
      electricals: false,
      acParts: true,
      mechanicalParts: true,
      engineParts: true
    },
    detailedParts: [
      { partName: "Turbocharger", category: "Engine", price: 35000, condition: "Good Condition", inStock: true, quantity: 1, description: "Turbo assembly" },
      { partName: "Gearbox", category: "Transmission", price: 45000, condition: "Good Condition", inStock: true, quantity: 1, description: "Manual gearbox" },
      { partName: "AC Evaporator", category: "Air Conditioning", price: 8500, condition: "Good Condition", inStock: true, quantity: 1, description: "AC evaporator coil" },
      { partName: "Oil Filter", category: "Maintenance Service Parts", price: 450, condition: "New", inStock: true, quantity: 5, description: "Engine oil filters" }
    ],
    sellerInfo: {
      sellerName: "Mohammed Ali",
      contactNumber: "9876543215",
      email: "mohammed.ali@email.com",
      location: "Hyderabad, India"
    }
  },

  {
    carName: "Volkswagen Polo Complete Set",
    brand: "Volkswagen",
    model: "Polo",
    year: 2015,
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=300&fit=crop",
    generalDescription: "Complete Volkswagen Polo parts available. German engineering quality.",
    availablePartsCategories: {
      bodyParts: true,
      electricals: true,
      acParts: true,
      mechanicalParts: true,
      engineParts: true
    },
    detailedParts: [
      { partName: "Alloy Wheels", category: "Wheels", price: 12000, condition: "Good Condition", inStock: true, quantity: 4, description: "15-inch alloy wheels" },
      { partName: "Brake Disc", category: "Brake System", price: 3500, condition: "Good Condition", inStock: true, quantity: 4, description: "Front and rear brake discs" },
      { partName: "Windshield", category: "Body", price: 6500, condition: "Good Condition", inStock: true, quantity: 1, description: "Front windshield" },
      { partName: "Seat Cover", category: "Interior and comfort", price: 4500, condition: "Good Condition", inStock: true, quantity: 1, description: "Complete seat covers" }
    ],
    sellerInfo: {
      sellerName: "Anita Desai",
      contactNumber: "9876543216",
      email: "anita.desai@email.com",
      location: "Chennai, India"
    }
  },

  {
    carName: "Ford EcoSport Spare Parts",
    brand: "Ford",
    model: "EcoSport",
    year: 2016,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500&h=300&fit=crop",
    generalDescription: "Ford EcoSport spare parts in good condition. Genuine Ford parts.",
    availablePartsCategories: {
      bodyParts: true,
      electricals: true,
      acParts: false,
      mechanicalParts: true,
      engineParts: false
    },
    detailedParts: [
      { partName: "Fog Light", category: "Lighting", price: 2500, condition: "Good Condition", inStock: true, quantity: 2, description: "Front fog lamps" },
      { partName: "Control Cable", category: "Control Cables", price: 4500, condition: "Good Condition", inStock: true, quantity: 2, description: "Gear control cables" },
      { partName: "Horn", category: "Electric Components", price: 850, condition: "Good Condition", inStock: true, quantity: 1, description: "Electric horn" },
      { partName: "Floor Mats", category: "Interior and comfort", price: 1200, condition: "Good Condition", inStock: true, quantity: 1, description: "Rubber floor mats set" }
    ],
    sellerInfo: {
      sellerName: "Ravi Mehta",
      contactNumber: "9876543217",
      email: "ravi.mehta@email.com",
      location: "Jaipur, India"
    }
  },

  {
    carName: "Nissan Micra Body Parts",
    brand: "Nissan",
    model: "Micra",
    year: 2014,
    image: "https://images.unsplash.com/photo-1606152421802-db97b8b94e9c?w=500&h=300&fit=crop",
    generalDescription: "Nissan Micra body parts and accessories. Good condition parts for restoration.",
    availablePartsCategories: {
      bodyParts: true,
      electricals: false,
      acParts: true,
      mechanicalParts: false,
      engineParts: false
    },
    detailedParts: [
      { partName: "Rear Bumper", category: "Body", price: 7500, condition: "Good Condition", inStock: true, quantity: 1, description: "Rear bumper assembly" },
      { partName: "AC Blower", category: "Air Conditioning", price: 3500, condition: "Good Condition", inStock: true, quantity: 1, description: "Cabin blower motor" },
      { partName: "Trunk Lid", category: "Body", price: 8500, condition: "Good Condition", inStock: true, quantity: 1, description: "Boot lid" },
      { partName: "Mud Flaps", category: "Car Accessories", price: 650, condition: "New", inStock: true, quantity: 4, description: "Rubber mud flaps" }
    ],
    sellerInfo: {
      sellerName: "Deepak Joshi",
      contactNumber: "9876543218",
      email: "deepak.joshi@email.com",
      location: "Lucknow, India"
    }
  },

  {
    carName: "Renault Duster Adventure Parts",
    brand: "Renault",
    model: "Duster",
    year: 2019,
    image: "https://images.unsplash.com/photo-1606016159991-d87d0a20ba2f?w=500&h=300&fit=crop",
    generalDescription: "Renault Duster parts for adventure enthusiasts. Off-road tested components.",
    availablePartsCategories: {
      bodyParts: true,
      electricals: true,
      acParts: true,
      mechanicalParts: true,
      engineParts: true
    },
    detailedParts: [
      { partName: "Roof Rail", category: "Car Accessories", price: 4500, condition: "Good Condition", inStock: true, quantity: 1, description: "Roof rails set" },
      { partName: "Differential", category: "Transmission", price: 25000, condition: "Good Condition", inStock: true, quantity: 1, description: "Rear differential" },
      { partName: "Skid Plate", category: "Body", price: 3500, condition: "Good Condition", inStock: true, quantity: 1, description: "Under body protection" },
      { partName: "Air Filter", category: "Maintenance Service Parts", price: 850, condition: "New", inStock: true, quantity: 3, description: "Engine air filters" },
      { partName: "Fuel Injector", category: "Fuel Supply System", price: 6500, condition: "Good Condition", inStock: true, quantity: 4, description: "Fuel injectors set" }
    ],
    sellerInfo: {
      sellerName: "Kavita Reddy",
      contactNumber: "9876543219",  
      email: "kavita.reddy@email.com",
      location: "Kochi, India"
    }
  }
];

// Function to seed dummy data
const seedDummyCars = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await CarModel.deleteMany({});
    console.log('🗑️ Cleared existing car data');

    // Insert dummy data
    const insertedCars = await CarModel.insertMany(dummyCarsData);
    console.log(`🚗 Successfully inserted ${insertedCars.length} dummy cars`);

    // Log some details
    console.log('\n📋 Summary:');
    insertedCars.forEach((car, index) => {
      console.log(`${index + 1}. ${car.carName} (${car.brand} ${car.model} ${car.year}) - ${car.detailedParts.length} parts`);
    });

    console.log('\n✨ Database seeded successfully with dummy car data!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedDummyCars();
