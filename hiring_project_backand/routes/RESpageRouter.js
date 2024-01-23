import { Router } from "express";
import {sendjob,getJob } from "../controller/Takejob.js";
import { isAdmin, isAuth } from "../util/auth.js";
const router = Router();
router.post("/:id",sendjob);
router.get("/:id",getJob);
export default router;