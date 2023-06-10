import { Router } from "express";
import { create, findAll, topNews } from "../controller/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topNews);

export default router;
