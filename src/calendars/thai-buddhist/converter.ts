import { createIntlCalendarConverter } from "../../core/intl.js";
import type { ConvertOptions, DateInput } from "../../core/types.js";
import type { ThaiDate } from "./types.js";

export const thaiConverter = createIntlCalendarConverter({
  calendar: "buddhist",
  country: "Thailand",
  defaultLanguage: "th",
  locales: {
    en: "en-TH-u-ca-buddhist",
    bn: "bn-BD-u-ca-buddhist",
    th: "th-TH-u-ca-buddhist",
  },
  nativeName: "Phutthasakkarat",
});

export function convertToThaiDate(input: DateInput, options?: ConvertOptions): ThaiDate {
  return thaiConverter.convert(input, options) as ThaiDate;
}
