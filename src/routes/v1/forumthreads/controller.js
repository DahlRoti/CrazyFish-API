import service from "./service.js";
import { transaction, generateAccess } from "../../../utils/index.js";
import { startSession } from "mongoose";

const getAll = async (_req, _res) => {
  const { page = 1, limit = 10, search = "" } = _req.query;

  const filter = _req.query.filter ? JSON.parse(_req.query.filter) : {};
  const data = await service.getAll({ page, limit, search, filter });

  _res.send({
    data,
    status: "success",
    message: "Get forumthreads success",
    meta: {
      access: generateAccess({}),
      page: page,
      limit: limit,
    },
  });
};

const getAllByUser = async (_req, _res) => {
  const { userId } = _req.params;

  const data = await service.getAllByUser(userId);

  _res.send({
    data,
    status: "success",
    message: "Get forumthreads by user success",
    meta: {
      access: generateAccess({}),
    },
  });
};

const getById = async (_req, _res) => {
  const { id } = _req.params;

  const data = await service.getById(id);

  if (!data) {
    _res.send({
      data: [],
      status: "fail",
      message: "Get forumthreads failed",
      meta: {
        access: generateAccess({}),
      },
    });
  }
  _res.send({
    data: [data],
    status: "success",
    message: "Get forumthreads success",
    meta: {
      access: generateAccess({}),
    },
  });
};

const add = async (_req, _res) => {
  const session = await startSession();
  _res.send(
    await transaction(
      session,
      async () => {
        return await service.add({ ..._req.body }, session);
      },
      "Create forumthreads"
    )
  );
};

const update = async (_req, _res) => {
  const session = await startSession();
  const { id } = _req.params;

  console.log(_req.body);
  _res.send(
    await transaction(
      session,
      async () => {
        return await service.update({ _id: id }, _req.body, session);
      },
      "Update forumthreads"
    )
  );
};

const removeOne = async (_req, _res) => {
  const session = await startSession();

  const { id } = _req.params;
  _res.send(
    await transaction(
      session,
      async () => {
        return await service.removeOne({ _id: id }, session);
      },
      "Delete forumthreads"
    )
  );
};

export { getAll, getAllByUser, getById, add, update, removeOne };
