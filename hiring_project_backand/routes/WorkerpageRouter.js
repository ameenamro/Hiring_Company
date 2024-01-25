import { Router } from "express";
import { workercreate, workerlogin, workerProfile,dataWorkers,getWorkerById, SetImage,getImage} from "../controller/Workercontroller.js";
import { isAdmin, isAuth } from "../util/auth.js";
import multer from "multer";
import path from 'path';

const router = Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './image');  // Replace with the actual destination path
    },
    filename: function (req, file, cb) {
      // Use a unique filename, for example, the current timestamp + original filename
      const uniqueFilename = Date.now()+'-'+ file.originalname +".jpg";
      cb(null, uniqueFilename);
    },
  });
const upload = multer({ storage: storage });
router.post("/register", workercreate);
router.post("/login",workerlogin);
router.get("/", dataWorkers);
router.get("/:id",getWorkerById);
router.post("/uploadphoto/:id",upload.single('image'),SetImage);
router.get("/uploadphoto/:id",upload.single('image'),getImage);


export default router;