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
export declare type OnTimeUpdateCb = (data: TimeData) => any;
export declare type OnDateUpdateCb = (data: DateData) => any;
export interface DigitalClockConfig {
    granularity?: Granularity;
    padHours?: boolean;
    padMinutes?: boolean;
}
export declare class DigitalClock {
    private readonly padHours;
    private readonly padMinutes;
    private readonly timeCb;
    private readonly dateCb;
    private use12HourFormat;
    private lastDate;
    constructor(timeCb: OnTimeUpdateCb, dateCb?: OnDateUpdateCb, cfg?: DigitalClockConfig);
    private onUpdate;
}
