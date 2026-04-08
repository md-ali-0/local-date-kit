import { createIntlCalendarConverter } from "../../core/intl.js";
import type { ConvertOptionInput, DateInput } from "../../core/types.js";
import type { TaiwanDate } from "./types.js";

export const taiwanConverter = createIntlCalendarConverter({
  calendar: "roc",
  country: "Taiwan",
  defaultLanguage: "zh-TW",
  locales: {
    en: "en-TW-u-ca-roc",
    bn: "bn-BD-u-ca-roc",
    "zh-TW": "zh-TW-u-ca-roc",
  },
  nativeName: "Minguo",
});

export function convertToTaiwanDate(input: DateInput, options?: ConvertOptionInput): TaiwanDate {
  return taiwanConverter.convert(input, options) as TaiwanDate;
}
