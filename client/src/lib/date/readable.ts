import { buildDate } from ".";
import {
  buildDateRange,
  DateRange,
  shiftDateToEndOfDay,
  shiftDateToStartOfDay,
} from "./range";

const moodEntryDateFormat = Intl.DateTimeFormat("en-EN", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const buildOneDayDateRange = (date: Date): DateRange => {
  const dateStart = shiftDateToStartOfDay(date);
  const dateEnd = shiftDateToEndOfDay(date);

  return buildDateRange(dateStart, dateEnd);
};

export const transformToReadableDate = (date: Date): string => {
  const today = new Date();
  const todayRange = buildOneDayDateRange(today);
  const isToday = todayRange.inRange(date);
  if (isToday) {
    return "Today";
  }

  const yesterday = buildDate({
    date: today.getDate() - 1,
    month: today.getMonth(),
    year: today.getFullYear(),
  });
  const yesterdayRange = buildOneDayDateRange(yesterday);
  const isYesterday = yesterdayRange.inRange(date);
  if (isYesterday) {
    return "Yesterday";
  }

  return moodEntryDateFormat.format(date);
};
