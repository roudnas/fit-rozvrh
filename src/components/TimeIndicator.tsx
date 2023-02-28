import { useContext, useEffect, useState } from 'react';

import {getOffsetDate} from "../utils/date";
import {
  TIMETABLE_PIN_END_HOUR,
  TIMETABLE_PIN_START_HOUR,
  TIMETABLE_START_HOUR,
} from '../App';
import { TIME_OFFSET_PX } from './Hour';
import { HourWidthContext } from './TimetableWrapper';

export const TIME_INDICATOR_REFRESH_MS = 60000;

export function TimeIndicator() {
  const [currentTime, setCurrentTime] = useState(getOffsetDate());
  const currentTimeHours = currentTime.hours() + currentTime.minutes() / 60;

  const hourWidthPx = useContext(HourWidthContext);

  if (hourWidthPx === undefined) return null;

  useEffect(() => {
    const minuteRefresher = setInterval(() => {
      setCurrentTime(getOffsetDate());
    }, TIME_INDICATOR_REFRESH_MS);

    return () => clearInterval(minuteRefresher);
  }, []);

  if (
    currentTimeHours < TIMETABLE_PIN_START_HOUR ||
    currentTimeHours > TIMETABLE_PIN_END_HOUR
  )
    return null;

  const marL =
    (currentTimeHours - TIMETABLE_START_HOUR) * hourWidthPx + TIME_OFFSET_PX;

  return (
    <div className="time-indicator-wrapper" style={{ marginLeft: marL }}>
      <div className="time-indicator-pin" />
    </div>
  );
}
