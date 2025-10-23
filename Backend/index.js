import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
import carRouter from "./Routes/CarRoutes.js";
import { connectDB } from "./DB/connectDB.js";



dotenv.config()

const app = express();

app.use(express.json())
app.use(cookieParser());


app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true
}));


app.use("/api/cars" , carRouter)

app.get("/" , (req , res) => {
  res.send("Hii From Backend")
})


connectDB();
app.listen(5000 , () => {
  console.log(`Server is ruunning successfully at  : http://localhost:5000`)
})