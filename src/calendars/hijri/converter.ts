import { createIntlCalendarConverter } from "../../core/intl.js";
import type { ArabicDate } from "./types.js";

export const arabicConverter = createIntlCalendarConverter({
  calendar: "islamic",
  country: "Saudi Arabia",
  locale: "ar-SA-u-ca-islamic",
  nativeName: "Hijri",
});

export function convertToArabicDate(input: Date | string): ArabicDate {
  return arabicConverter.convert(input) as ArabicDate;
}
