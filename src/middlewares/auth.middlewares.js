import dotenv from "dotenv";
import userService from "../services/user.service.js";
import jwt from "jsonwebtoken";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) send(401);

    // aqui estou pegando as palavras chaves com metodo split(" ") separando eles com espaço;
    const parts = authorization.split(" "); // resultado do console.log [ 'Bearer', 'TOKEN' ]

    if (parts.length !== 2) res.send(401);

    // aqui estou fazendo uma desconstrução de array [ 'Bearer', 'TOKEN' ]
    const [schema, token] = parts;

    if (schema !== "Bearer") res.send(401); // acesso negado!

    // jwt.verify(toke(string), chave screcreta, options: function)
    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) res.status(401).send({ message: "token has expired" });

      // aqui ele espera a respota do banco de dados e pega o id e verifica se o id é o mesmo
      const user = await userService.findByIdService(decoded.id);

      if (!user || !user.id) res.status(401).send({ message: "invalid Id" });

      // quando ele passar por todas as validações ele vai retornar um user.id valido e colocar na variavel
      // por ex: req.banana = user.id
      req.userId = user.id;

      return next();
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
