/**
 * Cloudinary Utilities for File Management
 *
 * This module provides functions to upload files to Cloudinary and delete them.
 * It handles local file cleanup after upload and proper error handling.
 *
 * Features:
 * - Upload local files to Cloudinary with automatic resource type detection
 * - Delete files from Cloudinary by their URL
 * - Automatic cleanup of local files after upload, even if the upload fails
 */

import fs from "fs";
import { v2 as cloudinary } from "cloudinary";


// At the top of cloudinary.js
if (!process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET) {
  console.error('❌ Missing Cloudinary configuration in environment variables');
  throw new Error('Cloudinary credentials not configured');
}


// Configure Cloudinary with credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file to Cloudinary from a local file path
 *
 * @param {string} localFilePath - Path to the local file to upload
 * @returns {Promise<object|null>} Cloudinary response object or null if upload failed
 */
// const uploadOnCloudinary = async (localFilePath) => {
//   console.log("I m here"+localFilePath);
//   try {
//     if (!localFilePath) {
//       return null;
//     }
//     // Upload file to Cloudinary with automatic resource type detection
//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });
//
//     // Clean up the local file after successful upload
//     fs.unlinkSync(localFilePath);
//     return response;
//   } catch (error) {
//     // Clean up local file even if upload fails
//     fs.unlinkSync(localFilePath);
//     return null;
//   }
// };

// In cloudinary.js
const uploadOnCloudinary = async (localFilePath) => {
  console.log(`Attempting upload from: ${localFilePath}`);

  try {
    if (!localFilePath) {
      console.error('No file path provided');
      return null;
    }

    // Verify file exists
    if (!fs.existsSync(localFilePath)) {
      console.error(`File not found: ${localFilePath}`);
      return null;
    }

    // Add debug logging for Cloudinary config
    console.log('Cloudinary config:', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY?.substring(0, 6) + '...',
      api_secret: process.env.CLOUDINARY_API_SECRET?.substring(0, 6) + '...'
    });

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      timeout: 30000 // 30-second timeout
    });

    console.log(`Cloudinary upload success: ${response.public_id}`);
    fs.unlinkSync(localFilePath);
    return response;

  } catch (error) {
    console.error('Cloudinary upload error:', {
      message: error.message,
      stack: error.stack,
      file: localFilePath
    });

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

/**
 * Extracts the public ID from a Cloudinary URL
 * This function is referenced but not defined in the original code
 *
 * @param {string} url - Cloudinary URL
 * @returns {string|null} Public ID or null if extraction fails
 */
const extractPublicIdFrom = (url) => {
  try {
    // Extract the public ID from URLs like:
    // https://res.cloudinary.com/cloud-name/image/upload/v1234567890/folder/filename.jpg
    const urlParts = url.split("/");
    const fileNameWithExtension = urlParts[urlParts.length - 1];
    const fileName = fileNameWithExtension.split(".")[0];

    // If there's a folder structure in the public ID
    if (urlParts[urlParts.length - 2] !== "upload") {
      let folderPath = "";
      let foundUpload = false;

      for (let i = 0; i < urlParts.length; i++) {
        if (foundUpload) {
          folderPath += urlParts[i] + "/";
        }
        if (urlParts[i] === "upload") {
          foundUpload = true;
        }
      }

      // Return folder path + filename without the trailing slash and extension
      return folderPath.slice(0, -1).replace(/\.[^/.]+$/, "");
    }

    return fileName;
  } catch (error) {
    console.log("Error extracting public ID:", error);
    return null;
  }
};

/**
 * Deletes a file from Cloudinary using its URL
 *
 * @param {string} fileUrl - Cloudinary URL of the file to delete
 * @returns {Promise<object|null>} Deletion result or null if deletion failed
 */
const cloudinaryDelete = async (fileUrl) => {
  if (!fileUrl) {
    console.log("No file URL provided for delete");
    return null;
  }
  try {
    const publicId = extractPublicIdFrom(fileUrl);
    if (!publicId) {
      console.log(`Could not extract public ID from URL: ${fileUrl}`);
      return null;
    }

    // Determine resource type (video or image) based on URL
    const resourceType = fileUrl.includes("/video/upload") ? "video" : "image";
    const deletionResult = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true, // Invalidate CDN caches
    });

    return deletionResult;
  } catch (error) {
    console.log("Cloudinary deletion error: ", error);
    throw new Error(`Failed to delete file from Cloudinary: ${error.message}`);
  }
};

export { uploadOnCloudinary, cloudinaryDelete };
