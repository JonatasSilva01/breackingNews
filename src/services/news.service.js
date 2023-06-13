import News from "../models/News.js";

// criando uma noticia
export const createService = (body) => News.create(body);

// pegando todas as noticias
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

// atualizado um dado no banco de dados
export const updateService = (id, title, text, banner) =>
  News.findOneAndUpdate(
    { _id: id },
    { title, text, banner },
    {
      rawResult: true,
    }
  );

// deletando um usuario no mongoDb
export const deleteIdService = (id) => News.findByIdAndDelete({ _id: id });

// atualizando o array para que ele coloque o like de um usuario cadastrado
export const likeNewsService = (idNews, userId) =>
  News.findOneAndUpdate(
    // eu verifico se o id é o mesmo porque se for ele não coloca o like simplesmente mantem o like ali
    { _id: idNews, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, created: new Date() } } }
  );

// caso ele clique no like novamente esse like que ja estava ali vai ser removido
export const deleteLikeNewsService = (idNews, userId) =>
  News.findOneAndUpdate({ _id: idNews }, { $pull: { likes: { userId } } });

// adicionando comentarios aula 29

export const addCommentService = (idNews, comment, userId) => {
  let idComment = Math.floor(Date.now() * Math.random()).toString(36);

  return News.findOneAndUpdate(
    { _id: idNews },
    {
      $push: {
        comment: { idComment, userId, comment, createdAt: new Date() },
      },
    }
  );
};



export const removedCommentService = (idNews, idComment, userId) =>
  News.findOneAndUpdate(
    { _id: idNews },
    {
      $pull: {
        comment: {
          idComment,
          userId,
        }
      },
    }
  );
