const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  responder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed', 'cancelled'],
    default: 'pending'
  },
  pickup: {
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
  destination: {
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
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date
  },
  vehicleType: {
    type: String,
    enum: ['bike', 'car'],
    required: true
  },
  route: [{
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: [Number]
  }],
  distance: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  pointsAwarded: {
    type: Number,
    default: 0
  },
  rating: {
    requesterRating: {
      rating: Number,
      comment: String
    },
    responderRating: {
      rating: Number,
      comment: String
    }
  },
  tracking: {
    active: Boolean,
    lastLocation: {
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: [Number]
    },
    lastUpdate: Date
  },
  emergency: {
    active: Boolean,
    timestamp: Date,
    resolved: Boolean
  }
}, {
  timestamps: true
});

const Ride = mongoose.model('Ride', rideSchema);
module.exports = Ride;
