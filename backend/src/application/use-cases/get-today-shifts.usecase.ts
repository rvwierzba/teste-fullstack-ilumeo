import { ShiftsRepository } from "../../domain/repositories/shifts-repository.interface";

interface GetTodayShiftsInput {
  userId: string;
}

export class GetTodayShiftsUseCase {
  constructor(private shiftsRepo: ShiftsRepository) {}

  async execute(input: GetTodayShiftsInput) {
    const shifts = await this.shiftsRepo.getTodayShifts(input.userId);
    return { shifts };
  }
}
