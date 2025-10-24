
import express from 'express';
import { PostCar, getAllCars, getFeaturedCars, getCarById, deleteCar } from '../Controllers/CarControllers.js';
import { uploadCarPhoto } from '../Middleware/Upload.js';

const carRouter = express.Router();

carRouter.post("/post-car", uploadCarPhoto, PostCar);
carRouter.get("/all", getAllCars);
carRouter.get("/featured", getFeaturedCars);
carRouter.get("/:id",  getCarById);
carRouter.delete('/delete/:id', deleteCar);

export default carRouter;
