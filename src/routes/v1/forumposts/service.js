import model from "./model.js";

async function getAll({ limit, page }) {
  const query = { deleted: false };

  const populatedResults = await model
    .find(query)
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit))
    .populate("thread");

  return populatedResults;
}

async function getAllByThread(threadId) {
  const query = { deleted: false, thread: threadId };

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

export default { getAll, getAllByThread, getById, add, update, removeOne };
