import mongoose from 'mongoose';



const carSchema = new mongoose.Schema({
  

}, { timestamps: true });

const Car = mongoose.model("Car", carSchema);

export { Car };
