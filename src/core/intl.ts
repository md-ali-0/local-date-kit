import type { CalendarConverter, ConvertOptionInput, DateInput, LocalCalendarDate } from "./types.js";
import { getDayPeriod, normalizeConvertOptions, parseInputDate } from "./utils.js";

interface IntlCalendarConfig<TCalendar extends string> {
  calendar: TCalendar;
  country: string;
  defaultLanguage: string;
  locales: Record<string, string>;
  nativeName: string;
  adjustDate?: (date: Date) => Date;
}

export function createIntlCalendarConverter<TCalendar extends string>(
  config: IntlCalendarConfig<TCalendar>
): CalendarConverter<LocalCalendarDate & { calendar: TCalendar }> {
  return {
    calendar: config.calendar,
    convert(input: DateInput, options?: ConvertOptionInput) {
      const date = parseInputDate(input);

      if (Number.isNaN(date.getTime())) {
        throw new Error("Invalid date input");
      }

      const adjustedDate = config.adjustDate ? config.adjustDate(new Date(date)) : date;

      const normalizedOptions = normalizeConvertOptions(options);
      const language = normalizedOptions.language ?? "en";
      const locale = config.locales[language] ?? config.locales.en ?? config.locales[config.defaultLanguage];
      const resolvedLanguage = config.locales[language] ? language : config.locales.en ? "en" : config.defaultLanguage;

      const formatter = new Intl.DateTimeFormat(locale, {
        calendar: config.calendar,
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      const numericFormatter = new Intl.DateTimeFormat(config.locales.en ?? config.locales[config.defaultLanguage], {
        calendar: config.calendar,
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const parts = formatter.formatToParts(adjustedDate);
      const numericParts = numericFormatter.formatToParts(adjustedDate);
      const day = parts.find((part) => part.type === "day")?.value;
      const month = parts.find((part) => part.type === "month")?.value;
      const year = parts.find((part) => part.type === "year")?.value;
      const hour = parts.find((part) => part.type === "hour")?.value;
      const minute = parts.find((part) => part.type === "minute")?.value;
      const second = parts.find((part) => part.type === "second")?.value;

      const numericDay = numericParts.find((part) => part.type === "day")?.value;
      const numericYear = numericParts.find((part) => part.type === "year")?.value;
      const numericHourStr = numericParts.find((part) => part.type === "hour")?.value;
      const numericMinuteStr = numericParts.find((part) => part.type === "minute")?.value;
      const numericSecondStr = numericParts.find((part) => part.type === "second")?.value;

      if (
        !day || !month || !year || !numericDay || !numericYear ||
        !hour || !minute || !second ||
        numericHourStr === undefined || numericMinuteStr === undefined || numericSecondStr === undefined
      ) {
        throw new Error(`Unable to format ${config.calendar} calendar date`);
      }

      const hourNumber = Number.parseInt(numericHourStr, 10);
      const period = getDayPeriod(hourNumber, resolvedLanguage);

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
        hour,
        hourNumber,
        minute,
        minuteNumber: Number.parseInt(numericMinuteStr, 10),
        second,
        secondNumber: Number.parseInt(numericSecondStr, 10),
        period,
      };
    },
  };
}
