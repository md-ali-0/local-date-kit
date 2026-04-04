import type { LocalCalendarDate } from "../../core/types.js";

export interface TaiwanDate extends LocalCalendarDate {
  country: "Taiwan";
  calendar: "roc";
}
