import { findByIdService } from "../services/news.service.js";
import userService from "../services/user.service.js";
import mongoose from "mongoose";

export const validId = (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid Id" });
    }

    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const validUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await userService.findByIdService(id);

    if (!user) {
      return res.status(400).send({ message: "User not found!" });
    }

    req.id = id;
    req.user = user;

    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const validPostNews = async (req, res, next) => {
  try {
    const { title, text, banner } = req.body;
    const { id } = req.params;

    if (!title && text && !banner)
      res
        .status(400)
        .send({ message: "Pelomenos um capo precisa ser atualizado!" });

    const post = await findByIdService(id);

    if (String(post.user.id) !== req.userId)
      res.status(400).send({ message: "token é invalido" });

    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
