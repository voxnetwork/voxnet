import express from "express";
import cors from "cors";
import devicesRoutes from "./routes/devices.routes.js";
import testsRoutes from "./routes/tests.routes.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/devices", devicesRoutes);
app.use("/devices", testsRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
