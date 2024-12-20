import { ShiftsRepository } from "../../domain/repositories/shifts-repository.interface";
import { Shift } from "../../domain/entities/shift.entity";
import { prisma } from "../../infra/database/prisma-client";
import { add } from "date-fns";

export class PrismaShiftsRepository implements ShiftsRepository {
  async startShift(userId: string): Promise<Shift> {
    const active = await this.getActiveShift(userId);
    if (active) {
      throw new Error("Já existe um turno ativo.");
    }
    const now = new Date();
    const shift = await prisma.shift.create({
      data: {
        userId,
        startTime: now
      }
    });
    return new Shift(
      shift.id,
      shift.userId,
      shift.startTime,
      shift.endTime,
      shift.createdAt,
      shift.updatedAt
    );
  }

  async endShift(userId: string): Promise<Shift> {
    const active = await this.getActiveShift(userId);
    if (!active) {
      throw new Error("Não há turno ativo para encerrar.");
    }
    const ended = await prisma.shift.update({
      where: { id: active.id },
      data: {
        endTime: new Date()
      }
    });
    return new Shift(
      ended.id,
      ended.userId,
      ended.startTime,
      ended.endTime,
      ended.createdAt,
      ended.updatedAt
    );
  }

  async getActiveShift(userId: string): Promise<Shift | null> {
    const shift = await prisma.shift.findFirst({
      where: {
        userId,
        endTime: null
      }
    });
    if (!shift) return null;
    return new Shift(
      shift.id,
      shift.userId,
      shift.startTime,
      shift.endTime,
      shift.createdAt,
      shift.updatedAt
    );
  }

  async getTodayShifts(userId: string): Promise<Shift[]> {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const endOfDay = add(startOfDay, { days: 1 });

    const shifts = await prisma.shift.findMany({
      where: {
        userId,
        startTime: {
          gte: startOfDay,
          lt: endOfDay
        }
      },
      orderBy: { startTime: "asc" }
    });

    return shifts.map(s => new Shift(
      s.id,
      s.userId,
      s.startTime,
      s.endTime,
      s.createdAt,
      s.updatedAt
    ));
  }

  async getHistory(userId: string): Promise<Array<{ date: string; totalHours: number }>> {
    const now = new Date();
    const fromDate = add(now, { days: -7 });
    const shifts = await prisma.shift.findMany({
      where: {
        userId,
        startTime: {
          gte: fromDate,
          lt: now
        }
      }
    });
    const grouped = shifts.reduce((acc: Record<string, number>, shift) => {
      const date = shift.startTime.toISOString().split("T")[0];
      const end = shift.endTime || new Date();
      const diff = (end.getTime() - shift.startTime.getTime()) / 3600000;
      acc[date] = (acc[date] || 0) + diff;
      return acc;
    }, {});

    return Object.entries(grouped).map(([date, totalHours]) => ({ date, totalHours: totalHours as number }));
  }
}
