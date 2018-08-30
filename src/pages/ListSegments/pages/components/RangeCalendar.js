/**
 * Created by smirandaz on 08/30/2018.
 */

import React, {Component} from "react";
import {Calendar} from "primereact/calendar";

class RangeCalendar extends Component {

    constructor() {
        super();

        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = (month === 0) ? 11 : month - 1;
        let prevYear = (prevMonth === 11) ? year - 1 : year;
        let nextMonth = (month === 11) ? 0 : month + 1;
        let nextYear = (nextMonth === 0) ? year + 1 : year;

        let minDate = new Date();
        minDate.setMonth(prevMonth);
        minDate.setFullYear(prevYear);
        let maxDate = new Date();
        maxDate.setMonth(nextMonth);
        maxDate.setFullYear(nextYear);

        this.state = {
            dates: null,
            minDate: minDate,
            maxDate: maxDate,
            invalidDates: [today]
        };

        this.dateTemplate = this.dateTemplate.bind(this);
    }

    dateTemplate(date) {
        if (date.day > 10 && date.day < 15) {
            return (
                <span style={{
                    backgroundColor: '#1d8ccb',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    borderRadius: '50%',
                    padding: '.25em'
                }}>{date.day}</span>
            );
        }
        else {
            return date.day;
        }
    }

    render() {
        const es = {
            firstDayOfWeek: 1,
            dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
            dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
            dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
            monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
            monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
        };
        return (
            <div>
                <Calendar value={this.state.dates} onChange={(e) => this.setState({dates: e.value})}
                          selectionMode="range" readonlyInput={true}/>
            </div>
        );
    }
}

RangeCalendar.propTypes = {};

export default RangeCalendar;

