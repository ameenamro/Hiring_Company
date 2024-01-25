// Import the express module
import express from 'express';
import dotenv from "dotenv";
import UserPage from "./routes/UserPageRouter.js"
import workerPage from "./routes/WorkerpageRouter.js"
import RESpage from "./routes/RESpageRouter.js"
import { errorHandler } from "./middleware/errorHandling.js";
import cors from "cors"
import connectDB from "./config/db.js";

const server = express();
dotenv.config();

const PORT = process.env.PORT || 4000;
server.use(cors())
server.use(express.json());
server.use('/api/v1/user',UserPage);
server.use('/api/v1/worker',workerPage);
server.use('/api/v1/jobRES',RESpage);
server.use(errorHandler);



connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});