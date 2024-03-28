const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
        },
        phone: {
            type: String,
            required: [true, "Phone is requied"],
        },
        password: {
            type: String,
            required: [true, "password is requied"],
        },
        isAdmin: {
            type: Boolean,
        },
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

    },
    { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);