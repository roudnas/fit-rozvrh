import { parse } from 'date-fns';

import { TimetableRecord } from './DBUtil';

const timeFormat = 'HH:mm';

export function intervalFromLesson(lesson: TimetableRecord) {
  return {
    start: parse(lesson.startTime, timeFormat, 0),
    end: parse(lesson.endTime, timeFormat, 0),
  };
}
