/**
 * @swagger
 * /api/upload/image:
 *   post:
 *     description: Upload an image
 *     responses:
 *       200:
 *         description: Successful response
 */

import { Router } from "express";
import {
  changePassword,
  getAll,
  getById,
  add,
  update,
  removeOne,
  authenticate,
  getOverview,
} from "./controller.js";

const router = Router();
router.route("/").get(getAll).post(add);
router.route("/:id/password").patch(changePassword);
router.get("/admin-overview", getOverview);
router.route("/:id").get(getById).patch(update).delete(removeOne);
router.route("/authenticate").post(authenticate);

export default router;
