import { ShiftsRepository } from "../../domain/repositories/shifts-repository.interface";

interface GetHistoryInput {
  userId: string;
}

export class GetHistoryUseCase {
  constructor(private shiftsRepo: ShiftsRepository) {}

  async execute(input: GetHistoryInput) {
    const history = await this.shiftsRepo.getHistory(input.userId);
    return history;
  }
}
