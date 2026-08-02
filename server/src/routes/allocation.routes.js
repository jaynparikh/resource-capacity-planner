import express from "express";

import {
  getAllocations,
  createAllocation,
  updateAllocation,
  deleteAllocation,
} from "../controllers/allocation.controller.js";

const router = express.Router();

router.get("/", getAllocations);

router.post("/", createAllocation);

router.put("/:id", updateAllocation);

router.delete("/:id", deleteAllocation);

export default router;