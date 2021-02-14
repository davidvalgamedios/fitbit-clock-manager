# Fitbit Clock Manager
This package will help you build clockfaces much easier and focus on your designs

### Features
- Handle date & time updates
- Automatic format time in 12/24 hours depending on the user preferences
- Configurable padding with 0 for hours and minutes

### Installation
Install with `npm i fitbit-clock-manager` or `yarn add fitbit-clock-manager`

### Usage

```typescript
import {DigitalClock, TimeData, DateData} from "fitbit-clock-manager"
import document from "document"

const timeLabel = document.getElementById('timeLabel')
const dateLabel = document.getElementById('dateLabel')

function onTimeUpdate(data: TimeData) {
  timeLabel.text = `${data.hours}:${data.minutes}`
}
function onDateUpdate(data: DateData) {
  dateLabel.text = `${data.day}/${data.month}/${data.year}`
}

new DigitalClock(onTimeUpdate, onDateUpdate, {padHours: true, padMinutes: true})
```

### Config
```typescript
interface DigitalClockConfig {
  granularity?: 'off' | 'seconds' | 'minutes' | 'hours',
  padHours?: boolean,
  padMinutes?: boolean,
  hourFormat?: '12h' | '24h' // If not set will be used the device preferences
}
```

### Interfaces
```typescript
interface TimeData {
  hours: string,
  minutes: string
}

interface DateData {
  day: number,
  month: number,
  year: number,
  weekDay: number
}
```
