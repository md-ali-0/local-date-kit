import type { LocalCalendarDate } from "../../core/types.js";

export interface IndianDate extends LocalCalendarDate {
  country: "India";
  calendar: "indian";
}
