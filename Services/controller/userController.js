const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');
const crypto = require('crypto');

// Controller methods for user operations
//endpoint to login in the app
const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey
}
const secretKey = generateSecretKey()

cloudinary.config({
    cloud_name: 'ds7jufrxl',
    api_key: '827497948387292',
    api_secret: 'qZygsilGaETbzQ5rnN8v-k8Ai4g',
})


const userController = {
    // Register a new user
    register: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            req.body.password = hashedPassword

            // const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

            // Get the URL of the uploaded image from req.file
            const imageUrl = req.file.path;
            // console.log(imageUrl)

            // Upload image to Cloudinary
            const result = await cloudinary.uploader.upload(imageUrl, {
                folder: 'Clinic/users',
                width: 150,
                crop: "scale"
            });

            // Create a new user object with the Cloudinary URL
            let user = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                isAdmin: req.body.isAdmin,
                image: { public_id: result.public_id, url: result.secure_url }
            });

            console.log(user)
            user = await user.save();
            return res.status(201).json({
                success: true,
                message: 'User Registered Successfully',
                user
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Error in Register API',
                error
            })
        }
    },

    // Login user
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ message: 'Invalid Email or Password' });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid Password' });
            }

            const token = jwt.sign({ userId: user._id }, secretKey);
            res.status(200).json({ token });
        } catch (error) {
            console.error("Login Error:", error); // Add this line to log the error
            res.status(500).json({ message: "Login Error" });
        }
    },

    // Get current user
    getCurrentUser: async (req, res) => {
        try {
            const { user_id } = req.query;
            let query = {};
            if (user_id) {
                query = { '_id': user_id };
            }
            // console.log(query);
            const user = await User.findOne(query)

            res.status(201).json({ message: "Current User fetch successfully", user });
        } catch (error) {
            console.error("Fetch User Error:", error);
            res.status(500).json({ message: "Get Current User Error" });
        }
    },

    // Get current user appointment
    getCurrentUserAppointment: async (req, res) => {
        try {
            const { user } = req.query;
            console.log('User ID', user);

            // Find appointments for the specified user
            const appointment = await Appointment.find({ user: user });
            console.log(appointment)

            res.status(200).json({ message: "Appointments fetched successfully", appointment });
        } catch (error) {
            console.log('Error on Getting the User Appointment', error.message);
            res.status(500).json({ message: "Error fetching appointments", error: error.message });
        }
    }
};

module.exports = userController;
