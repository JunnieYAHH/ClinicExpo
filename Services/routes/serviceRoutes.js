const express = require('express');
const router = express.Router();
const serviceController = require('../controller/serviceController');
const upload = require('../utils/multer')

// Define routes related to user operations
router.post('/create-service', upload.single('image'), serviceController.createService);
router.get('/get-services', serviceController.getServices);
router.get('/get-service-to-appoint', serviceController.getServiceToAppoint);
// router.get('/get-current-user', serviceController.getCurrentUser);

module.exports = router;