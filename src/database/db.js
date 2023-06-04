import mongoose from "mongoose";

const conectDatabase = () => {
  console.log("Wait connecting to the database");

  // conecxão com banco de dados MongoDb utilizando Mongoose
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDb Atalas connected"))
    .catch((error) => console.log(error));
};

export default conectDatabase;
