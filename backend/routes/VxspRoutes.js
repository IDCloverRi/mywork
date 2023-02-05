import express from "express";
import { getVxsp } from "../controllers/VxspController.js";

const router = express.Router();
router.get("/", getVxsp);

export default router;
