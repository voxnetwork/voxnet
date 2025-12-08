import { Router } from "express";
import { getDevices, createDevice } from "../controllers/devices.controller.js";

const router = Router();

router.get("/", getDevices);

router.post("/", createDevice);

// Em breve mais rotas serão adicionadas

export default router;
