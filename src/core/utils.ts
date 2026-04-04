import type { DateInput } from "./types.js";

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

export function parseInputDate(input: DateInput): Date {
  if (input instanceof Date) {
    return input;
  }

  // Treat bare ISO dates as calendar dates instead of timezone-shifted timestamps.
  const bareDateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input);
  if (bareDateMatch) {
    const [, year, month, day] = bareDateMatch;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  return new Date(input);
}

export function toUTCDate(date: Date): Date {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

export function toLocalizedDigits(value: number, language: string): string {
  return new Intl.NumberFormat(language).format(value);
}
