import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getAllUsers, getProfile } from "../controllers/userController.js";

const router = express.Router();

router.get(
  "/profile",
  authMiddleware,
  getProfile
);
router.get('/all-users', getAllUsers);


export default router;