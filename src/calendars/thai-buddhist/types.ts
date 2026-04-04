import type { LocalCalendarDate } from "../../core/types.js";

export interface ThaiDate extends LocalCalendarDate {
  country: "Thailand";
  calendar: "buddhist";
}
