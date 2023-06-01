const mongoose = require("mongoose");

const conectDatabase = () => {
  console.log("Wait connecting to the database");

  mongoose
    .connect(
      "mongodb+srv://root:root@cluster0.gd8ajlr.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDb Atalas connected"))
    .catch((error) => console.log(error));
};

module.exports = conectDatabase;
