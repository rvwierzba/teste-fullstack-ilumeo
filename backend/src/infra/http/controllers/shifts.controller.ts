import { Request, Response } from "express";
import { PrismaShiftsRepository } from "../../repositories/prisma-shifts.repository";
import { StartShiftUseCase } from "../../../application/use-cases/start-shift.usecase";
import { EndShiftUseCase } from "../../../application/use-cases/end-shift.usecase";
import { GetTodayShiftsUseCase } from "../../../application/use-cases/get-today-shifts.usecase";
import { GetHistoryUseCase } from "../../../application/use-cases/get-history.usecase";

const USER_ID = "user123";
const shiftsRepo = new PrismaShiftsRepository();

export class ShiftsController {
  static async start(req: Request, res: Response) {
    try {
      const useCase = new StartShiftUseCase(shiftsRepo);
      const result = await useCase.execute({ userId: USER_ID });
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async end(req: Request, res: Response) {
    try {
      const useCase = new EndShiftUseCase(shiftsRepo);
      const result = await useCase.execute({ userId: USER_ID });
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async today(req: Request, res: Response) {
    const useCase = new GetTodayShiftsUseCase(shiftsRepo);
    const result = await useCase.execute({ userId: USER_ID });
    res.json(result);
  }

  static async history(req: Request, res: Response) {
    const useCase = new GetHistoryUseCase(shiftsRepo);
    const result = await useCase.execute({ userId: USER_ID });
    res.json(result);
  }

  static async current(req: Request, res: Response) {
    const active = await shiftsRepo.getActiveShift(USER_ID);
    res.json({ activeShiftId: active?.id || null });
  }
}
