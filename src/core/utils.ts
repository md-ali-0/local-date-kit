import type { ConvertOptionInput, ConvertOptions, DateInput } from "./types.js";

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
  return new Intl.NumberFormat(language, { useGrouping: false }).format(value);
}

export function normalizeConvertOptions(options?: ConvertOptionInput): ConvertOptions {
  if (typeof options === "string") {
    return { language: options };
  }

  return options ?? {};
}

export function getDayPeriod(hour: number, language: string): string {
  if (language === "bn") {
    if (hour >= 4 && hour < 6) return "ভোর";
    if (hour >= 6 && hour < 12) return "সকাল";
    if (hour >= 12 && hour < 16) return "দুপুর";
    if (hour >= 16 && hour < 18) return "বিকেল";
    if (hour >= 18 && hour < 20) return "সন্ধ্যা";
    return "রাত";
  }

  if (language === "en") {
    if (hour >= 4 && hour < 6) return "Dawn";
    if (hour >= 6 && hour < 12) return "Morning";
    if (hour >= 12 && hour < 17) return "Afternoon";
    if (hour >= 17 && hour < 20) return "Evening";
    return "Night";
  }

  if (language === "ar") {
    if (hour >= 4 && hour < 6) return "فجر";
    if (hour >= 6 && hour < 12) return "صباح";
    if (hour >= 12 && hour < 15) return "ظهر";
    if (hour >= 15 && hour < 18) return "بعد الظهر";
    if (hour >= 18 && hour < 20) return "مساء";
    return "ليل";
  }

  if (language === "hi") {
    if (hour >= 4 && hour < 6) return "भोर";
    if (hour >= 6 && hour < 12) return "सुबह";
    if (hour >= 12 && hour < 16) return "दोपहर";
    if (hour >= 16 && hour < 19) return "शाम";
    return "रात";
  }

  if (language === "ja") {
    if (hour >= 4 && hour < 6) return "明け方";
    if (hour >= 6 && hour < 12) return "午前";
    if (hour >= 12 && hour < 15) return "昼";
    if (hour >= 15 && hour < 18) return "午後";
    if (hour >= 18 && hour < 23) return "夜";
    return "深夜";
  }

  if (language === "th") {
    if (hour >= 4 && hour < 6) return "เช้ามืด";
    if (hour >= 6 && hour < 12) return "เช้า";
    if (hour >= 12 && hour < 13) return "เที่ยง";
    if (hour >= 13 && hour < 16) return "บ่าย";
    if (hour >= 16 && hour < 19) return "เย็น";
    return "กลางคืน";
  }

  if (language === "zh-TW") {
    if (hour >= 4 && hour < 6) return "清晨";
    if (hour >= 6 && hour < 12) return "早上";
    if (hour >= 12 && hour < 14) return "中午";
    if (hour >= 14 && hour < 18) return "下午";
    if (hour >= 18 && hour < 23) return "晚上";
    return "半夜";
  }

  // Fallback to Intl if possible
  try {
    const formatter = new Intl.DateTimeFormat(language, { dayPeriod: "long" });
    const date = new Date();
    date.setHours(hour, 0, 0, 0);
    const parts = formatter.formatToParts(date);
    const period = parts.find((p) => p.type === "dayPeriod")?.value;
    
    if (period) return period;
  } catch {
    // ignore
  }

  return hour < 12 ? "AM" : "PM";
}
