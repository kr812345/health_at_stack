import mongoose from 'mongoose';

const specialistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  service: {
    type: String,
    required: true,
    enum: ['cardiology', 'neurology', 'orthopedics', 'general', 'dermatology'],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  availability: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  bio: {
    type: String,
    required: true,
  },
  education: [{
    degree: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  }],
  experience: [{
    position: {
      type: String,
      required: true,
    },
    hospital: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
  }],
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
  }],
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
export const Specialist = mongoose.models.Specialist || mongoose.model('Specialist', specialistSchema);