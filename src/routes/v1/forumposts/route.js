/**
 * @swagger
 * /api/items:
 *   get:
 *     description: Get all items
 *     responses:
 *       200:
 *         description: Successful response
 *   post:
 *     description: Add a new item
 *     responses:
 *       200:
 *         description: Successful response
 *
 * @swagger
 * /api/items/{id}:
 *   get:
 *     description: Get an item by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the item
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *   patch:
 *     description: Update an item by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the item
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *   delete:
 *     description: Delete an item by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the item
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 */

import { Router } from "express";
import {
  getAll,
  getById,
  add,
  update,
  removeOne,
  getAllByThread,
} from "./controller.js";

const router = Router();
router.route("/").get(getAll).post(add);
router.route("/:id").get(getById).patch(update).delete(removeOne);

router.get("/thread/:threadId", getAllByThread);

export default router;
