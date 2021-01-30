import { DigitalClockConfig, OnDateUpdate, OnTimeUpdate } from './types/digital-clock.types';
export declare class DigitalClock {
    private readonly padHours;
    private readonly padMinutes;
    private readonly timeCb;
    private readonly dateCb;
    private use12HourFormat;
    private lastDate;
    constructor(timeCb: OnTimeUpdate, dateCb?: OnDateUpdate, cfg?: DigitalClockConfig);
    private onUpdate;
}
