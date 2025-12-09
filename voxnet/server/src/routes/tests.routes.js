import { Router } from "express";
import { getTestsByDevice, createTest } from "../controllers/tests.controller.js";

const router = Router();

router.get("/:id/tests", getTestsByDevice);

router.post("/:id/test", createTest);

export default router;