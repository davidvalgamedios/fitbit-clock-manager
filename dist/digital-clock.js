import clock from 'clock';
import { preferences } from 'user-settings';
var DigitalClock = /** @class */ (function () {
    function DigitalClock(timeCb, dateCb, cfg) {
        this.timeCb = timeCb;
        this.dateCb = dateCb;
        this.padHours = (cfg === null || cfg === void 0 ? void 0 : cfg.padHours) !== undefined ? cfg.padHours : true;
        this.padMinutes = (cfg === null || cfg === void 0 ? void 0 : cfg.padMinutes) !== undefined ? cfg.padMinutes : true;
        this.use12HourFormat = ((cfg === null || cfg === void 0 ? void 0 : cfg.hourFormat) || preferences.clockDisplay) === '12h';
        clock.granularity = (cfg === null || cfg === void 0 ? void 0 : cfg.granularity) || 'minutes';
        clock.ontick = this.onUpdate.bind(this);
    }
    DigitalClock.prototype.onUpdate = function (event) {
        var hours = this.use12HourFormat ? event.date.getHours() % 12 : event.date.getHours();
        this.timeCb({
            hours: this.padHours ? padTime(hours) : hours.toString(),
            minutes: this.padMinutes ? padTime(event.date.getMinutes()) : event.date.getMinutes().toString()
        });
        if (this.dateCb && (!this.lastDate ||
            this.lastDate.getDate() !== event.date.getDate())) {
            this.dateCb({
                day: event.date.getDate(),
                month: event.date.getMonth(),
                year: event.date.getFullYear(),
                weekDay: event.date.getDay()
            });
        }
        this.lastDate = event.date;
    };
    return DigitalClock;
}());
export { DigitalClock };
function padTime(num) {
    return num < 10 ? "0" + num : num.toString();
}
