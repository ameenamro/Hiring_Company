// Import the express module
import express from 'express';
import dotenv from "dotenv";
import UserPage from "./routes/UserPageRouter.js"
import { errorHandler } from "./middleware/errorHandling.js";
const server = express();
dotenv.config();

const PORT = process.env.PORT || 4000;

server.use('/api/v1/user',UserPage);
server.use(errorHandler);


server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
