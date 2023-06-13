import { Router } from "express";
import {
  create,
  findAll,
  findById,
  topNews,
  searchByTitle,
  byUser,
  update,
  deleteId,
  likeNews,
  commentAdd,
  removedComment,
} from "../controller/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { validPostNews } from "../middlewares/global.middlewares.js";

const router = Router();

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topNews);

// aqui eu declaro o search e faço as pesquisa por query com
// a var=title que posso pesquisar qualquer noticia pelo titulo
router.get("/search", searchByTitle);

// aqui ele vai trazer o usuario que está logado
// porque o token dele tem as informações do id do usuario que esta logado
router.get("/byUser", authMiddleware, byUser);

// passando um parametro(":id") para pegar o valor no controller ex: req.params
router.get("/:id", authMiddleware, findById);

// atualizando um dado
router.patch("/:id", authMiddleware, validPostNews, update);

// deletando post
router.delete("/:id", authMiddleware, deleteId);

// dando like no post
router.patch("/like/:id", authMiddleware, likeNews);

// fazendo comentarios
router.patch("/comment/:id", authMiddleware, commentAdd);

// removendo um comentario
router.patch("/comment/:idNews/:idComment", authMiddleware, removedComment);

export default router;
