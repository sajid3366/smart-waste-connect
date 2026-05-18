import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME || 'auth_service',
    })
    console.log(`[Auth Service] MongoDB connected`)
  } catch (error) {
    console.error('[Auth Service] MongoDB connection error:', error.message)
    process.exit(1)
  }
}

export default connectDB
