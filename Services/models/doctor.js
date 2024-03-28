const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Doctor Name is Required"]
    },
    email: {
        type: String,
        required: [true, 'email Required'],
    },
    gender: {
        type: String,
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "service"
    },
    review: [
        {
            rating: {
                type: Number,
                min: 1,
                max: 5
            },
            comment: {
                type: String,
                required: true
            },
        }
    ],
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

module.exports = mongoose.model('doctor', doctorSchema)