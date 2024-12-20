import { StartShiftUseCase } from "../../application/use-cases/start-shift.usecase";

class InMemoryShiftsRepo {
  shifts: any[] = [];
  async getActiveShift(userId: string) {
    return this.shifts.find(s => s.userId === userId && !s.endTime) || null;
  }
  async startShift(userId: string) {
    const active = await this.getActiveShift(userId);
    if (active) throw new Error("Já existe um turno ativo.");
    const newShift = { id: "1", userId, startTime: new Date() };
    this.shifts.push(newShift);
    return newShift;
  }
}

test("Should start a shift if none is active", async () => {
  const repo = new InMemoryShiftsRepo();
  const uc = new StartShiftUseCase(repo as any);
  const result = await uc.execute({ userId: "user123" });
  expect(result.startTime).toBeDefined();
});
function expect(value: any) {
  return {
    toBeDefined: () => {
      if (value === undefined) {
        throw new Error("Expected value to be defined, but received undefined");
      }
    }
  };
}

