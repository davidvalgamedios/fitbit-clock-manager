export declare type Granularity = 'off' | 'seconds' | 'minutes' | 'hours';
export declare type TimeData = {
    hours: string;
    minutes: string;
};
export declare type DateData = {
    day: number;
    month: number;
    year: number;
    weekDay: number;
};
export declare type OnTimeUpdate = (data: TimeData) => any;
export declare type OnDateUpdate = (data: DateData) => any;
export interface DigitalClockConfig {
    granularity?: Granularity;
    padHours?: boolean;
    padMinutes?: boolean;
    hourFormat?: '12h' | '24h';
}
