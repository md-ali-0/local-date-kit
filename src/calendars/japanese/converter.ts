import { createIntlCalendarConverter } from "../../core/intl.js";
import type { ConvertOptions, DateInput } from "../../core/types.js";
import type { JapaneseDate } from "./types.js";

export const japaneseConverter = createIntlCalendarConverter({
  calendar: "japanese",
  country: "Japan",
  locales: {
    en: "en-JP-u-ca-japanese",
    native: "ja-JP-u-ca-japanese",
  },
  nativeName: "Wareki",
});

export function convertToJapaneseDate(input: DateInput, options?: ConvertOptions): JapaneseDate {
  return japaneseConverter.convert(input, options) as JapaneseDate;
}
