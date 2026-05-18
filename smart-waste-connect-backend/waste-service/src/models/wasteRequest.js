import mongoose from 'mongoose';

const WasteRequestSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    address: { type: String, required: true },
    type: {
      type: String,
      enum: ['household', 'commercial', 'hazardous'],
      default: 'household'
    },
    status: {
      type: String,
      enum: ['requested', 'scheduled', 'collected', 'cancelled'],
      default: 'requested'
    },
    scheduledAt: { 
      type: Date,
      validate: {
        validator: function(value) {
          return !value || value > Date.now();
        },
        message: 'Scheduled date must be in the future'
      }
    }
  },
  { timestamps: true }
);

export default mongoose.model('WasteRequest', WasteRequestSchema);
