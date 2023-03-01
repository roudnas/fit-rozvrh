import { differenceInCalendarWeeks, getWeek } from 'date-fns';
import Badge from 'react-bootstrap/Badge';

import { SEMESTER_START_DATE } from '../App';
import { PersonData } from '../utils/DBUtil';
import { ThemeDropdown } from './ThemeDropdown';
import { VictimBadge } from './VictimBadge';
import { VictimDropdown } from './VictimDropdown';

type Props = {
  victimId: string | null;
  setVictimId: (newVictimId: string | null) => void;
  favoriteId: string | null;
  setFavoriteId: (newFavorite: string | null) => void;
  people: PersonData[];
};

export const Header = ({
  victimId,
  setVictimId,
  favoriteId,
  setFavoriteId,
  people,
}: Props) => {
  const currentWeekSemesterNo =
    differenceInCalendarWeeks(new Date(), SEMESTER_START_DATE, {
      weekStartsOn: 1,
    }) + 1;
  const currentWeekEvenOrOdd =
    getWeek(new Date(), { weekStartsOn: 1 }) % 2 === 0 ? 'even' : 'odd';

  const victim =
    (victimId && people.find((person) => person.id === victimId)) || null;

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
        <VictimBadge
          victim={victim}
          favoriteId={favoriteId}
          setFavoriteId={setFavoriteId}
        />
        <VictimDropdown people={people} setVictimId={setVictimId} />
        <ThemeDropdown />
      </section>
    </article>
  );
};
