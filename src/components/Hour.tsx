import { useContext } from 'react';

import { HourWidthContext } from './TimetableWrapper';

type Props = {
  hour: number;
};

export const Hour = ({ hour }: Props) => {
  const hourWidthPx = useContext(HourWidthContext);

  return (
    <div
      className="hour text-bold d-flex py-1 align-items-end"
      style={{ width: `${hourWidthPx}px` }}
    >
      {hour}:00
    </div>
  );
};
