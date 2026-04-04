import { createIntlCalendarConverter } from "../../core/intl.js";
import type { JapaneseDate } from "./types.js";

export const japaneseConverter = createIntlCalendarConverter({
  calendar: "japanese",
  country: "Japan",
  locale: "ja-JP-u-ca-japanese",
  nativeName: "Wareki",
});

export function convertToJapaneseDate(input: Date | string): JapaneseDate {
  return japaneseConverter.convert(input) as JapaneseDate;
}
