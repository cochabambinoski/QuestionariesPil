/**
 * Created by smirandaz on 09/06/2018.
 */

/**
 * get date formar 01/01/2000
 * @param date
 * @returns format date
 */
export function getDateFormat(date) {
    let now = new Date(date);
    let dateFormat = require('dateformat');
    return dateFormat(now, "dd-mm-yyyy");
}

/**
 * get format date ISO
 * @param date
 * @returns format date
 */
export function dateToISO(date) {
    let newDate = new Date(date);
    let dateFormat = require('dateformat');
    return dateFormat(newDate, "yyyymmdd");
}

/**
 * get date now
 * @returns {Date}
 */
export function getNow() {
    let now = new Date();
    return now;
}

/**
 * get first date to month
 * @returns {Date}
 */
export function firstDayOfMonth() {
    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    let firstDay = new Date(y, m, 1);
    return firstDay;
}

export function getDate(date) {
    let dateNew = new Date(date);
    return dateNew;
}