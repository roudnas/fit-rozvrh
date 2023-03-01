import { differenceInCalendarWeeks, getWeek } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

/**
 * The time data CTU provides is generated in the Europe/Prague timezone (GMT +1).
 */
export const CTU_TIMEZONE = 'Europe/Prague';

/**
 * Get "timezone corrected", date object.
 */
export function getOffsetDate() {
  return utcToZonedTime(new Date(), CTU_TIMEZONE);
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
  ) % 2 ? 'even' : 'odd';
}