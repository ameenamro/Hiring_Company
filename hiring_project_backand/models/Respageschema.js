import mongoose from "mongoose";
const RESSchema = new mongoose.Schema({

    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'worker'},
    username: {
        type: String,
        
    },
    email: {
        type: String,
    },
    number: {
        type: String,
    },

    location: {
        type: String
    },
    description: { type: String },
    experience: { type: String },

});


const RES = mongoose.model("RES", RESSchema);
export default RES;