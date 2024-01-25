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
    
});

const user = model("user", userSchema);
export default user;
