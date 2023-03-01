import { differenceInCalendarWeeks, getWeek, subMinutes, addMinutes } from 'date-fns';
import { getTimezoneOffset } from 'date-fns-tz';

/**
 * The time data CTU provides is generated in the Europe/Prague timezone (GMT +1).
 */
export const CTU_TIMEZONE_OFFSET = getTimezoneOffset('Europe/Prague') / 3600000;

/**
 * Get "timezone corrected", date object.
 */
export function getOffsetDate() {
  const date = new Date();
  // how many minutes are we off from the CTU timezone
  const offset = date.getTimezoneOffset() + CTU_TIMEZONE_OFFSET * 60;

  if (offset === 0)
    return date; // no offset, return the original date

  // add or subtract the offset to get the correct date
  return offset > 0 ?
    addMinutes(date, Math.abs(offset)) :
    subMinutes(date, Math.abs(offset));
}

/**
 * Get the current week number (since the given semester start).
 * @param semesterStartTimestamp unix timestamp of the semester start (in milliseconds).
 */
export function getSemesterWeekNo(semesterStartTimestamp: number) {
  return 1 + differenceInCalendarWeeks(
    getOffsetDate(),
    new Date(semesterStartTimestamp),
    { weekStartsOn: 1 },
  );
}

export function getEvenOddWeek() {
  return getWeek(
    getOffsetDate(), { weekStartsOn: 1 }
  ) % 2 === 1 ? 'even' : 'odd';
}