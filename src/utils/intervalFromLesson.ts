import { parse } from 'date-fns';

import { TimetableRecord } from './dbQueries';

const timeFormat = 'HH:mm';

export function intervalFromLesson(lesson: TimetableRecord) {
  return {
    start: parse(lesson.startTime, timeFormat, 0),
    end: parse(lesson.endTime, timeFormat, 0),
  };
}
