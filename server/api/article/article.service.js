const Article = require("./article.model");

const findByTag = (tags) => Article.find({ tags });

const getAllArticles = () => Article.find({});

// add / create new
const createNewArticle = (link, tags) => {
  const newArticle = new Article({ tags, link });
  return newArticle.save();
};

// edit
const updateArticle = (id, tags, link) => Article.findByIdAndUpdate(id, { tags, link });

// delete article
const deleteArticle =  (id) => Article.findByIdAndDelete(id);

// accept
const acceptArticle = (id) => Article.findByIdAndUpdate(id, { accepted: true });

module.exports = {
  getAllArticles,
  createNewArticle,
  updateArticle,
  deleteArticle,
  acceptArticle,
  findByTag
};
