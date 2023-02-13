import { useContext, useEffect, useState } from 'react';

import {
  TIMETABLE_PIN_END_HOUR,
  TIMETABLE_PIN_START_HOUR,
  TIMETABLE_START_HOUR,
} from '../App';
// TODO: TIME_OFFSET_PX should probably come from elsewhere
import { TIME_OFFSET_PX } from './Lesson';
import { HourWidthContext } from './TimetableWrapper';

export const TIME_INDICATOR_REFRESH_MS = 60000;

export function TimeIndicator() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const currentTimeHours =
    currentTime.getHours() + currentTime.getMinutes() / 60;

  const hourWidthPx = useContext(HourWidthContext);

  if (hourWidthPx === undefined) return null;

  useEffect(() => {
    const minuteRefresher = setInterval(() => {
      setCurrentTime(new Date());
    });

    return () => clearInterval(minuteRefresher);
  }, [TIME_INDICATOR_REFRESH_MS]);

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
