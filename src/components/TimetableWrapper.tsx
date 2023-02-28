import { createContext, useEffect, useState } from 'react';

import {
  APP_PADDING_X,
  TIMETABLE_END_HOUR,
  TIMETABLE_START_HOUR,
} from '../App';
import { Hour } from './Hour';
import { ContextualizedLesson, Lessons } from './Lessons';
import { getLessonKey } from '../utils/intersections';
import useVictim from '../hooks/useVictim';

export const HourWidthContext = createContext<undefined | number>(undefined);

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export const TimetableWrapper = () => {
  const { activeTimetable, isLoading } = useVictim();

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    const listener = () => {
      setWindowDimensions(getWindowDimensions());
    };
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  const timetableHoursCount = TIMETABLE_END_HOUR - TIMETABLE_START_HOUR + 1;
  const targetWindowWidth =
    windowDimensions.width >= 1200 ? windowDimensions.width : 1200;
  const timetableWidth = targetWindowWidth - APP_PADDING_X * 2;

  const hourWidthPx = timetableWidth / timetableHoursCount;

  const hours: JSX.Element[] = [];
  for (let hour = TIMETABLE_START_HOUR; hour <= TIMETABLE_END_HOUR; hour++) {
    hours.push(<Hour hour={hour} key={hour} />);
  }

  return (
    <HourWidthContext.Provider value={hourWidthPx}>
      <div className="bg-dark wrapperino w-100 main rounded">
        <section className="lessonWrapper pt-1 main d-flex flex-column justify-content-between">
          <div className="hours header bg-second w-100 rounded text-dark d-flex flex-row justify-content-around ps-2">
            {hours}
          </div>
          {(isLoading && (
            <div className="spinner">
              <img src="/spinner2.gif" height="450" />
            </div>
          )) || (
            <div className="dayLessonsWrapper h-100 pt-3">
              {activeTimetable.map((dayLessons, day) => (
                <Lessons lessons={dayLessons} key={day} dayIndex={day} />
              ))}
            </div>
          )}
        </section>
      </div>
    </HourWidthContext.Provider>
  );
};
