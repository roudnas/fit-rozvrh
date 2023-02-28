import { useContext } from 'react';

import { HourWidthContext } from './TimetableWrapper';

type Props = {
  hour: number;
};

const FONT_SIZE = 15;
export const TIME_OFFSET_PX = FONT_SIZE * 1.25;

export const Hour = ({ hour }: Props) => {
  const hourWidthPx = useContext(HourWidthContext);

  return (
    <div
      className="hour text-bold d-flex py-1 align-items-end"
      style={{ width: `${hourWidthPx}px`, fontSize: `${FONT_SIZE}px` }}
    >
      {hour}:00
    </div>
  );
};
