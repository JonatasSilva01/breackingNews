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
// aqui eu declaro o search e faço as pesquisa por query com
// a var=title que posso pesquisar qualquer noticia pelo titulo
router.get("/search", searchByTitle);

// passando um parametro(":id") para pegar o valor no controller ex: req.params
router.get("/:id", authMiddleware, findById);

export default router;
