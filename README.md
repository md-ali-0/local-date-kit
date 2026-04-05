# local-date-kit

[![npm version](https://img.shields.io/npm/v/local-date-kit.svg)](https://www.npmjs.com/package/local-date-kit)
[![npm downloads](https://img.shields.io/npm/dw/local-date-kit.svg)](https://www.npmjs.com/package/local-date-kit)
[![CI](https://github.com/md-ali-0/local-date-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/md-ali-0/local-date-kit/actions/workflows/ci.yml)
[![License: ISC](https://img.shields.io/badge/license-ISC-blue.svg)](./LICENSE)

`local-date-kit` is a TypeScript package for converting Gregorian dates into local calendar formats with language-aware output.

It is built for product UIs that need ready-to-render local calendar dates instead of raw date math.

It is designed for apps that need:

- Bangla calendar support
- Hijri / Islamic date support
- Indian calendar support
- Japanese calendar support
- Thai Buddhist calendar support
- ROC calendar support
- localized month, day, and year strings

## Highlights

- One generic `convertDate()` API for all supported calendars
- Direct calendar-specific converter functions
- Language-code based output such as `en`, `bn`, `ar`, `hi`, `ja`, `th`, and `zh-TW`
- Localized digits for `day` and `year`
- Raw numeric values via `dayNumber` and `yearNumber`
- Safe parsing for bare ISO input like `"2026-04-14"`
- Structured output that works well in UI rendering

## Best For

- news sites that show Bangla date alongside Hijri date
- dashboard widgets and calendars
- Bengali-language products that need localized numerals
- apps that need one data shape across multiple calendars

## Installation

```bash
pnpm add local-date-kit
```

or

```bash
npm install local-date-kit
```

## Quick Start

```ts
import { convertDate } from "local-date-kit";

const banglaDate = convertDate("2026-04-04", "bangla", { language: "bn" });

console.log(banglaDate);
```

Example output:

```ts
{
  country: "Bangladesh",
  calendar: "bangla",
  nativeName: "Bangabda",
  language: "bn",
  day: "২১",
  dayNumber: 21,
  month: "চৈত্র",
  year: "১৪৩২",
  yearNumber: 1432
}
```

## Why This Package

Most date libraries give you a Gregorian-first workflow.

`local-date-kit` focuses on:

- local calendar output
- language-aware display values
- frontend-friendly result objects
- Bangladesh-facing Bangla and Hijri expectations

## Supported Calendars

Use these keys with `convertDate(input, calendar, options)`:

- `bangla`
- `islamic`
- `indian`
- `japanese`
- `buddhist`
- `roc`

You can also get the list at runtime:

```ts
import { listSupportedCalendars } from "local-date-kit";

console.log(listSupportedCalendars());
```

## Basic Usage

### Generic API

```ts
import { convertDate } from "local-date-kit";

const bangla = convertDate("2026-04-04", "bangla", { language: "bn" });
const hijri = convertDate("2026-04-04", "islamic", { language: "bn" });
const indian = convertDate("2026-04-14", "indian", { language: "hi" });
const japanese = convertDate("2026-04-14", "japanese", { language: "ja" });
const thai = convertDate("2026-04-14", "buddhist", { language: "th" });
const roc = convertDate("2026-04-14", "roc", { language: "zh-TW" });
```

You can render these values directly in UI:

```ts
const label = `${bangla.day} ${bangla.month} ${bangla.year}`;
```

### Direct Converter Functions

```ts
import {
  convertToBanglaDate,
  convertToArabicDate,
  convertToIndianDate,
  convertToJapaneseDate,
  convertToThaiDate,
  convertToTaiwanDate,
} from "local-date-kit";

const bangla = convertToBanglaDate("2026-04-04", { language: "bn" });
const hijri = convertToArabicDate("2026-04-04", { language: "bn" });
const indian = convertToIndianDate("2026-04-14", { language: "hi" });
const japanese = convertToJapaneseDate("2026-04-14", { language: "ja" });
const thai = convertToThaiDate("2026-04-14", { language: "th" });
const roc = convertToTaiwanDate("2026-04-14", { language: "zh-TW" });
```

### Converter Object

```ts
import { getConverter } from "local-date-kit";

const converter = getConverter("japanese");
const result = converter.convert("2026-04-14", { language: "ja" });
```

## Language Support

The package uses language codes instead of a special `native` mode.

Common examples:

- Bangla calendar: `en`, `bn`
- Islamic calendar: `en`, `bn`, `ar`
- Indian calendar: `en`, `bn`, `hi`
- Japanese calendar: `en`, `bn`, `ja`
- Thai Buddhist calendar: `en`, `bn`, `th`
- ROC calendar: `en`, `bn`, `zh-TW`

If a language code is not mapped for a calendar, the package falls back to `en`.

### Bangladesh-Facing Example

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

## Return Format

All converters return an object similar to this:

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

### Field Reference

- `country`: country or cultural context of the calendar
- `calendar`: internal calendar key
- `nativeName`: familiar calendar name
- `language`: resolved output language
- `day`: localized day string
- `dayNumber`: raw numeric day
- `month`: localized month name
- `year`: localized year string
- `yearNumber`: raw numeric year

## Input

Accepted input types:

- `Date`
- `string`

Examples:

```ts
convertDate(new Date(), "bangla");
convertDate("2026-04-14", "bangla");
convertDate("2026-04-14T10:30:00Z", "japanese");
convertDate("2026-04-04", "islamic", { language: "bn" });
```

### ISO Date Parsing

Bare ISO strings like `"2026-04-14"` are treated as calendar dates, not timezone-shifted timestamps.

If the input is invalid, the converter throws an error:

```ts
convertDate("not-a-date", "bangla");
```

## TypeScript

```ts
import type {
  ArabicDate,
  BanglaDate,
  CalendarConverter,
  ConvertOptions,
  DateInput,
  IndianDate,
  JapaneseDate,
  LocalCalendarDate,
  SupportedCalendar,
  TaiwanDate,
  ThaiDate,
} from "local-date-kit";
```

Example:

```ts
import { convertToBanglaDate } from "local-date-kit";
import type { BanglaDate } from "local-date-kit";

const result: BanglaDate = convertToBanglaDate("2026-04-04", { language: "bn" });
```

## API

### `convertDate(input, calendar, options?)`

```ts
convertDate(
  input: Date | string,
  calendar: SupportedCalendar,
  options?: { language?: string }
)
```

### `getConverter(calendar)`

```ts
getConverter(calendar: SupportedCalendar)
```

### `listSupportedCalendars()`

```ts
listSupportedCalendars(): SupportedCalendar[]
```

### `isSupportedCalendar(value)`

```ts
isSupportedCalendar(value: string): boolean
```

## UI Example

```ts
import { convertDate } from "local-date-kit";

const banglaDate = convertDate("2026-04-04", "bangla", { language: "bn" });
const hijriDate = convertDate("2026-04-04", "islamic", { language: "bn" });

const label = `${banglaDate.day} ${banglaDate.month} ${banglaDate.year}, ${hijriDate.day} ${hijriDate.month} ${hijriDate.year}`;

console.log(label);
// ২১ চৈত্র ১৪৩২, ১৫ শাওয়াল ১৪৪৭
```

## Calendar Notes

- Bangla output is tuned for Bangladesh-facing expectations
- Hijri output is also tuned for Bangladesh-facing expectations in this package
- Bangla day and year strings never use grouping commas
- Some calendars rely on `Intl.DateTimeFormat`, so formatting can vary slightly depending on environment support

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

## Development

Build:

```bash
pnpm build
```

Dev mode:

```bash
pnpm dev
```

## Author

Mohammad Ali  
Full-Stack Developer  
Website: https://md-ali.vercel.app  
Email: md.ali.office@gmail.com

## Links

- Portfolio: https://md-ali.vercel.app
- npm: https://www.npmjs.com/package/local-date-kit
- GitHub: https://github.com/md-ali-0/local-date-kit

## License

ISC
