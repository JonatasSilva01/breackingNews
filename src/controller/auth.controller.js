import bcrypt from "bcrypt";
import { generateTokenService, loginService } from "../services/auth.service.js";

const login = async (req, res) => {
  // tudo o que for pegar vai vir do body do corpo da req(request)
  const { email, password } = req.body;
  try {
    const user = await loginService(email);

    if (!user) res.status(404).send({ message: "user or password not found!" });

    const isPasswordIsValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordIsValid)
      res.status(404).send({ message: "user or password not found!" });

    //gera o token e passa o token para o usuario q vence a cada 24 horas 
    const token = generateTokenService(user.id);

    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default { login };
