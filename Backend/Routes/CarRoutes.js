
import express from 'express';
import { PostCar, getAllCars, getFeaturedCars, getCarById } from '../Controllers/CarControllers.js';
import { uploadCarPhoto } from '../Middleware/Upload.js';

const carRouter = express.Router();

carRouter.post("/post-car", uploadCarPhoto, PostCar);
carRouter.get("/all", getAllCars);
carRouter.get("/featured", getFeaturedCars);
carRouter.get("/:id",  getCarById);

export default carRouter;
