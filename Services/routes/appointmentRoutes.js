const express = require('express');
const router = express.Router();
const appointmentController = require('../controller/appointmentController');
const upload = require('../utils/multer')

// Define routes related to user operations
router.post('/create-doctor-appointment', appointmentController.createDoctorAppointment);
router.get('/get-user-appointment', appointmentController.getUserAppointment);

module.exports = router;