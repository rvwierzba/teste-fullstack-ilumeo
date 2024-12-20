import { Router } from "express";
import { ShiftsController } from "../controllers/shifts.controller";

const router = Router();

router.post("/start", ShiftsController.start);
router.post("/end", ShiftsController.end);
router.get("/today", ShiftsController.today);
router.get("/history", ShiftsController.history);
router.get("/current", ShiftsController.current);

export { router as shiftsRouter };
