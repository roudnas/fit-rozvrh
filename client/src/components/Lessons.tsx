import { areIntervalsOverlapping, getDay } from 'date-fns';
import { useMemo } from 'react';
import "../styles/Lessons.scss";

import useVictim from '../hooks/useVictim';
import { PersonInfo, TimetableRecord } from '../services/DataService';
import { intervalFromLesson } from '../utils/TimeUtil';
import { CollisionInfo, Lesson } from './Lesson';
import { TimeIndicator } from './TimeIndicator';

export type ContextualizedLesson = TimetableRecord & {
  prevEndTime?: string;
  /** Array of people who share the same lesson */
  intersections?: PersonInfo[];
};

type Props = {
  lessons: ContextualizedLesson[];
  dayIndex: number;
};

const getDayName = (index: number) => {
  const names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  return names[index];
};

export const Lessons = ({ lessons, dayIndex }: Props) => {
  const { activeVictim } = useVictim();

  const lessonsWithCollisions = useMemo(() => {
    const returnArr: (ContextualizedLesson & CollisionInfo)[] = [];

    lessons.forEach((lesson) => {
      let currentLevel = 1;

      returnArr.forEach((sortedLesson) => {
        if (
          areIntervalsOverlapping(
            intervalFromLesson(lesson),
            intervalFromLesson(sortedLesson),
          )
        ) {
          currentLevel = sortedLesson.levelCount += 1;
        }
      });

      returnArr.push({
        ...lesson,
        level: currentLevel,
        levelCount: currentLevel,
      });
    });

    return returnArr;
  }, [lessons, activeVictim]);

  return (
    <>
      <div
        className="lessons py-2 text-dark d-flex flex-row"
        style={{ zIndex: dayIndex }}
      >
        <h5 className="day-text text-light h-index my-auto">
          {getDayName(dayIndex)}
        </h5>
        {dayIndex + 1 === getDay(new Date()) && <TimeIndicator />}
        {lessonsWithCollisions.map((lessonWithCollisions, i) => {
          return <Lesson key={i} dataWithCollisions={lessonWithCollisions} />;
        })}
      </div>
    </>
  );
};
