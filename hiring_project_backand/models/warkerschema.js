import mongoose from "mongoose";
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

    profileImage: {
        data:String, // Store image data as a buffer
        contentType: String, // Store the content type of the image
      },
    rprofession:{type: String} ,
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