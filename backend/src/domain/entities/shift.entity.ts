export class Shift {
  constructor(
    public id: string,
    public userId: string,
    public startTime: Date,
    public endTime: Date | null,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
