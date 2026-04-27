import { convertToEnglishDate } from "../dist/calendars/english/converter.js";

const date = new Date(2026, 3, 6, 17, 59); // April 6, 2026, 5:59 PM
const result = convertToEnglishDate(date, "bn");

console.log("English Date (BN):", `${result.day} ${result.month} ${result.year} | ${result.period} ${result.hour}:${result.minute}`);
