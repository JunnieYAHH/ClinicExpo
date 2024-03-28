const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({

    user: {
        type: String,
        ref: 'user'
    },
    email: {
        type: String,
        required: [true, "Donor Email is Required"]
    },
    date: {
        type: Date,
        required: [true, "You need date to appoint"]
    },
    time: {
        type: String,
        required: [true, "You need the appointment time"]
    },
    note: {
        type: String,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctor",
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "service"
    },
    status: {
        type: String,
        default: 'pending',
    }
}, { timestamps: true });

module.exports = mongoose.model('appointment ', appointmentSchema)