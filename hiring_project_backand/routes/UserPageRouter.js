import { Router } from "express";
import { createUser, loginUser, userProfile } from "../controller/Userpagecontroller.js";


import { isAdmin, isAuth } from "../util/auth.js";
const router = Router();
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/profile",isAuth, userProfile);
router.get("/admin", isAuth, isAdmin);



export default router;