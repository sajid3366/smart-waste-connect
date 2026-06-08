import User from '../models/user.model.js'
import bcrypt from 'bcrypt'

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
    const { name, email } = req.body
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    user.name = name || user.name
    user.email = email || user.email
    await user.save()
    res.json(user)
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
