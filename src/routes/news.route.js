import { Router } from "express";
import {
  create,
  findAll,
  findById,
  topNews,
  searchByTitle,
} from "../controller/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = Router();

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topNews);
router.get("/search", searchByTitle);

// passando um parametro(":id") para pegar o valor no controller ex: req.params
router.get("/:id", authMiddleware, findById);

export default router;
