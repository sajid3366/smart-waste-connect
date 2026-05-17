import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image:{type:String},
    role: {
      type: String,
      enum: ['driver', 'household', 'serviceprovider', 'buyer', 'admin'],
      required: true
    },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema) 
