const Doctor = require('../models/doctor');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'ds7jufrxl',
    api_key: '827497948387292',
    api_secret: 'qZygsilGaETbzQ5rnN8v-k8Ai4g',
})

const doctorController = {
    // Register a new user
    createDoctor: async (req, res) => {
        try {
            const { name, email, gender, service, image, review } = req.body;

            // Upload image to Cloudinary
            // const uploadedImage = await cloudinary.uploader.upload(image, { folder: 'doctors' });

            // Map the reviews array to properly format the reviews
            const reviews = review.map(item => ({
                rating: item.rating,
                comment: item.comment
            }));

            // Create new doctor instance
            const doctor = new Doctor({
                name,
                email,
                gender,
                service,
                // image: { public_id: uploadedImage.public_id, url: uploadedImage.secure_url },
                review: reviews
            });

            // Save doctor to database
            await doctor.save();

            res.status(201).json({ message: 'Doctor created successfully', doctor });
        } catch (error) {
            console.error('Error on Creating a Doctor: ', error.message);
            res.status(500).json({ message: 'Create a Doctor Error' });
        }
    },
    getDoctors: async (req, res) => {
        try {
            const { serviceId } = req.query;
            let query = {};
            if (serviceId) {
                query = { 'service': serviceId };
            }
    
            const doctors = await Doctor.find(query);
            // console.log(doctors)
    
            res.status(200).json({ message: "Doctors fetched successfully", doctors });
        } catch (error) {
            console.error("Fetch Doctors Error:", error);
            res.status(500).json({ message: "Fetch Doctors Error" });
        }
    },
    getDoctorToAppoint: async (req, res) => {
        try {
            const { doctorId } = req.query;
            let query = {};
            if (doctorId) {
                query = { '_id': doctorId };
            }
            // console.log(query);
            const doctor = await Doctor.findOne(query)
    
            res.status(201).json({ message: "Services fetch successfully", doctor });
        } catch (error) {
            console.error("Fetch Service Error:", error);
            res.status(500).json({ message: "Create Service Error" });
        }
    }
};

module.exports = doctorController;
