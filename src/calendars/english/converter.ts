import { createIntlCalendarConverter } from "../../core/intl.js";
import type { ConvertOptionInput, DateInput } from "../../core/types.js";
import type { EnglishDate } from "./types.js";

export const englishConverter = createIntlCalendarConverter({
  calendar: "gregory",
  country: "International",
  defaultLanguage: "en",
  locales: {
    en: "en-US-u-ca-gregory",
    bn: "bn-BD-u-ca-gregory",
    ar: "ar-SA-u-ca-gregory",
    hi: "hi-IN-u-ca-gregory",
    ja: "ja-JP-u-ca-gregory",
    th: "th-TH-u-ca-gregory",
    "zh-TW": "zh-TW-u-ca-gregory",
  },
  nativeName: "Gregorian",
});

export function convertToEnglishDate(input: DateInput, options?: ConvertOptionInput): EnglishDate {
  return {
    ...englishConverter.convert(input, options),
    calendar: "english",
  } as EnglishDate;
}
