export interface TickEvent extends Event {
  readonly date: Date;
}

const clock = {
  granularity: '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ontick: (event: TickEvent) => {}
}

export default clock
