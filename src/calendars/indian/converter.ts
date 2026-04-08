import { createIntlCalendarConverter } from "../../core/intl.js";
import type { ConvertOptionInput, DateInput } from "../../core/types.js";
import type { IndianDate } from "./types.js";

export const indianConverter = createIntlCalendarConverter({
  calendar: "indian",
  country: "India",
  defaultLanguage: "hi",
  locales: {
    en: "en-IN-u-ca-indian",
    bn: "bn-BD-u-ca-indian",
    hi: "hi-IN-u-ca-indian",
  },
  nativeName: "Saka",
});

export function convertToIndianDate(input: DateInput, options?: ConvertOptionInput): IndianDate {
  return indianConverter.convert(input, options) as IndianDate;
}
