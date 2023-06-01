const userService = require("../services/user.service.js");

const create = async (req, res) => {
    const {name, username, email, password, avatar, background} = req.body;
    
    // verificando se os objetos estão prenchidos ou não
    if(!name||!username||!email||!password||!avatar||!background) { 
        // lançando um erro com bad request caso os dados foram inseridos incorretamente
        res.status(400).send({message:"submit all fields for registration"});
    }

    const user = await userService.create(req.body);

    if(!user) {
        return res.status(401).send({message: "Error creating User"})
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
            background
        },
    });
}

module.exports = { create }