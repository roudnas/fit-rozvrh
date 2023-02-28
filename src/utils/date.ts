import moment from 'moment';

/**
 * The time data CTU provides is generated in the Europe/Prague timezone (+1 hour).
 */
export const UTC_OFFSET = 1;

/**
 * Get moment's, timezone corrected, date object.
 */
export function getOffsetDate() {
  return moment().utcOffset(UTC_OFFSET);
}

/**
 * Get the current week number (since the given semester start).
 * @param semesterStartTimestamp unix timestamp of the semester start (in milliseconds).
 */
export function getSemesterWeekNo(semesterStartTimestamp: number) {
  const diff = getOffsetDate()
    .diff(moment.unix(semesterStartTimestamp / 1000), 'weeks');

  return 1 + Math.abs(diff);
}

export function getEvenOddWeek() {
  return getOffsetDate().week() % 2 === 0 ? 'even' : 'odd';
}