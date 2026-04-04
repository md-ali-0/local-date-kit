import type { CalendarConverter, ConvertOptions, DateInput, LocalCalendarDate } from "./types.js";
import { parseInputDate } from "./utils.js";

interface IntlCalendarConfig<TCalendar extends string> {
  calendar: TCalendar;
  country: string;
  defaultLanguage: string;
  locales: Record<string, string>;
  nativeName: string;
}

export function createIntlCalendarConverter<TCalendar extends string>(
  config: IntlCalendarConfig<TCalendar>
): CalendarConverter<LocalCalendarDate & { calendar: TCalendar }> {
  return {
    calendar: config.calendar,
    convert(input: DateInput, options?: ConvertOptions) {
      const date = parseInputDate(input);

      if (Number.isNaN(date.getTime())) {
        throw new Error("Invalid date input");
      }

      const language = options?.language ?? "en";
      const locale = config.locales[language] ?? config.locales.en ?? config.locales[config.defaultLanguage];
      const resolvedLanguage = config.locales[language] ? language : config.locales.en ? "en" : config.defaultLanguage;

      const formatter = new Intl.DateTimeFormat(locale, {
        calendar: config.calendar,
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const numericFormatter = new Intl.DateTimeFormat(config.locales.en ?? config.locales[config.defaultLanguage], {
        calendar: config.calendar,
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const parts = formatter.formatToParts(date);
      const numericParts = numericFormatter.formatToParts(date);
      const day = parts.find((part) => part.type === "day")?.value;
      const month = parts.find((part) => part.type === "month")?.value;
      const year = parts.find((part) => part.type === "year")?.value;
      const numericDay = numericParts.find((part) => part.type === "day")?.value;
      const numericYear = numericParts.find((part) => part.type === "year")?.value;

      if (!day || !month || !year || !numericDay || !numericYear) {
        throw new Error(`Unable to format ${config.calendar} calendar date`);
      }

      return {
        country: config.country,
        calendar: config.calendar,
        nativeName: config.nativeName,
        language: resolvedLanguage,
        day,
        dayNumber: Number.parseInt(numericDay, 10),
        month,
        year,
        yearNumber: Number.parseInt(numericYear, 10),
      };
    },
  };
}
