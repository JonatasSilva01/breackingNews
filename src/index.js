import express from "express";
import conectDatabase from "./database/db.js";
import dotenv from "dotenv";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import newsRoute from "./routes/news.route.js";
import swaggerRote from "./routes/swagger.route.cjs";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

conectDatabase();
// está apto para ler arquivos #json#
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/news", newsRoute);
app.use("/doc", swaggerRote);


app.listen(port, () =>
  console.log(`estou ouvindo a porta http://localhost:${port}`)
);
