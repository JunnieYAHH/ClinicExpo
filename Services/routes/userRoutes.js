const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const upload = require('../utils/multer')

// Define routes related to user operations
router.post('/register', upload.single('image'), userController.register);
router.post('/login', userController.login);
router.get('/get-current-user', userController.getCurrentUser);
router.get('/get-user-appointment', userController.getCurrentUserAppointment);

module.exports = router;