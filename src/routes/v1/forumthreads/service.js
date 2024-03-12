import model from "./model.js";

async function getAll({ limit, page, search = "" }) {
  const query = { deleted: false };
  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  const populatedResults = await model
    .find(query)
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit))
    .populate("author", "-password");

  return populatedResults;
}
async function getAllByUser(userId) {
  const query = { deleted: false, author: userId };

  const populatedResults = await model
    .find(query)
    .populate("author", "-password");

  return populatedResults;
}

async function getById(id) {
  return await model
    .findOne({ deleted: false, _id: id })
    .populate("author", "-password");
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

export default { getAll, getAllByUser, getById, add, update, removeOne };
