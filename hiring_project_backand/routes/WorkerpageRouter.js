import { Router } from "express";
import { workercreate, workerlogin, workerProfile,dataWorkers,getWorkerById } from "../controller/Workercontroller.js";
import { isAdmin, isAuth } from "../util/auth.js";

const router = Router();
router.post("/register", workercreate);
router.post("/login",workerlogin);
router.get("/", dataWorkers);
router.get("/:id",getWorkerById);


export default router;