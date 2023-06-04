import express from "express";
import useRoute from "./src/routes/user.route.js";
import conectDatabase from "./src/database/db.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

conectDatabase();
// está apto para ler arquivos #json#
app.use(express.json());
app.use("/user", useRoute);
app.listen(port, () =>
  console.log(`estou ouvindo a porta http://localhost:${port}`)
);
