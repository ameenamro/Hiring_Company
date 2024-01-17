import { Schema, model } from "mongoose";
const userSchema = new Schema({
    username:
    {
        type: String,
        required: [true, "email is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "Email must be unique"],
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      },
      profileImage: {
        data: Buffer, // Store image data as a buffer
        contentType: String, // Store the content type of the image
      },
});

const users = model("users", userSchema);

export default users;
