import { useContext } from 'react';

import { TIMETABLE_START_HOUR } from '../App';
import { TIME_OFFSET_PX } from './Hour';
import { ContextualizedLesson } from './Lessons';
import { HourWidthContext } from './TimetableWrapper';
import { LessonIntersection } from './LessonIntersection';

export const SEPARATOR_WHITESPACE_PERCENTAGE = 4;

export const MINIMUM_OVERLAP_FOR_INLINE = 2;

export type CollisionInfo = {
  level: number;
  levelCount: number;
};

type Props = {
  dataWithCollisions: ContextualizedLesson & CollisionInfo;
  setVictimId: (newVictimId: string | null) => void;
};

const parseTimeToHours = (timeStr: string) => {
  const h = parseFloat(timeStr.split(':')[0]);
  const m = parseFloat(timeStr.split(':')[1]) / 60;
  return h + m;
};

export const Lesson = ({ dataWithCollisions, setVictimId }: Props) => {
  const hourWidthPx = useContext(HourWidthContext);
  const intersections = dataWithCollisions.intersections;

  if (hourWidthPx === undefined) return null;

  const startTime = parseTimeToHours(dataWithCollisions.startTime);
  const endTime = parseTimeToHours(dataWithCollisions.endTime);
  const prevEndTime = dataWithCollisions.prevEndTime
    ? parseTimeToHours(dataWithCollisions.prevEndTime)
    : null;

  let marL = (startTime - TIMETABLE_START_HOUR) * hourWidthPx - TIME_OFFSET_PX;

  if (prevEndTime) {
    marL = (startTime - prevEndTime) * hourWidthPx;
  }

  const width = (endTime - startTime) * hourWidthPx;

  const displayInline =
    dataWithCollisions.levelCount > MINIMUM_OVERLAP_FOR_INLINE;

  // TODO: implement a way to display the intersections

  return (
    <div
      className={`lesson text-dark rounded bg-${dataWithCollisions.type}`}
      style={{
        width: width,
        marginLeft: marL,
        zIndex: dataWithCollisions.level,
        top: `${
          (100 / dataWithCollisions.levelCount) * (dataWithCollisions.level - 1)
        }%`,
        height: `${
          100 / dataWithCollisions.levelCount - SEPARATOR_WHITESPACE_PERCENTAGE
        }%`,

        ...(displayInline && {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }),
      }}
    >
      {intersections && intersections.length > 1 && (
        <div className="lesson-intersections">
          {intersections.map((intersection, i) => (
            <LessonIntersection key={i} index={intersections.length - i} intersection={intersection} setVictimId={setVictimId} />
          ))}
        </div>
      )}
      <div className={`lesson-content p-2`}>
        {dataWithCollisions.note && (
          <h6 className="note bg-danger p-1 text-bold text-light rounded">
            {dataWithCollisions.note}
          </h6>
        )}
        {dataWithCollisions.levelCount === 1 && (
          <h6 className="m-0 ">
            {dataWithCollisions.startTime} - {dataWithCollisions.endTime}
          </h6>
        )}
        <h6 className="m-0 text-bold">{dataWithCollisions.title}</h6>
        <h6 className="m-0 ">{dataWithCollisions.room}</h6>
      </div>
    </div>
  );
};
