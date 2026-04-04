import type { CalendarConverter, DateInput, LocalCalendarDate } from "./types.js";
import { parseInputDate } from "./utils.js";

interface IntlCalendarConfig<TCalendar extends string> {
  calendar: TCalendar;
  country: string;
  locale: string;
  nativeName: string;
}

export function createIntlCalendarConverter<TCalendar extends string>(
  config: IntlCalendarConfig<TCalendar>
): CalendarConverter<LocalCalendarDate & { calendar: TCalendar }> {
  const formatter = new Intl.DateTimeFormat(config.locale, {
    calendar: config.calendar,
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return {
    calendar: config.calendar,
    convert(input: DateInput) {
      const date = parseInputDate(input);

      if (Number.isNaN(date.getTime())) {
        throw new Error("Invalid date input");
      }

      const parts = formatter.formatToParts(date);
      const day = parts.find((part) => part.type === "day")?.value;
      const month = parts.find((part) => part.type === "month")?.value;
      const year = parts.find((part) => part.type === "year")?.value;

      if (!day || !month || !year) {
        throw new Error(`Unable to format ${config.calendar} calendar date`);
      }

      return {
        country: config.country,
        calendar: config.calendar,
        nativeName: config.nativeName,
        day: Number(day),
        month,
        year: Number(year),
      };
    },
  };
}
