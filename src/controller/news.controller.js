import { ObjectId } from "mongoose";
import { createService, findAllService } from "../services/news.service.js";

export const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !banner || !text) {
      res.status(400).send({
        message: "Submit all fields for registration",
      });
    }

    await createService({
      title,
      text,
      banner,
      user: { _id: "648009b37d10d8819deb810a" },
    }).catch((err) => console.log(err.message));

    res.send(201);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const news = await findAllService();

    if (news.length === 0)
      return res.status(400).send({ message: "No registered users" });

    res.send(news);
    
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
