const Appointment = require('../models/appointment');

const appointmentController = {
    // Register a new user
    createDoctorAppointment: async (req, res) => {
        try {
            const data = req.body;
            let newAppointment = {}
            if (req.body.userId) {
                newAppointment = ({
                    user: req.body.userId,
                    email: req.body.email,
                    date: req.body.date,
                    time: req.body.time,
                    note: req.body.note,
                    doctor: req.body.doctorId,
                    service: req.body.serviceId,
                    status: 'pending'
                });
            } else {
                newAppointment = ({
                    user: req.body.googleId,
                    email: req.body.googleEmail,
                    date: req.body.date,
                    time: req.body.date,
                    note: req.body.note,
                    doctor: req.body.doctorId,
                    service: req.body.serviceId,
                    status: 'pending'
                });
            }

            // console.log(newAppointment)

            const appointment = new Appointment(newAppointment)

            await appointment.save()
            console.log(appointment)

            res.status(200).json({ message: "Appointment created successfully", data: appointment });
        } catch (error) {
            console.log('cannot get the data')
        }
    },
    getUserAppointment: async (req, res) => {
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
    },
};

module.exports = appointmentController;
