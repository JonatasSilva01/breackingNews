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
