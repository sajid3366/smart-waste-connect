import jwt from 'jsonwebtoken'

export const generateTokens = (user, res) => {
  // 🧪 For testing: expire fast
  const accessToken = jwt.sign(
    { id: user._id, name: user.userName, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '3d' }
  )

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    path: '/',
    domain:
      process.env.NODE_ENV === 'production'
        ? 'localhost'
        : 'localhost',
    maxAge: 3 * 24 * 60 * 60 * 1000
  })

  return { accessToken, refreshToken }
}
