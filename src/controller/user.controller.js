import userService from "../services/user.service.js";

// criando um user
const create = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;

    // verificando se os objetos estão prenchidos ou não
    if (!name || !username || !email || !password || !avatar || !background) {
      // lançando um erro com bad request caso os dados foram inseridos incorretamente
      res.status(400).send({ message: "submit all fields for registration" });
    }

    // espera a resposta do moongose para fazer a criação dos dados em json;
    const user = await userService.createService(req.body);

    // se não tiver usuario ira retornar um 401
    if (!user) {
      return res.status(401).send({ message: "Error creating User" });
    }

    // fazendo um POST(evio) do json na API confirmando que deu tudo certo com o cadastro
    res.status(201).send({
      message: "User created successfully",
      user: {
        id: user._id,
        name,
        username,
        email,
        password,
        avatar,
        background,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// listando todos os usuarios
const findAll = async (req, res) => {
  try {
    const users = await userService.findAllService();

    if (users.length === 0) {
      return res.status(400).send({ message: "No registered users" });
    }

    res.send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// listando um usuario por Id
const findById = async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// atualizando um item por vez
const updateId = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;

    // verificando se os objetos estão prenchidos ou não
    if (!name && !username && !email && !password && !avatar && !background) {
      // lançando um erro com bad request caso os dados foram inseridos incorretamente
      res.status(400).send({ message: "submit at least one field for update" });
    }

    const { id, user } = req;
    
    if (!user) {
      return res.status(401).send({ message: "Error creating User" });
    }

    await userService.updateService(
      id,
      name,
      username,
      email,
      password,
      avatar,
      background
    );

    res.send({ message: "User sucesses fully updated!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export default { create, findAll, findById, updateId };
