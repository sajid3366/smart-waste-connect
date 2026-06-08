import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {
  getAllUsers,
  getProfile,
  updateProfile,
  changePassword
} from '../controllers/userController.js'
import upload from '../middleware/upload.js'

const router = express.Router()

router.get('/profile', authMiddleware, getProfile)
router.get('/all-users', getAllUsers)
// router.patch('/update-profile', authMiddleware, updateProfile)
router.patch(
  '/update-profile',
  authMiddleware,
  upload.single('profile_pic'),
  updateProfile
)
router.patch('/change-password', authMiddleware, changePassword)

export default router
