import type { CalendarConverter, ConvertOptionInput, DateInput } from "../../core/types.js";
import { getDayPeriod, isLeapYear, normalizeConvertOptions, parseInputDate, toLocalizedDigits, toUTCDate } from "../../core/utils.js";
import type { BanglaDate } from "./types.js";

const MONTHS = [
  { en: "Boishakh", native: "বৈশাখ", days: 31 },
  { en: "Joishtho", native: "জ্যৈষ্ঠ", days: 31 },
  { en: "Ashar", native: "আষাঢ়", days: 31 },
  { en: "Srabon", native: "শ্রাবণ", days: 31 },
  { en: "Bhadro", native: "ভাদ্র", days: 31 },
  { en: "Ashwin", native: "আশ্বিন", days: 31 },
  { en: "Kartik", native: "কার্তিক", days: 30 },
  { en: "Agrahayan", native: "অগ্রহায়ণ", days: 30 },
  { en: "Poush", native: "পৌষ", days: 30 },
  { en: "Magh", native: "মাঘ", days: 30 },
  { en: "Falgun", native: "ফালগুন", days: 0 },
  { en: "Chaitra", native: "চৈত্র", days: 30 },
] as const;

export function convertToBanglaDate(input: DateInput, options?: ConvertOptionInput): BanglaDate {
  const date = parseInputDate(input);

  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }

  const requestedLanguage = normalizeConvertOptions(options).language ?? "en";
  const language = requestedLanguage === "bn" ? "bn" : "en";

  const utcDate = toUTCDate(date);
  const day = utcDate.getUTCDate();
  const month = utcDate.getUTCMonth() + 1;
  const year = utcDate.getUTCFullYear();

  // Time components from original date (local time)
  const hourNumber = date.getHours();
  const minuteNumber = date.getMinutes();
  const secondNumber = date.getSeconds();
  const period = getDayPeriod(hourNumber, language);

  const hour12 = hourNumber % 12 || 12;
  const hour = toLocalizedDigits(hour12, language);
  const minute = toLocalizedDigits(minuteNumber, language).padStart(2, toLocalizedDigits(0, language));
  const second = toLocalizedDigits(secondNumber, language).padStart(2, toLocalizedDigits(0, language));

  let banglaYear = year - 593;

  if (month < 4 || (month === 4 && day < 14)) {
    banglaYear -= 1;
  }

  let baseDate = new Date(Date.UTC(year, 3, 14));

  if (utcDate < baseDate) {
    baseDate = new Date(Date.UTC(year - 1, 3, 14));
  }

  const diffTime = utcDate.getTime() - baseDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const months = MONTHS.map((monthDef) =>
    monthDef.en === "Falgun"
      ? { ...monthDef, days: isLeapYear(year) ? 30 : 29 }
      : monthDef
  );

  let remainingDays = diffDays;

  for (const monthDef of months) {
    if (remainingDays < monthDef.days) {
      const banglaDayNumber = remainingDays + 1;
      let banglaDay = toLocalizedDigits(banglaDayNumber, language);

      if (language === "bn") {
        if (banglaDayNumber === 1) banglaDay += "লা";
        else if (banglaDayNumber === 2 || banglaDayNumber === 3) banglaDay += "রা";
        else if (banglaDayNumber === 4) banglaDay += "ঠা";
        else if (banglaDayNumber >= 5 && banglaDayNumber <= 18) banglaDay += "ই";
        else if (banglaDayNumber >= 19) banglaDay += "শে";
      }

      return {
        country: "Bangladesh",
        calendar: "bangla",
        nativeName: "Bangabda",
        language,
        day: banglaDay,
        dayNumber: banglaDayNumber,
        month: monthDef[language === "bn" ? "native" : "en"],
        year: toLocalizedDigits(banglaYear, language),
        yearNumber: banglaYear,
        hour,
        hourNumber,
        minute,
        minuteNumber,
        second,
        secondNumber,
        period,
      };
    }

    remainingDays -= monthDef.days;
  }

  throw new Error("Date conversion failed");
}

export const banglaConverter: CalendarConverter<BanglaDate> = {
  calendar: "bangla",
  convert: convertToBanglaDate,
};
