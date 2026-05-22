import multer from 'multer';
import path from 'path';
import ApiError from '../utils/ApiError.js';

/**
 * Multer File Upload Middleware
 * Configures file uploads with:
 * - Memory storage (for Cloudinary streaming upload)
 * - 5MB file size limit
 * - Image-only file type validation
 */

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        'Invalid file type. Only JPEG, JPG, PNG, GIF, and WebP images are allowed.',
        400
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
  },
  fileFilter,
});

export default upload;
