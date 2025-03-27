const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer Storage for Blog Images
const blogImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog_images", // Folder in Cloudinary for blogs
    format: async (req, file) => "png", // Convert all images to PNG
    public_id: (req, file) => `blog-${Date.now()}-${file.originalname}`, // Unique filename
  },
});

// Configure Multer Storage for Profile Images
const profileImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile_images", // Folder in Cloudinary for profiles
    format: async (req, file) => "png", // Convert all images to PNG
    public_id: (req, file) => `profile-${Date.now()}-${file.originalname}`, // Unique filename
  },
});

// Create Multer Upload Handlers
const uploadBlogImage = multer({ storage: blogImageStorage });
const uploadProfileImage = multer({ storage: profileImageStorage });

module.exports = { uploadBlogImage, uploadProfileImage, cloudinary };
