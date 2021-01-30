import { TickEvent } from './clock'

export function wait (ms: number): Promise<void> {
  return new Promise((resolve) => {
    // @ts-ignore
    return setTimeout(resolve, ms)
  })
}

export function getTickEvent (hour: number, minute: number, day?: number, month?: number): TickEvent {
  return <TickEvent><unknown>{
    date: new Date(2020, month || 5, day || 30, hour, minute, 30)
  }
}
