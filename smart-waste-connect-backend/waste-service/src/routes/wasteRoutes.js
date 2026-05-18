import express from 'express'
import {
  createWasteRequest,
  getWasteRequests,
  getWasteRequestById,
  updateWasteStatus
} from '../controllers/wasteController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
const router = express.Router()

router.post('/',authenticateUser, createWasteRequest)
router.get('/',   getWasteRequests)
router.get('/:id', getWasteRequestById)
router.patch('/:id/status', updateWasteStatus)

export default router;
