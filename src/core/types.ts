export type DateInput = Date | string;

export interface ConvertOptions {
  language?: string;
}

export interface LocalCalendarDate {
  country: string;
  calendar: string;
  nativeName: string;
  language: string;
  day: string;
  dayNumber: number;
  month: string;
  year: string;
  yearNumber: number;
}

export interface CalendarConverter<TDate extends LocalCalendarDate = LocalCalendarDate> {
  calendar: string;
  convert(input: DateInput, options?: ConvertOptions): TDate;
}
