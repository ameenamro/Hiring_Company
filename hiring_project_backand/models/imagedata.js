import mongoose from "mongoose";
const imageSchema = new mongoose.Schema({
    name: String,
    cuisine: String,
    servingTemperature: String,
    imageUrl: String,
    createdAt: { type: Date, default: Date.now },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "worker"
      }
});

const Image = mongoose.model('Image', imageSchema);

export default Image;