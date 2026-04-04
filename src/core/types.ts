export type DateInput = Date | string;

export interface LocalCalendarDate {
  country: string;
  calendar: string;
  nativeName: string;
  day: number;
  month: string;
  year: number;
}

export interface CalendarConverter<TDate extends LocalCalendarDate = LocalCalendarDate> {
  calendar: string;
  convert(input: DateInput): TDate;
}
