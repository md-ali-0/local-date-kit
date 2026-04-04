import type { CalendarConverter, ConvertOptions, DateInput, LocalCalendarDate } from "./core/types.js";
import { arabicConverter } from "./calendars/hijri/index.js";
import { banglaConverter } from "./calendars/bangla/index.js";
import { indianConverter } from "./calendars/indian/index.js";
import { japaneseConverter } from "./calendars/japanese/index.js";
import { thaiConverter } from "./calendars/thai-buddhist/index.js";
import { taiwanConverter } from "./calendars/roc/index.js";

const converters = {
  islamic: arabicConverter,
  bangla: banglaConverter,
  indian: indianConverter,
  japanese: japaneseConverter,
  buddhist: thaiConverter,
  roc: taiwanConverter,
} as const satisfies Record<string, CalendarConverter>;

export type SupportedCalendar = keyof typeof converters;

export function getConverter<TCalendar extends SupportedCalendar>(
  calendar: TCalendar
): (typeof converters)[TCalendar] {
  return converters[calendar];
}

export function convertDate<TCalendar extends SupportedCalendar>(
  input: DateInput,
  calendar: TCalendar,
  options?: ConvertOptions
): ReturnType<(typeof converters)[TCalendar]["convert"]> {
  const converter = getConverter(calendar);
  return converter.convert(input, options) as ReturnType<(typeof converters)[TCalendar]["convert"]>;
}

export function listSupportedCalendars(): SupportedCalendar[] {
  return Object.keys(converters) as SupportedCalendar[];
}

export function isSupportedCalendar(calendar: string): calendar is SupportedCalendar {
  return calendar in converters;
}

export type AnyLocalDate = LocalCalendarDate;
