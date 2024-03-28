const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Service Name is Required"]
  },
  date: {
    type: Date,
    required: [true, "Date is Required"]
  },
  description: {
    type: String,
    required: [true, 'description Required'],
  },
  image: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('service ', serviceSchema)