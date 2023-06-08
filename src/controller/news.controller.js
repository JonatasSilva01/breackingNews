import { createService } from "../services/news.service";

const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !text || !banner)
      res.status(400).send({ message: "submit all fields for registration" });

    await createService({
        title,
        text,
        banner,
        id: "objectidfake1",
    })

    res.status(201).send("Ok create");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findAll = (req, res) => {
  const news = [];
  res.send(news);
};

export { create, findAll };
