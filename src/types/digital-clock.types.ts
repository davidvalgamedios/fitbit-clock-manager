export type Granularity = 'off' | 'seconds' | 'minutes' | 'hours'

export interface TimeData {
  hours: string,
  minutes: string
}

export interface DateData {
  day: number,
  month: number,
  year: number,
  weekDay: number
}

export type OnTimeUpdate = (data: TimeData) => any;
export type OnDateUpdate = (data: DateData) => any;

export interface DigitalClockConfig {
  granularity?: Granularity,
  padHours?: boolean,
  padMinutes?: boolean,
  hourFormat?: '12h' | '24h'
}
