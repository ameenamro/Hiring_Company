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
        data: Buffer, // Store image data as a buffer
        contentType: String, // Store the content type of the image
      },
    profession:{type: String} ,
    experience: {type: String},
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      },
});


const worker = mongoose.model("worker", workerSchema);

export default worker;