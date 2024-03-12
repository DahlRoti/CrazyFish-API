// service.js

import model from "./model.js";

async function getAll({ limit, page, filter }) {
  return await model
    .find({ deleted: false, ...filter })
    .limit(limit * 1)
    .skip(limit == 0 ? 0 : (page - 1) * limit);
}

const getByEmail = async (email) => {
  return await model.findOne({ email, deleted: false });
};

const getByUsername = async (username) => {
  return await model.findOne({ username, deleted: false });
};

async function getById(id) {
  return await model.findById(id);
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

async function countTotalUsers() {
  return await model.countDocuments({
    deleted: false,
    userType: { $not: { $eq: "Admin" } },
  });
}

async function countUnregisteredUsers() {
  return await model.countDocuments({
    deleted: false,
    userType: "Unregistered",
  });
}

export default {
  getAll,
  getByEmail,
  getByUsername,
  getById,
  add,
  update,
  removeOne,
  countTotalUsers,
  countUnregisteredUsers,
};
