import { createIntlCalendarConverter } from "../../core/intl.js";
import type { ConvertOptions, DateInput } from "../../core/types.js";
import { parseInputDate } from "../../core/utils.js";
import type { ArabicDate } from "./types.js";

export const arabicConverter = createIntlCalendarConverter({
  calendar: "islamic",
  country: "Saudi Arabia",
  defaultLanguage: "ar",
  locales: {
    en: "en-u-ca-islamic",
    bn: "bn-BD-u-ca-islamic",
    ar: "ar-SA-u-ca-islamic",
  },
  nativeName: "Hijri",
});

export function convertToArabicDate(input: DateInput, options?: ConvertOptions): ArabicDate {
  const date = parseInputDate(input);

  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }

  const adjustedDate = new Date(date);
  adjustedDate.setDate(adjustedDate.getDate() - 1);

  return arabicConverter.convert(adjustedDate, options) as ArabicDate;
}
