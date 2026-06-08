import multer from 'multer'

// Store in RAM, not disk — we'll forward to Cloudinary
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/
    allowed.test(file.mimetype) ? cb(null, true) : cb(new Error('Images only'))
  }
})

export default upload