import type { CalendarConverter, DateInput } from "../../core/types.js";
import { isLeapYear, parseInputDate, toUTCDate } from "../../core/utils.js";
import type { BanglaDate } from "./types.js";

const MONTHS = [
  { name: "Boishakh", days: 31 },
  { name: "Joishtho", days: 31 },
  { name: "Ashar", days: 31 },
  { name: "Srabon", days: 31 },
  { name: "Bhadro", days: 31 },
  { name: "Ashwin", days: 30 },
  { name: "Kartik", days: 30 },
  { name: "Agrahayan", days: 30 },
  { name: "Poush", days: 30 },
  { name: "Magh", days: 30 },
  { name: "Falgun", days: 0 },
  { name: "Chaitra", days: 30 },
] as const;

export function convertToBanglaDate(input: DateInput): BanglaDate {
  const date = parseInputDate(input);

  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }

  const utcDate = toUTCDate(date);
  const day = utcDate.getUTCDate();
  const month = utcDate.getUTCMonth() + 1;
  const year = utcDate.getUTCFullYear();

  let banglaYear = year - 593;

  if (month < 4 || (month === 4 && day < 14)) {
    banglaYear -= 1;
  }

  let baseDate = new Date(Date.UTC(year, 3, 14));

  if (utcDate < baseDate) {
    baseDate = new Date(Date.UTC(year - 1, 3, 14));
  }

  const diffTime = utcDate.getTime() - baseDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const months = MONTHS.map((monthDef) =>
    monthDef.name === "Falgun"
      ? { ...monthDef, days: isLeapYear(year) ? 30 : 29 }
      : monthDef
  );

  let remainingDays = diffDays;

  for (const monthDef of months) {
    if (remainingDays < monthDef.days) {
      return {
        country: "Bangladesh",
        calendar: "bangla",
        nativeName: "Bangabda",
        day: remainingDays + 1,
        month: monthDef.name,
        year: banglaYear,
      };
    }

    remainingDays -= monthDef.days;
  }

  throw new Error("Date conversion failed");
}

export const banglaConverter: CalendarConverter<BanglaDate> = {
  calendar: "bangla",
  convert: convertToBanglaDate,
};
