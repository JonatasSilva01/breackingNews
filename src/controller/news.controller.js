import { createService, findAllService } from "../services/news.service.js";

export const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !banner || !text)
      res.status(400).send({
        message: "Submit all fields for registration",
      });

    /* 
      gambiarra pra resolver de maneira legitimo depois porque quando dei send pra
      enviar os dados ele retorna bad request porem ele ainda da o post e envia
      os dados para o banco de dados.
    */
    if (title.length === 0 || banner.length === 0 || text.length === 0){
      return;
    }

    await createService({
      title,
      text,
      banner,
      user: req.userId,
    });

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
