import model from "./model.js";

async function getAll({ limit, page }) {
  const query = { deleted: false };

  const populatedResults = await model
    .find(query)
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit))
    .populate("author post");
  return populatedResults;
}

async function getAllByPost(postId, { page = 1, limit = 10 }) {
  const query = { deleted: false, post: postId };

  const populatedResults = await model
    .find(query)
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit))
    .populate("author");

  return populatedResults;
}

async function getAllByArticle(articleId) {
  const query = { deleted: false, article: articleId };

  const populatedResults = await model
    .find(query)
    .populate("author", "-password");
  return populatedResults;
}

async function getById(id) {
  return await model.findOne({ deleted: false, _id: id });
}

async function add(_body, session) {
  return await model.create([_body], { session });
}

async function update(filter, _body, session) {
  return await model.findOneAndUpdate(filter, _body, { new: true, session });
}

async function removeOne(filter, session) {
  return await model.findOneAndUpdate(
    filter,
    { deleted: true },
    { new: true, session }
  );
}

export default {
  getAll,
  getAllByArticle,
  getAllByPost,
  getById,
  add,
  update,
  removeOne,
};
