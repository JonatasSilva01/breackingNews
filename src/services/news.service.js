import News from "../models/News.js";

export const createService = (body) => News.create(body);
export const findAllService = (offset, limit) =>
  // populate = relashion ship
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");
// cont Document ele conta quantos documentos tem no banco de dados;
export const contNews = () => News.countDocuments();

// ele vai trazer sempre o utimo id a ser criado
export const topNewsService = () =>
  News.findOne().sort({ _id: -1 }).populate("user");

export const findByIdService = (id) => News.findById(id).populate("user");

// aplicar um $regex = comando do mongo db e $options tbm
export const searchByTitleService = (title) =>
  News.find({ title: { $regex: `${title || ""}`, $options: "i" } })
    .sort({ _id: -1 })
    .populate("user");


// aqui ele vai consultar o Id do usuario e trazer com ele sempre a utima postagem dele
export const byUserService = (id) =>
  News.find({ user: id }).sort({ _id: -1 }).populate("user");
