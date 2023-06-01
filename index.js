const express = require("express");
const useRoute = require("./src/routes/user.route.js");
const conectDatabase = require("./src/database/db.js");

const app = express();
const port = 3000;

conectDatabase();
// está apto para ler arquivos #json#
app.use(express.json());
app.use("/user", useRoute);
app.listen(port, () =>
  console.log(`estou ouvindo a porta http://localhost:${port}`)
);
