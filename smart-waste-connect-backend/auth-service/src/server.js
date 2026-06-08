import './config/env.js'
import app from './app.js'
import connectDB from './config/db.js'

const PORT = process.env.PORT

app.listen(PORT || 5001, '0.0.0.0', () => {
  console.log(`Auth service running on port ${PORT || 5001}`)
  connectDB()
})
