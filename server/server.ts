import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { v2 as cloudinary } from 'cloudinary';

import connectDB from './config/db';
import fileRoutes from './routes/files';

const app = express();
dotenv.config();

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_API_CLOUD,
})

connectDB();

app.use(cors());

app.use("/api/files", fileRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
})