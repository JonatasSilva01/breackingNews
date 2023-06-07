import { Router } from "express";
import authController from "../controller/auth.controller.js";
const router = Router();
router.post("/", authController.login);
export default router;
