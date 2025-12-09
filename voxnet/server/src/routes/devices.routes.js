import { Router } from "express";
import { getDevices, createDevice, updateDevice, deleteDevice } from "../controllers/devices.controller.js";

const router = Router();

router.get("/", getDevices);

router.post("/", createDevice);

router.put("/:id", updateDevice);

router.delete("/:id", deleteDevice);

export default router;
