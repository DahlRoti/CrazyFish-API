import service from "./service.js";
import comments_service from "../comments/service.js";

import { transaction, generateAccess } from "../../../utils/index.js";
import { startSession } from "mongoose";

const getAll = async (_req, _res) => {
  const { page = 1, limit = 10, search = "" } = _req.query;

  const data = await service.getAll({ page, limit, search });
  _res.send({
    data,
    status: "success",
    message: "Get articles success",
    meta: {
      access: generateAccess({}),
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    },
  });
};

const getAllPublished = async (_req, _res) => {
  const { page = 1, limit = 10, search = "" } = _req.query;

  const data = await service.getAllPublished({ page, limit, search });
  _res.send({
    data,
    status: "success",
    message: "Get published articles success",
    meta: {
      access: generateAccess({}),
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    },
  });
};

const getAllByUser = async (_req, _res) => {
  const { userId } = _req.params;

  const data = await service.getAllByUser(userId);
  _res.send({
    data,
    status: "success",
    message: "Get articles by user success",
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
      message: "Get article failed",
      meta: {
        access: generateAccess({}),
      },
    });
  }
  _res.send({
    data: [data],
    status: "success",
    message: "Get article success",
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
      "Create articles"
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
      "Update articles"
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
      "Delete articles"
    )
  );
};

export {
  getAll,
  getAllPublished,
  getAllByUser,
  getById,
  add,
  update,
  removeOne,
};
