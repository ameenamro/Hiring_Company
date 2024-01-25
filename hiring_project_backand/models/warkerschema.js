import mongoose from "mongoose";
import multer from "multer";

const workerSchema = new mongoose.Schema({
    username:
    {
        required: [true, "email is required"],
        type: String,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "Email must be unique"],
    },
    password: {
        type: String,
        required: [true, "email is required"],
        required: true
    },


    profession:{type: String} ,
    expeience: {type: String},
    role: {
        type: String,
        enum: ['admin', 'employee'], // Add valid roles as needed
        required: true,
        default:"employee"
      },
});


const worker = mongoose.model("worker", workerSchema);

export default worker;