import { createIntlCalendarConverter } from "../../core/intl.js";
import type { TaiwanDate } from "./types.js";

export const taiwanConverter = createIntlCalendarConverter({
  calendar: "roc",
  country: "Taiwan",
  locale: "zh-TW-u-ca-roc",
  nativeName: "Minguo",
});

export function convertToTaiwanDate(input: Date | string): TaiwanDate {
  return taiwanConverter.convert(input) as TaiwanDate;
}
