import service from "./service.js";
import { transaction, generateAccess } from "../../../utils/index.js";
import { startSession } from "mongoose";

const getAll = async (_req, _res) => {
  const { page = 1, limit = 10 } = _req.query;
  const { postIdFilter } = _req.query;

  const data = await service.getAll({ page, limit, postIdFilter });

  _res.send({
    data,
    status: "success",
    message: "Get comments success",
    meta: {
      access: generateAccess({}),
      page: page,
      limit: limit,
    },
  });
};

const getAllByArticle = async (_req, _res) => {
  const { articleId } = _req.params;

  const data = await service.getAllByArticle(articleId);

  _res.send({
    data,
    status: 'success',
    message: 'Get comments by article success',
    meta: {
      access: generateAccess({}),
    },
  });
};

const getAllByPost = async (_req, _res) => {
  const { postId } = _req.params;
  const { page = 1, limit = 10 } = _req.query;

  const data = await service.getAllByPost(postId, { page, limit });

  _res.send({
    data,
    status: "success",
    message: "Get comments by post success",
    meta: {
      access: generateAccess({}),
      page: page,
      limit: limit,
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
      message: "Get comments failed",
      meta: {
        access: generateAccess({}),
      },
    });
  }
  _res.send({
    data: [data],
    status: "success",
    message: "Get comments success",
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
      "Create comments"
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
      "Update comments"
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
      "Delete comments"
    )
  );
};

export { getAll, getAllByPost, getAllByArticle, getById, add, update, removeOne };
