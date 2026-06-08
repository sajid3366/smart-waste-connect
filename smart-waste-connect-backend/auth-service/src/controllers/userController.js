import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import cloudinary from '../config/cloudinary.js'

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')

    res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      correlationId: req.correlationId,
      message: error.message
    })
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { full_name, email, address, phone } = req.body

    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ error: 'User not found' })

    user.full_name = full_name || user.full_name
    user.email     = email     || user.email
    user.address   = address   || user.address
    user.phone     = phone     || user.phone

    // Upload to Cloudinary if image provided
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'smart-waste-connect/profiles',
            upload_preset: 'smart-waste-connect',  // your preset
            public_id: `user_${req.user.id}`,       // overwrites same user's old image
            overwrite: true,
          },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        )
        stream.end(req.file.buffer)  // push buffer into stream
      })

      user.profile_pic = uploadResult.secure_url  // ← full Cloudinary CDN URL
    }

    await user.save()

    const updated = user.toObject()
    delete updated.password

    res.status(200).json({ success: true, user: updated })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}

export const changePassword = async (req, res) => {
  try {
    const { current_password, new_password } = req.body
    // console.log('body:', req.body)
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    const isMatch = await bcrypt.compare(current_password, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' })
    }

    user.password = await bcrypt.hash(new_password, 10)
    await user.save()

    res
      .status(200)
      .json({ success: true, message: 'Password changed successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}
