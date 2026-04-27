export type DateInput = Date | string;

export interface ConvertOptions {
  language?: string;
}

export type ConvertOptionInput = ConvertOptions | string;

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
  hour: string;
  hourNumber: number;
  minute: string;
  minuteNumber: number;
  second: string;
  secondNumber: number;
  period: string;
}

export interface CalendarConverter<TDate extends LocalCalendarDate = LocalCalendarDate> {
  calendar: string;
  convert(input: DateInput, options?: ConvertOptionInput): TDate;
}
