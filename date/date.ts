interface BuildDateOpts {
  date: number;
  month: number;
  year: number;
}

/** builds a date from day, month and year without time */
export const buildDate = ({ date, month, year }: BuildDateOpts): Date => {
  return new Date(year, month, date, 0, 0, 0, 0);
};

/** strips all time related info from provided date */
export const stripTimeFromDate = (date: Date): Date => {
  return buildDate({
    date: date.getDay(),
    month: date.getMonth(),
    year: date.getFullYear(),
  });
};
