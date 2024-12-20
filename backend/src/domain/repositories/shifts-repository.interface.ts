import { Shift } from "../entities/shift.entity";

export interface ShiftsRepository {
  startShift(userId: string): Promise<Shift>;
  endShift(userId: string): Promise<Shift>;
  getTodayShifts(userId: string): Promise<Shift[]>;
  getHistory(userId: string): Promise<Array<{ date: string; totalHours: number }>>;
  getActiveShift(userId: string): Promise<Shift | null>;
}
