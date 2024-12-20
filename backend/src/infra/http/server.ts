import express from "express";
import cors from "cors";
import { shiftsRouter } from "./routes/shifts.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/shifts", shiftsRouter);

export { app };
