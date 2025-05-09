const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['requester', 'responder'],
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  preferredRoutes: [{
    start: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: [Number]
    },
    end: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: [Number]
    },
    days: [String], // Array of days when this route is preferred
    time: String    // Preferred time
  }],
  vehicle: {
    type: String,
    enum: ['bike', 'car'],
    required: function() {
      return this.role === 'responder';
    }
  },
  profilePicture: String,
  points: {
    type: Number,
    default: 0
  },
  ratings: [{
    rating: Number,
    comment: String,
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  emergencyContacts: [{
    name: String,
    phone: String,
    relationship: String
  }],
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Method to check password
userSchema.methods.checkPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
