import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {
  getAllUsers,
  getProfile,
  updateProfile,
  changePassword
} from '../controllers/userController.js'

const router = express.Router()

router.get('/profile', authMiddleware, getProfile)
router.get('/all-users', getAllUsers)
router.patch('/update-profile', authMiddleware, updateProfile)
router.patch('/change-password', authMiddleware, changePassword)

export default router
