import { useContext } from 'react';

import { TIMETABLE_START_HOUR } from '../App';
import { ContextualizedLesson } from './Lessons';
import { HourWidthContext } from './TimetableWrapper';

export const DAY_TEXT_WIDTH = 40;
export const TIME_OFFSET_PX = 25;

export const SEPARATOR_WHITESPACE_PERCENTAGE = 4;

export const MINIMUM_OVERLAP_FOR_INLINE = 2;

export type CollisionInfo = {
  level: number;
  levelCount: number;
};

type Props = {
  dataWithCollisions: ContextualizedLesson & CollisionInfo;
};

const parseTimeToHours = (timeStr: string) => {
  const h = parseFloat(timeStr.split(':')[0]);
  const m = parseFloat(timeStr.split(':')[1]) / 60;
  return h + m;
};

export const Lesson = ({ dataWithCollisions }: Props) => {
  const hourWidthPx = useContext(HourWidthContext);

  if (hourWidthPx === undefined) return null;

  const startTime = parseTimeToHours(dataWithCollisions.startTime);
  const endTime = parseTimeToHours(dataWithCollisions.endTime);
  const prevEndTime = dataWithCollisions.prevEndTime
    ? parseTimeToHours(dataWithCollisions.prevEndTime)
    : null;

  // TODO: This could be tidied up...
  let marL =
    (startTime - TIMETABLE_START_HOUR) * hourWidthPx -
    DAY_TEXT_WIDTH +
    TIME_OFFSET_PX;

  if (prevEndTime) {
    marL = (startTime - prevEndTime) * hourWidthPx;
  }

  const width = (endTime - startTime) * hourWidthPx;
  const className = `lesson text-dark rounded bg-${dataWithCollisions.type} p-2`;

  const displayInline =
    dataWithCollisions.levelCount > MINIMUM_OVERLAP_FOR_INLINE;

  return (
    <div
      className={className}
      style={{
        width: width,
        marginLeft: marL,
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
  );
};
