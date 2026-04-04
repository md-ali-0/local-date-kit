import { createIntlCalendarConverter } from "../../core/intl.js";
import type { IndianDate } from "./types.js";

export const indianConverter = createIntlCalendarConverter({
  calendar: "indian",
  country: "India",
  locale: "en-IN-u-ca-indian",
  nativeName: "Saka",
});

export function convertToIndianDate(input: Date | string): IndianDate {
  return indianConverter.convert(input) as IndianDate;
}
