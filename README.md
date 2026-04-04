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
- TypeScript-friendly typed return values
- Returned result-এ `country`, `calendar`, `nativeName`, `day`, `month`, `year`
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
  day: 1,
  month: "Boishakh",
  year: 1433
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

### 3. Converter object use করা

যদি converter object registry-style use করতে চাও:

```ts
import { getConverter } from "local-date-kit";

const converter = getConverter("japanese");
const result = converter.convert("2026-04-14");
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
  day: number;
  month: string;
  year: number;
};
```

### Field meaning

- `country`: converter যে country/context represent করছে
- `calendar`: internal calendar key
- `nativeName`: calendar-এর familiar or native name
- `day`: converted day
- `month`: converted month name
- `year`: converted year

## Input Format

Package দুই ধরনের input accept করে:

- `Date`
- `string`

Examples:

```ts
convertDate(new Date(), "bangla");
convertDate("2026-04-14", "bangla");
convertDate("2026-04-14T10:30:00Z", "japanese");
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
  SupportedCalendar,
} from "local-date-kit";
```

Example:

```ts
import { convertToBanglaDate } from "local-date-kit";
import type { BanglaDate } from "local-date-kit";

const result: BanglaDate = convertToBanglaDate("2026-04-14");
```

## API Reference

### `convertDate(input, calendar)`

Generic converter function.

```ts
convertDate(input: Date | string, calendar: SupportedCalendar)
```

### `getConverter(calendar)`

Specific calendar converter object return করে।

```ts
getConverter(calendar: SupportedCalendar)
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
  convert(input) {
    return {
      country: "Example",
      calendar: "example",
      nativeName: "Example Calendar",
      day: 1,
      month: "Month",
      year: 1000,
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
- বাকি কিছু calendar built-in `Intl.DateTimeFormat` calendar support ব্যবহার করে
- Month names locale অনুযায়ী আসতে পারে
- Environment-specific `Intl` support অনুযায়ী formatting কিছু ক্ষেত্রে vary করতে পারে

## License

ISC
