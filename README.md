# local-date-kit

`local-date-kit` হলো Gregorian date থেকে বিভিন্ন local calendar date-এ convert করার একটি modular TypeScript package।

এখন package-এ built-in support আছে:

- Bangla calendar
- Hijri / Islamic calendar
- Indian calendar
- Japanese calendar
- Thai Buddhist calendar
- ROC calendar

এই package এমনভাবে সাজানো হয়েছে যাতে future-এ নতুন local date converter সহজে add করা যায়।

## Features

- Single API দিয়ে একাধিক calendar support
- Specific calendar-এর জন্য direct converter function
- English এবং calendar-specific language code output support
- TypeScript-friendly typed return values
- Returned result-এ `country`, `calendar`, `nativeName`, `language`, localized `day`/`year`, এবং raw `dayNumber`/`yearNumber`
- Bangla/Hijri output Bangladesh-facing expected dates অনুযায়ী tuned
- Bare ISO date যেমন `2026-04-14` safe ভাবে parse করে
- Registry-based architecture, তাই নতুন calendar add করা সহজ

## Install

```bash
pnpm add local-date-kit
```

অথবা

```bash
npm install local-date-kit
```

## Quick Start

```ts
import { convertDate } from "local-date-kit";

const result = convertDate("2026-04-14", "bangla");

console.log(result);
```

Expected shape:

```ts
{
  country: "Bangladesh",
  calendar: "bangla",
  nativeName: "Bangabda",
  language: "en",
  day: "1",
  dayNumber: 1,
  month: "Boishakh",
  year: "1433",
  yearNumber: 1433
}
```

## Basic Usage

### 1. Generic converter

যদি runtime-এ calendar key দিয়ে conversion করতে চাও, তাহলে `convertDate()` ব্যবহার করো।

```ts
import { convertDate } from "local-date-kit";

const bangla = convertDate("2026-04-14", "bangla");
const hijri = convertDate("2026-04-14", "islamic");
const indian = convertDate("2026-04-14", "indian");
const japanese = convertDate("2026-04-14", "japanese");
const thai = convertDate("2026-04-14", "buddhist");
const roc = convertDate("2026-04-14", "roc");
```

### 1.1 Language code output

যদি month name আর formatted result specific language code-এ চাও, তাহলে `options.language` ব্যবহার করো।

```ts
import { convertDate } from "local-date-kit";

const banglaNative = convertDate("2026-04-14", "bangla", { language: "bn" });
const hijriNative = convertDate("2026-04-14", "islamic", { language: "ar" });
const japaneseNative = convertDate("2026-04-14", "japanese", { language: "ja" });
```

Example native Bangla output:

```ts
{
  country: "Bangladesh",
  calendar: "bangla",
  nativeName: "Bangabda",
  language: "bn",
  day: "১",
  dayNumber: 1,
  month: "বৈশাখ",
  year: "১৪৩৩",
  yearNumber: 1433
}
```

Examples:

- `bangla` -> `en`, `bn`
- `islamic` -> `en`, `ar`
- `indian` -> `en`, `hi`
- `japanese` -> `en`, `ja`
- `buddhist` -> `en`, `th`
- `roc` -> `en`, `zh-TW`

যদি unsupported language code দাও, package `en`-এ fallback করবে।

### 1.2 Bangladesh-facing examples

```ts
import { convertDate } from "local-date-kit";

const bangla = convertDate("2026-04-04", "bangla", { language: "bn" });
const hijri = convertDate("2026-04-04", "islamic", { language: "bn" });
```

Expected style of output:

```ts
{
  day: "২১",
  month: "চৈত্র",
  year: "১৪৩২"
}

{
  day: "১৫",
  month: "শাওয়াল",
  year: "১৪৪৭"
}
```

### 2. Specific converter functions

যদি direct specific calendar converter use করতে চাও, তাহলে named export function ব্যবহার করতে পারো।

```ts
import {
  convertToBanglaDate,
  convertToArabicDate,
  convertToIndianDate,
  convertToJapaneseDate,
  convertToThaiDate,
  convertToTaiwanDate,
} from "local-date-kit";

const bangla = convertToBanglaDate("2026-04-14");
const arabic = convertToArabicDate("2026-04-14");
const indian = convertToIndianDate("2026-04-14");
const japanese = convertToJapaneseDate("2026-04-14");
const thai = convertToThaiDate("2026-04-14");
const taiwan = convertToTaiwanDate("2026-04-14");
```

Language option direct converter-এও কাজ করবে:

```ts
import { convertToBanglaDate, convertToArabicDate } from "local-date-kit";

const bangla = convertToBanglaDate("2026-04-14", { language: "bn" });
const arabic = convertToArabicDate("2026-04-14", { language: "ar" });
```

### 3. Converter object use করা

যদি converter object registry-style use করতে চাও:

```ts
import { getConverter } from "local-date-kit";

const converter = getConverter("japanese");
const result = converter.convert("2026-04-14", { language: "ja" });
```

## Supported Calendar Keys

`convertDate(input, calendar)`-এ বর্তমানে এই keys use করা যাবে:

- `bangla`
- `islamic`
- `indian`
- `japanese`
- `buddhist`
- `roc`

তালিকা runtime-এ পেতে:

```ts
import { listSupportedCalendars } from "local-date-kit";

console.log(listSupportedCalendars());
```

## Output Format

সব converter সাধারণত এই shape-এর object return করে:

```ts
type LocalCalendarDate = {
  country: string;
  calendar: string;
  nativeName: string;
  language: string;
  day: string;
  dayNumber: number;
  month: string;
  year: string;
  yearNumber: number;
};
```

### Field meaning

- `country`: converter যে country/context represent করছে
- `calendar`: internal calendar key
- `nativeName`: calendar-এর familiar or native name
- `language`: result কোন language mode-এ return হয়েছে
- `day`: language অনুযায়ী localized day string
- `dayNumber`: raw numeric day
- `month`: converted month name
- `year`: language অনুযায়ী localized year string
- `yearNumber`: raw numeric year

## Input Format

Package দুই ধরনের input accept করে:

- `Date`
- `string`

Examples:

```ts
convertDate(new Date(), "bangla");
convertDate("2026-04-14", "bangla");
convertDate("2026-04-14T10:30:00Z", "japanese");
convertDate("2026-04-14", "bangla", { language: "bn" });
```

### Important note about string input

Bare ISO date যেমন `"2026-04-14"` package calendar date হিসেবে parse করে, timezone-shifted timestamp হিসেবে না।  
এতে date conversion predictable থাকে।

Invalid input দিলে error throw করবে:

```ts
convertDate("not-a-date", "bangla");
```

## TypeScript Usage

Package typed exports দেয়।

```ts
import type {
  BanglaDate,
  ArabicDate,
  IndianDate,
  JapaneseDate,
  ThaiDate,
  TaiwanDate,
  ConvertOptions,
  SupportedCalendar,
} from "local-date-kit";
```

Example:

```ts
import { convertToBanglaDate } from "local-date-kit";
import type { BanglaDate } from "local-date-kit";

const result: BanglaDate = convertToBanglaDate("2026-04-14");
```

## Language Behavior

Default output language হলো `en`.

Language code examples:

- Bangla -> `bn`
- Islamic -> `ar`
- Indian -> `hi`
- Japanese -> `ja`
- Buddhist -> `th`
- ROC -> `zh-TW`

Example:

```ts
import { convertDate } from "local-date-kit";

const enResult = convertDate("2026-04-14", "bangla");
const banglaResult = convertDate("2026-04-14", "bangla", { language: "bn" });
```

## API Reference

### `convertDate(input, calendar, options?)`

Generic converter function.

```ts
convertDate(
  input: Date | string,
  calendar: SupportedCalendar,
  options?: { language?: string }
)
```

### `getConverter(calendar)`

Specific calendar converter object return করে।

```ts
getConverter(calendar: SupportedCalendar)
```

Converter object-এও একই options support করে:

```ts
converter.convert("2026-04-14", { language: "ja" })
```

### `listSupportedCalendars()`

Supported calendar key-এর array return করে।

```ts
listSupportedCalendars(): SupportedCalendar[]
```

### `isSupportedCalendar(value)`

String valid supported calendar কি না check করে।

```ts
isSupportedCalendar(value: string): boolean
```

Example:

```ts
import { isSupportedCalendar, convertDate } from "local-date-kit";

const calendar = "bangla";

if (isSupportedCalendar(calendar)) {
  console.log(convertDate("2026-04-14", calendar));
}
```

## Calendar Mapping

বর্তমানে package-এর calendar mapping:

- Bangladesh -> `bangla` -> `Bangabda`
- Saudi Arabia -> `islamic` -> `Hijri`
- India -> `indian` -> `Saka`
- Japan -> `japanese` -> `Wareki`
- Thailand -> `buddhist` -> `Phutthasakkarat`
- Taiwan -> `roc` -> `Minguo`

## Project Structure

```txt
src/
  calendars/
    bangla/
    hijri/
    indian/
    japanese/
    roc/
    thai-buddhist/
  core/
  registry.ts
  index.ts
```

## Adding a New Calendar

Future-এ নতুন calendar add করতে এই pattern follow করো:

1. `src/calendars/<calendar-name>/types.ts`
2. `src/calendars/<calendar-name>/converter.ts`
3. `src/calendars/<calendar-name>/index.ts`
4. `src/registry.ts`-এ register করো
5. `src/index.ts`-এ export করো

### Example outline

```ts
// src/calendars/example/converter.ts
import type { CalendarConverter } from "../../core/types.js";

export const exampleConverter: CalendarConverter = {
  calendar: "example",
  convert(input, options) {
    return {
      country: "Example",
      calendar: "example",
      nativeName: "Example Calendar",
      language: options?.language ?? "en",
      day: "1",
      dayNumber: 1,
      month: "Month",
      year: "1000",
      yearNumber: 1000,
    };
  },
};
```

তারপর `registry.ts`-এ add করো:

```ts
const converters = {
  example: exampleConverter,
};
```

## Development

Project build:

```bash
pnpm build
```

Watch/dev mode:

```bash
pnpm dev
```

## Notes

- Bangla calendar custom logic দিয়ে implemented
- Bangla year/day string-এ grouping comma use করা হয় না
- Bangla এবং Hijri output Bangladesh-facing expected dates অনুযায়ী tuned
- বাকি কিছু calendar built-in `Intl.DateTimeFormat` calendar support ব্যবহার করে
- Month names locale অনুযায়ী আসতে পারে
- Language-specific output environment-এর `Intl` support-এর উপর depend করে
- Environment-specific `Intl` support অনুযায়ী formatting কিছু ক্ষেত্রে vary করতে পারে

## License

ISC
