import { Router } from "express";
import {sendjob,getJob,deleteJob } from "../controller/Takejob.js";
import { isAdmin, isAuth } from "../util/auth.js";
const router = Router();
router.post("/:id",sendjob);
router.get("/:id",getJob);
router.delete("/:id", deleteJob);

export default router;