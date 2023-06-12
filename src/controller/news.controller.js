import {
  createService,
  findAllService,
  topNewsService,
  contNews,
  findByIdService,
  searchByTitleService,
  byUserService
} from "../services/news.service.js";

// essa função cria uma nova postagem
export const create = async (req, res) => {
  try {
    const { title, text, banner } = req.body;

    if (!title || !banner || !text)
      res.status(400).send({
        message: "Submit all fields for registration",
      });

    /* 
      gambiarra pra resolver de maneira legitimo depois porque quando dei send pra
      enviar os dados ele retorna bad request porem ele ainda da o post e envia
      os dados para o banco de dados.
    */
    if (title.length === 0 || banner.length === 0 || text.length === 0) {
      return;
    }

    await createService({
      title,
      text,
      banner,
      user: req.userId,
    });

    res.send(201);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// buscando os dados
export const findAll = async (req, res) => {
  try {
    // posso criar variaveis dentro das querys no HTTP
    // http://localhost:3000/news?limit=10&offset=0
    let { limit, offset } = req.query;

    // limit = numero de postagem para aparecer na tela
    // offset = de onde ele vai começar

    // para que eu possa fazer alguma coisa com esses valores eu vou converter esses valores.
    limit = Number(limit);
    offset = Number(offset);

    if (!limit) limit = 5;
    if (!offset) offset = 0;

    const news = await findAllService(offset, limit);

    const total = await contNews();

    const currentUrl = req.baseUrl; // http://localhots:3000/news

    const next = offset + limit;

    // aqui ele mostra a proxima pagina com os próximos dados;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    // aqui ele faz uma logica se o offset + o limit for menor do que 0 ele
    // automaticamente retorna null se não ele faz essa subtração
    const previous = offset - limit < 0 ? null : offset - limit;

    // aqui é o resultado da logica de previous ainda mostrando que se previos for diferente de nulo
    // ele gera uma nova url com novos dados
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (news.length === 0)
      return res.status(400).send({ message: "No registered users" });

    // aqui estou enviando para meu cliente(front end) os dados que vou trabalhar com news
    res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,

      // alem de vir os dados de gerar urls ele vai me levar os dados da postagem e do usurio que fez a postagem.
      results: news.map((newsItem) => ({
        id: newsItem._id,
        title: newsItem.title,
        text: newsItem.text,
        banner: newsItem.banner,
        likes: newsItem.likes,
        comments: newsItem.comment,
        name: newsItem.user.name,
        userName: newsItem.user.username,
        userAvatar: newsItem.user.avatar,
      })),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// aqui ele vai mandar sempre a utima noticia do dia
export const topNews = async (req, res) => {
  try {
    // toda vez que for fazer uma function async tem que colocar o await
    // no service quando ele for esperar algo do banco de dados
    const news = await topNewsService();

    if (!news)
      res.status(400).send({ message: "There is not registered post" });

    res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comment,
        name: news.user.name,
        userName: news.user.username,
        userAvatar: news.user.avatar,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// essa função pega a postagem por Id
export const findById = async (req, res) => {
  try {
    const { id } = req.params; // "/:id" -> localhost:3000/news/{id} "/:banana" -> fica em rotas -> banana: um valor qualquer

    console.log(req.params);

    const news = await findByIdService(id);

    // enviando uma resposta para meu cliente como json
    return res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comment,
        name: news.user.name,
        userName: news.user.username,
        userAvatar: news.user.avatar,
      },
    });
  } catch (error) {
    res.status(500).send({ message: message.error });
  }
};

export const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    const news = await searchByTitleService(title);

    if (news.length === 0)
      res.status(400).send({ message: "There are no posts with this title" });

    // como news retorna um array eu fiz um retorno desses dados com map e não de um objeto
    res.send({
      news: news.map((newsItem) => ({
        id: newsItem._id,
        title: newsItem.title,
        text: newsItem.text,
        banner: newsItem.banner,
        likes: newsItem.likes,
        comments: newsItem.comment,
        name: newsItem.user.name,
        userName: newsItem.user.username,
        userAvatar: newsItem.user.avatar,
      })),
    });
  } catch (error) {
    res.status(500).send({ message: message.error });
  }
};

export const byUser = async (req, res) => {
  try {
    const id = req.userId;
    const news = await byUserService(id);

    res.send({
      news: news.map((newsItem) => ({
        id: newsItem._id,
        title: newsItem.title,
        text: newsItem.text,
        banner: newsItem.banner,
        likes: newsItem.likes,
        comments: newsItem.comment,
        name: newsItem.user.name,
        userName: newsItem.user.username,
        userAvatar: newsItem.user.avatar,
      })),
    });
  } catch (error) {
    res.status(500).send({ message: message.error });
  }
};