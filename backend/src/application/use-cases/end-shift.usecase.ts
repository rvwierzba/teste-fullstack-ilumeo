import { ShiftsRepository } from "../../domain/repositories/shifts-repository.interface";

interface EndShiftInput {
  userId: string;
}

export class EndShiftUseCase {
  constructor(private shiftsRepo: ShiftsRepository) {}

  async execute(input: EndShiftInput) {
    const shift = await this.shiftsRepo.endShift(input.userId);
    return { id: shift.id, endTime: shift.endTime };
  }
}
