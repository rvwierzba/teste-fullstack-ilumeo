import { ShiftsRepository } from "../../domain/repositories/shifts-repository.interface";

interface StartShiftInput {
  userId: string;
}

export class StartShiftUseCase {
  constructor(private shiftsRepo: ShiftsRepository) {}

  async execute(input: StartShiftInput) {
    const shift = await this.shiftsRepo.startShift(input.userId);
    return { id: shift.id, startTime: shift.startTime };
  }
}
