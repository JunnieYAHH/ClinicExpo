const Service = require('../models/service');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'ds7jufrxl',
    api_key: '827497948387292',
    api_secret: 'qZygsilGaETbzQ5rnN8v-k8Ai4g',
})

const serviceController = {
    // Register a new user
    createService: async (req, res) => {
        try {
            const { name, doctor, date, description } = req.body;

            // Upload image to Cloudinary
            // const imageData = [];
            // const result = await cloudinary.uploader.upload(req.file.path, {
            //     folder: 'Clinic/services',
            //     width: 150,
            //     crop: "scale"
            // });
            // imageData.push({ public_id: result.public_id, url: result.secure_url });

            // Create a new service
            const service = new Service({
                name,
                doctor,
                date,
                description,
                // images: imageData,
            });

            // Save service to the database
            await service.save();

            // Return success response
            res.status(201).json({ message: "Service created successfully", service });
        } catch (error) {
            console.error("Create Service Error:", error);
            res.status(500).json({ message: "Create Service Error" });
        }
    },
    getServices: async (req, res) => {
        try {
            const services = await Service.find()

            res.status(201).json({ message: "Services fetch successfully", services });
        } catch (error) {
            console.error("Fetch Service Error:", error);
            res.status(500).json({ message: "Create Service Error" });
        }
    },
    getServiceToAppoint: async (req, res) => {
        try {
            const { serviceId } = req.query;
            let query = {};
            if (serviceId) {
                query = { '_id': serviceId };
            }
            // console.log(query);
            const service = await Service.findOne(query)

            res.status(201).json({ message: "Services fetch successfully", service });
        } catch (error) {
            console.error("Fetch Service Error:", error);
            res.status(500).json({ message: "Create Service Error" });
        }
    },
    
};

module.exports = serviceController;
