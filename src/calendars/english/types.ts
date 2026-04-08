import type { LocalCalendarDate } from "../../core/types.js";

export interface EnglishDate extends LocalCalendarDate {
  country: "International";
  calendar: "english";
}
