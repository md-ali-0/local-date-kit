import { createIntlCalendarConverter } from "../../core/intl.js";
import type { ConvertOptions, DateInput } from "../../core/types.js";
import type { IndianDate } from "./types.js";

export const indianConverter = createIntlCalendarConverter({
  calendar: "indian",
  country: "India",
  locales: {
    en: "en-IN-u-ca-indian",
    native: "hi-IN-u-ca-indian",
  },
  nativeName: "Saka",
});

export function convertToIndianDate(input: DateInput, options?: ConvertOptions): IndianDate {
  return indianConverter.convert(input, options) as IndianDate;
}
