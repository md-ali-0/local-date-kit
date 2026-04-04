import type { LocalCalendarDate } from "../../core/types.js";

export interface JapaneseDate extends LocalCalendarDate {
  country: "Japan";
  calendar: "japanese";
}
