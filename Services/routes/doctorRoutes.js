const express = require('express');
const router = express.Router();
const doctorController = require('../controller/doctorController');
const upload = require('../utils/multer')

// Define routes related to user operations
router.post('/create-doctor', upload.single('image'), doctorController.createDoctor);
router.get('/get-doctors', doctorController.getDoctors);
router.get('/get-doctor-to-appoint', doctorController.getDoctorToAppoint);
// router.get('/get-current-user', serviceController.getCurrentUser);

module.exports = router;