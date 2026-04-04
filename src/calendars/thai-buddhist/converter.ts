import { createIntlCalendarConverter } from "../../core/intl.js";
import type { ThaiDate } from "./types.js";

export const thaiConverter = createIntlCalendarConverter({
  calendar: "buddhist",
  country: "Thailand",
  locale: "th-TH-u-ca-buddhist",
  nativeName: "Phutthasakkarat",
});

export function convertToThaiDate(input: Date | string): ThaiDate {
  return thaiConverter.convert(input) as ThaiDate;
}
