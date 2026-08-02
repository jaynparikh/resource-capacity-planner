import express from "express";
import { askAI } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/query", askAI);

export default router;