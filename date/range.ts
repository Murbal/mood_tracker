export class DateRange {
  constructor(private readonly start: Date, private readonly end: Date) {}

  public inRange(date: Date): boolean {
    return (
      this.start.getTime() <= date.getTime() &&
      this.end.getTime() >= date.getTime()
    );
  }
}

export const buildDateRange = (start: Date, end: Date): DateRange => {
  return new DateRange(start, end);
};

export const shiftDateToEndOfDay = (date: Date): Date => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    999
  );
};
export const shiftDateToStartOfDay = (date: Date): Date => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0,
    0
  );
};
