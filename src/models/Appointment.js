import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  specialist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Specialist',
    required: true,
  },
  service: {
    type: String,
    required: true,
    enum: ['cardiology', 'neurology', 'orthopedics', 'general', 'dermatology'],
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
    minlength: [10, 'Please provide a detailed reason for your visit'],
  },
  mode: {
    type: String,
    required: true,
    enum: ['in-person', 'online'],
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  payment: {
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    transactionId: {
      type: String,
    },
  },
  location: {
    type: String,
    required: function() {
      return this.mode === 'in-person';
    },
  },
  meetingLink: {
    type: String,
    required: function() {
      return this.mode === 'online';
    },
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Create model if it doesn't exist
export const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);