import Badge from 'react-bootstrap/Badge';

import { SEMESTER_START_DATE } from '../App';
import {getEvenOddWeek, getSemesterWeekNo} from "../utils/date";
import { ThemeDropdown } from './ThemeDropdown';
import { VictimBadge } from './VictimBadge';
import { VictimDropdown } from './VictimDropdown';
import useVictim from '../hooks/useVictim';

export const Header = () => {
  const { setVictimId, favoriteId } = useVictim();
  const currentWeekSemesterNo = getSemesterWeekNo(SEMESTER_START_DATE);
  const currentWeekEvenOrOdd = getEvenOddWeek();

  return (
    <article className="d-flex px-4 py-2 bg-second text-dark rounded nav-main align-items-center justify-content-between">
      <section className="d-flex flex-row align-items-center">
        <img
          className={`me-2 ${favoriteId !== null ? 'pointer' : ''}`}
          onClick={() => {
            favoriteId && setVictimId(favoriteId);
          }}
          src="/logo.png"
          width="125"
        />
        <Badge bg="black">
          {currentWeekEvenOrOdd} week (no. {currentWeekSemesterNo})
        </Badge>
      </section>
      <section className="d-flex flex-row align-items-center gap-2">
        <VictimBadge />
        <VictimDropdown />
        <ThemeDropdown />
      </section>
    </article>
  );
};
