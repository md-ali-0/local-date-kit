export type DateInput = Date | string;
export type OutputLanguage = "en" | "native";

export interface ConvertOptions {
  language?: OutputLanguage;
}

export interface LocalCalendarDate {
  country: string;
  calendar: string;
  nativeName: string;
  language: OutputLanguage;
  day: number;
  month: string;
  year: number;
}

export interface CalendarConverter<TDate extends LocalCalendarDate = LocalCalendarDate> {
  calendar: string;
  convert(input: DateInput, options?: ConvertOptions): TDate;
}
