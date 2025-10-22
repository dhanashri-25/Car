import multer from 'multer';

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});




const donarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blood-donors',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
  },
});

const upload = multer({ 
  storage: donarStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, 
  }
});

export const uploadDonorPhoto = upload.single('donorPhoto');