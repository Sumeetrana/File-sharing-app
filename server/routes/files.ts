import multer from 'multer';
import express from 'express';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import File from '../models/File';

const router = express.Router();

const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post("/upload", upload.single("myFile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is not provided" })
    }
    console.log(req.file);
    let uploadedFile: UploadApiResponse
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "fileSharing",
        resource_type: "auto"
      })
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Cloudinary error" })
    }
    const { originalname } = req.file;
    const { secure_url, bytes, format } = uploadedFile;
    const file = new File({
      filename: originalname,
      sizeInBytes: bytes,
      secure_url,
      format
    })
    file.save((err, data) => {
      if (err) {
        console.log("Mongo Error: ", err);

        return res.status(400).json({ error: err })
      }
      res.status(201).json({
        id: file._id,
        downloadPageLink: `${process.env.API_BASE_ENDPOINT_CLIENT}download/${file._id}`
      });
    })
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: error })
  }
})

export default router;