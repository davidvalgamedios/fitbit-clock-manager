import { DigitalClock } from '../src'
import clock from '../__mocks__/clock'
import { getTickEvent } from '../__mocks__/test.util'
import { DateData, TimeData } from '../src/types/digital-clock.types'
import {preferences} from '../__mocks__/user-settings'

describe('Digital clock', () => {

  beforeEach(() => {
    preferences.clockDisplay = '24h'
  });

  test('Test default settings, time only', () => {
    const timeCb = jest.fn()
    new DigitalClock(timeCb)
    const response: TimeData = {
      hours: '05',
      minutes: '30'
    }

    clock.ontick(getTickEvent(5, 30))

    expect(timeCb).toHaveBeenCalledTimes(1)
    expect(timeCb).toHaveBeenCalledWith(response)
  })

  test('Test default settings, time and date', () => {
    const timeCb = jest.fn()
    const dateCb = jest.fn()
    new DigitalClock(timeCb, dateCb)
    const timeResponse: TimeData = {
      hours: '15',
      minutes: '30'
    }
    const dateResponse: DateData = {
      month: 5,
      year: 2020,
      day: 30,
      weekDay: 2
    }

    clock.ontick(getTickEvent(15, 30))

    expect(timeCb).toHaveBeenCalledTimes(1)
    expect(timeCb).toHaveBeenCalledWith(timeResponse)
    expect(dateCb).toHaveBeenCalledTimes(1)
    expect(dateCb).toHaveBeenCalledWith(dateResponse)
  })

  test('Test time padding', () => {
    const timeCb = jest.fn()
    new DigitalClock(timeCb, null, {padHours: true, padMinutes: true})
    const timeResponse: TimeData = {
      hours: '05',
      minutes: '06'
    }

    clock.ontick(getTickEvent(5, 6))

    expect(timeCb).toHaveBeenCalledTimes(1)
    expect(timeCb).toHaveBeenCalledWith(timeResponse)
  })

  test('Test time NO padding', () => {
    const timeCb = jest.fn()
    new DigitalClock(timeCb, null, {padHours: false, padMinutes: false})
    const timeResponse: TimeData = {
      hours: '5',
      minutes: '6'
    }

    clock.ontick(getTickEvent(5, 6))

    expect(timeCb).toHaveBeenCalledTimes(1)
    expect(timeCb).toHaveBeenCalledWith(timeResponse)
  })

  test('Test time 12 hrs', () => {
    const timeCb = jest.fn()
    new DigitalClock(timeCb, null, {hourFormat: '12h'})
    const timeResponse: TimeData = {
      hours: '03',
      minutes: '25'
    }

    clock.ontick(getTickEvent(15, 25))

    expect(timeCb).toHaveBeenCalledTimes(1)
    expect(timeCb).toHaveBeenCalledWith(timeResponse)
  })

  test('Test time 24 hrs', () => {
    const timeCb = jest.fn()
    new DigitalClock(timeCb, null, {hourFormat: '24h', padHours: false})
    const timeResponse: TimeData = {
      hours: '15',
      minutes: '25'
    }

    clock.ontick(getTickEvent(15, 25))

    expect(timeCb).toHaveBeenCalledTimes(1)
    expect(timeCb).toHaveBeenCalledWith(timeResponse)
  })

  test('Test time 12 hrs from preferences', () => {
    preferences.clockDisplay = '12h'

    const timeCb = jest.fn()
    new DigitalClock(timeCb)
    const timeResponse: TimeData = {
      hours: '03',
      minutes: '25'
    }

    clock.ontick(getTickEvent(15, 25))

    expect(timeCb).toHaveBeenCalledTimes(1)
    expect(timeCb).toHaveBeenCalledWith(timeResponse)
  })

  test('Test time 24 hrs from preferences', () => {
    preferences.clockDisplay = '24h'

    const timeCb = jest.fn()
    new DigitalClock(timeCb)
    const timeResponse: TimeData = {
      hours: '15',
      minutes: '25'
    }

    clock.ontick(getTickEvent(15, 25))

    expect(timeCb).toHaveBeenCalledTimes(1)
    expect(timeCb).toHaveBeenCalledWith(timeResponse)
  })

  test('Test without no date updates', () => {
    const timeCb = jest.fn()
    const dateCb = jest.fn()
    new DigitalClock(timeCb, dateCb)
    const timeResponseA: TimeData = {
      hours: '15',
      minutes: '30'
    }
    const timeResponseB: TimeData = {
      hours: '15',
      minutes: '30'
    }
    const dateResponse: DateData = {
      month: 5,
      year: 2020,
      day: 30,
      weekDay: 2
    }

    clock.ontick(getTickEvent(15, 30))
    clock.ontick(getTickEvent(15, 31))

    expect(timeCb).toHaveBeenCalledTimes(2)
    expect(timeCb).toHaveBeenCalledWith(timeResponseA)
    expect(timeCb).toHaveBeenCalledWith(timeResponseB)
    expect(dateCb).toHaveBeenCalledTimes(1)
    expect(dateCb).toHaveBeenCalledWith(dateResponse)
  })

  test('Test with date updates', () => {
    const timeCb = jest.fn()
    const dateCb = jest.fn()
    new DigitalClock(timeCb, dateCb)
    const timeResponseA: TimeData = {
      hours: '15',
      minutes: '30'
    }
    const timeResponseB: TimeData = {
      hours: '16',
      minutes: '20'
    }
    const dateResponseA: DateData = {
      month: 4,
      year: 2020,
      day: 30,
      weekDay: 6
    }
    const dateResponseB: DateData = {
      month: 4,
      year: 2020,
      day: 31,
      weekDay: 0
    }

    clock.ontick(getTickEvent(15, 30, 30, 4))
    clock.ontick(getTickEvent(16, 20, 31, 4))

    expect(timeCb).toHaveBeenCalledTimes(2)
    expect(timeCb).toHaveBeenCalledWith(timeResponseA)
    expect(timeCb).toHaveBeenCalledWith(timeResponseB)
    expect(dateCb).toHaveBeenCalledTimes(2)
    expect(dateCb).toHaveBeenCalledWith(dateResponseA)
    expect(dateCb).toHaveBeenCalledWith(dateResponseB)
  })
})
