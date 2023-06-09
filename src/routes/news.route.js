import { Router } from "express";
import { create, findAll } from "../controller/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = Router();

router.get("/", findAll);
router.post("/", authMiddleware, create);

export default router;
