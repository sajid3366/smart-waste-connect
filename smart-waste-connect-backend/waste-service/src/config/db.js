import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME || 'waste_service'
    })
    console.log(`[Waste Service] MongoDB connected`)
  } catch (error) {
    console.error('[Waste Service] MongoDB connection error:', error.message)
    process.exit(1)
  }
}

export default connectDB
