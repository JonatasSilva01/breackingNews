import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const loginService = (email) =>
  User.findOne({ email: email }).select("+password");
// faça uma pesquisa sobre MD5 para criar um texto para gerar uma chave unica para o genarate token
// 86400 segundos é equivalente a 24horas
const generateTokenService = (id) =>
  jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 });

export { loginService, generateTokenService };
