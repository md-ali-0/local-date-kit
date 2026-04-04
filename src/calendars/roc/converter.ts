import { createIntlCalendarConverter } from "../../core/intl.js";
import type { ConvertOptions, DateInput } from "../../core/types.js";
import type { TaiwanDate } from "./types.js";

export const taiwanConverter = createIntlCalendarConverter({
  calendar: "roc",
  country: "Taiwan",
  locales: {
    en: "en-TW-u-ca-roc",
    native: "zh-TW-u-ca-roc",
  },
  nativeName: "Minguo",
});

export function convertToTaiwanDate(input: DateInput, options?: ConvertOptions): TaiwanDate {
  return taiwanConverter.convert(input, options) as TaiwanDate;
}
