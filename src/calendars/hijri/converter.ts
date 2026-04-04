import { createIntlCalendarConverter } from "../../core/intl.js";
import type { ConvertOptions, DateInput } from "../../core/types.js";
import type { ArabicDate } from "./types.js";

export const arabicConverter = createIntlCalendarConverter({
  calendar: "islamic",
  country: "Saudi Arabia",
  locales: {
    en: "en-u-ca-islamic",
    native: "ar-SA-u-ca-islamic",
  },
  nativeName: "Hijri",
});

export function convertToArabicDate(input: DateInput, options?: ConvertOptions): ArabicDate {
  return arabicConverter.convert(input, options) as ArabicDate;
}
