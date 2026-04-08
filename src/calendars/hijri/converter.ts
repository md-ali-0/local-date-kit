import { createIntlCalendarConverter } from "../../core/intl.js";
import type { ConvertOptionInput, DateInput } from "../../core/types.js";
import { parseInputDate } from "../../core/utils.js";
import type { ArabicDate } from "./types.js";

export const arabicConverter = createIntlCalendarConverter({
  calendar: "islamic",
  country: "Saudi Arabia",
  defaultLanguage: "ar",
  adjustDate: (date) => {
    date.setDate(date.getDate() - 1);
    return date;
  },
  locales: {
    en: "en-u-ca-islamic",
    bn: "bn-BD-u-ca-islamic",
    ar: "ar-SA-u-ca-islamic",
  },
  nativeName: "Hijri",
});

export function convertToArabicDate(input: DateInput, options?: ConvertOptionInput): ArabicDate {
  const date = parseInputDate(input);

  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }

  return arabicConverter.convert(date, options) as ArabicDate;
}
