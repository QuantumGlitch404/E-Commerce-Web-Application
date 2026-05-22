import { v2 as cloudinary } from 'cloudinary';

/**
 * Cloudinary Configuration
 * Configures cloudinary for image uploads with folder organization.
 */
const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

/**
 * Upload an image to Cloudinary
 * @param {string} filePath - Local file path or base64 data URI
 * @param {string} folder - Cloudinary folder name
 * @returns {object} { public_id, url }
 */
export const uploadImage = async (filePath, folder = 'luxeshop') => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    quality: 'auto',
    fetch_format: 'auto',
    transformation: [{ width: 1000, crop: 'limit' }],
  });

  return {
    public_id: result.public_id,
    url: result.secure_url,
  };
};

/**
 * Delete an image from Cloudinary
 * @param {string} publicId - Cloudinary public_id of the image
 */
export const deleteImage = async (publicId) => {
  if (publicId) {
    await cloudinary.uploader.destroy(publicId);
  }
};

export { cloudinary };
export default configureCloudinary;
