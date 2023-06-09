import { createService, findAllService } from "../services/news.service.js";

export const create = async (req, res) => {
  try {
    const { authorization } = req.headers;
    
    if(!authorization) send(401);

    // aqui estou pegando as palavras chaves com metodo split(" ") separando eles com espaço;
    const parts = authorization.split(" "); // [ 'Bearer', 'TOKEN' ]

    if(parts.length !== 2) res.send(401); // se tiver juntos as palavras chaves não vai funcionar

    // aqui estou fazendo uma desconstrução de array [ 'Bearer', 'TOKEN' ]
    const [schema, token] = parts;

    if(schema !== "Bearer") res.send(401); // acesso negado!
 
    

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
