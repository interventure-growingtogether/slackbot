const Article = require("./article.model");

const getAllArticles = () => Article.find({});

// add / create new
const createNewArticle = async (link, tags) => {
  const newArticle = new Article({ tags, link });
  return newArticle.save();
};

// edit
const updateArticle = async (id, tags, link) => {
  return Article.findByIdAndUpdate(id, { tags, link });
};

// delete article
const deleteArticle = async id => Article.findByIdAndDelete(id);

// accept
const acceptArticle = async id =>
  Article.findByIdAndUpdate(id, { accept: true });

module.exports = {
  getAllArticles,
  createNewArticle,
  updateArticle,
  deleteArticle,
  acceptArticle
};
