// userController.js

import article_service from "../articles/service.js";
import resource_service from "../resources/service.js";

import service from "./service.js";
import bcrypt from "bcrypt";
import ENV from "../../../env/index.js";
import { transaction, generateAccess } from "../../../utils/index.js";
import { startSession } from "mongoose";
import { RESOURCE } from "../../../constants/index.js";

const changePassword = async (_req, _res) => {
  const session = await startSession();

  const { id } = _req.params;
  const { old_password, new_password } = _req.body;

  const operations = async () => {
    const user = await service.getById(id);
    if (!user) {
      throw new Error("User not found");
    }

    if (old_password && !(await bcrypt.compare(old_password, user.password))) {
      throw "Old password is incorrect";
    }

    const hashedNewPassword = await bcrypt.hash(new_password, ENV.HASH_SALT);
    return await service.update(
      { _id: id },
      { password: hashedNewPassword },
      session
    );
  };

  // Execute the transaction
  const result = await transaction(session, operations, "Update password");

  // Send the response
  if (result.status === "success") {
    _res.send(result);
  } else {
    _res.status(400).send(result);
  }
};

const getAll = async (_req, _res) => {
  const { page = 1, limit = 10 } = _req.query;

  const filter = _req.query.filter ? JSON.parse(_req.query.filter) : {};
  const data = await service.getAll({ page, limit, filter });

  _res.send({
    data,
    status: "success",
    message: "Get user success",
    meta: {
      access: generateAccess({}),
      page: page,
      limit: limit,
    },
  });
};

const getOverview = async (_req, _res) => {
  const total_users = await service.countTotalUsers();

  const unregistered_users = await service.countUnregisteredUsers();

  const pending_resources = await resource_service.countPendingResources();

  const in_draft_articles = await article_service.countInDraftArticles();

  _res.status(200).json({
    data: {
      in_draft_articles,
      total_users,
      pending_resources,
      unregistered_users,
    },
    status: "success",
    message: "Admin overview fetched successfully.",
  });
};

const getById = async (_req, _res) => {
  const { id } = _req.params;
  const data = await service.getById(id);

  if (!data) {
    _res.status(404).send({
      status: "fail",
      message: "User not found",
    });
    return;
  }
  _res.send({
    data: [data],
    status: "success",
    message: "Get user by ID success",
  });
};

const authenticate = async (_req, _res) => {
  const { email, password, type } = _req.body;
  const data = await service.getAll({ filter: { email, __t: type } });

  const user = data[0];

  if (data.length == 0) {
    _res.send({ data: [], status: "fail", message: "User not found" });
    return;
  }

  if (type == RESOURCE.USERS && !user.verified) {
    _res.send({ data: [], status: "fail", message: "User not verified" });
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    _res.send({ data: [], status: "fail", message: "Password not match" });
    return;
  }

  user.lastLogin = new Date();
  await user.save();

  _res.send({
    data,
    status: "success",
    message: "Authenticate user success",
    meta: {
      access: generateAccess({}),
    },
  });
};

const add = async (_req, _res) => {
  const session = await startSession();
  const { email, username, password, userType, ...rest } = _req.body;

  // Check if email exists
  const emailExists = await service.getByEmail(email);
  if (emailExists) {
    _res.status(400).send({
      status: "fail",
      message: "Email already in use",
    });
    return;
  }

  // Check if username exists
  const usernameExists = await service.getByUsername(username);
  if (usernameExists) {
    _res.status(400).send({
      status: "fail",
      message: "Username already taken",
    });
    return;
  }

  const hashed = await bcrypt.hash(password, ENV.HASH_SALT);

  if (userType !== "Unregistered") {
    rest.registrationDate = Date.now();
  }

  _res.send(
    await transaction(
      session,
      async () => {
        return await service.add(
          { password: hashed, email, username, ...rest },
          session
        );
      },
      "Create user"
    )
  );
};

const update = async (_req, _res) => {
  const session = await startSession();
  const { id } = _req.params;
  const { email, username, userType, ...updateData } = _req.body;

  if (email) {
    const emailExists = await service.getByEmail(email);
    if (emailExists && emailExists._id.toString() !== id) {
      _res.status(400).send({
        status: "fail",
        message: "Email already in use by another account",
      });
      return;
    }
  }

  if (username) {
    const usernameExists = await service.getByUsername(username);
    if (usernameExists && usernameExists._id.toString() !== id) {
      _res.status(400).send({
        status: "fail",
        message: "Username already taken by another account",
      });
      return;
    }
  }

  if (userType) {
    if (userType !== "Unregistered") {
      updateData.registrationDate = Date.now();
    }
  }

  _res.send(
    await transaction(
      session,
      async () => {
        return await service.update(
          { _id: id },
          { email, username, userType, ...updateData },
          session
        );
      },
      "Update user"
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
      "Delete user"
    )
  );
};

export {
  changePassword,
  getAll,
  getOverview,
  getById,
  add,
  update,
  removeOne,
  authenticate,
};
