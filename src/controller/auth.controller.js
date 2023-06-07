import bcrypt from "bcrypt";
import { loginService } from "../services/auth.service.js";

const login = async (req, res) => {
  // tudo o que for pegar vai vir do body do corpo da req(request)
  const { email, password } = req.body;
  try {
    // bucando o 'user' para poder comparar as senhas que somente o bcrypt sabe.
    const user = await loginService(email);

    // se não existir retornar um status 404
    if(!user) res.status(404).send({ message: "user or password not found!" });

    // aqui posso usar o compareSync ou compare(porem tenho que utilizar o await)
    const isPasswordIsValid = bcrypt.compareSync(password, user.password);

    // se a senha for digitada incorretamente retorna um bad request 400
    if (!isPasswordIsValid)
      res.status(404).send({ message: "user or password not found!" });

    // ocorreu tudo bem!
    res.send("login ok");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default { login };
