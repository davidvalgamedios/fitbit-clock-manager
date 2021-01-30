import clock, { TickEvent } from 'clock'
import { preferences } from 'user-settings'
import { DigitalClockConfig, OnDateUpdate, OnTimeUpdate } from './types/digital-clock.types'

export class DigitalClock {
  private readonly padHours: boolean
  private readonly padMinutes: boolean
  private readonly timeCb: OnTimeUpdate
  private readonly dateCb: OnDateUpdate
  private use12HourFormat: boolean
  private lastDate: Date

  constructor (timeCb: OnTimeUpdate, dateCb?: OnDateUpdate, cfg?: DigitalClockConfig) {
    this.timeCb = timeCb
    this.dateCb = dateCb
    this.padHours = cfg?.padHours !== undefined ? cfg.padHours : true
    this.padMinutes = cfg?.padMinutes !== undefined ? cfg.padMinutes : true
    this.use12HourFormat = (cfg?.hourFormat || preferences.clockDisplay) === '12h'
    clock.granularity = cfg?.granularity || 'minutes'
    clock.ontick = this.onUpdate.bind(this)
  }

  private onUpdate (event: TickEvent) {
    const hours = this.use12HourFormat ? event.date.getHours() % 12 : event.date.getHours()
    this.timeCb({
      hours: this.padHours ? padTime(hours) : hours.toString(),
      minutes: this.padMinutes ? padTime(event.date.getMinutes()) : event.date.getMinutes().toString()
    })

    if (this.dateCb && (
      !this.lastDate ||
      this.lastDate.getDate() !== event.date.getDate()
    )) {
      this.dateCb({
        day: event.date.getDate(),
        month: event.date.getMonth(),
        year: event.date.getFullYear(),
        weekDay: event.date.getDay()
      })
    }
    this.lastDate = event.date
  }
}

function padTime (num: number): string {
  return num < 10 ? `0${num}` : num.toString()
}
