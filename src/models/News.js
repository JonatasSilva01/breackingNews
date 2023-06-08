import mongoose from "mongoose";

const NewsShema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  banner: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    // essa string precisa estar totalmente referente ao mesmo nome lá no arquivo User.js
    // const User = mongoose.model(-> "User" <- outros codigos.....);
    require: true,
  },
  likes: {
    type: Array,
    require: true,
  },
  comment: {
    type: Array,
    require: true,
  },
});

const News = mongoose.model("News", NewsShema);
// mongoose.model(referencia a collection no Mongo db, referencia a collection com os tipos dos dados);

export default News;
