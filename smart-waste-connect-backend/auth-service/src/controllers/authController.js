import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateTokens } from "../lib/utils.js";

// 🧾 Signup Controller
export const signup = async (req, res) => {
  try {
    const { full_name, address, email, role, phone, password } = req.body;

    // ✅ Check duplicate phone
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this phone" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      full_name,
      address,
      email,
      role,
      phone,
      password: hashed,
    });

    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// 🔐 Login Controller (by phone)
export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const accessToken = generateTokens(user, res)


    return res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        full_name: user.full_name,
        role: user.role,
        phone: user.phone,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      path: '/',
    });

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to log out',
    });
  }
};


// ♻️ Refresh Token Controller
export const refresh = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ success: false, message: "No refresh token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ success: true, accessToken });
  } catch (error) {
    console.error("Refresh error:", error.message);
    return res.status(403).json({ success: false, message: "Invalid refresh token" });
  }
};
