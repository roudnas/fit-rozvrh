import './styles/App.css';

import type { Firestore } from 'firebase/firestore/lite';
import { useEffect, useState } from 'react';

import { Header } from './components/Header';
import { TimetableWrapper } from './components/TimetableWrapper';
import { getAllPeopleData, PersonData, Timetable } from './utils/dbQueries';
import { getLessonIntersectionsMap, LessonIntersections } from './utils/intersections';

export const APP_PADDING_X = 20;

export const TIMETABLE_START_HOUR = 7;
export const TIMETABLE_END_HOUR = 20;

export const TIMETABLE_PIN_START_HOUR = 7.1;
export const TIMETABLE_PIN_END_HOUR = 20.7;

// FIXME: Rework this to not be so fufu...
export const SEMESTER_START_DATE = Date.parse('2023-02-20');

type Props = {
  peopleDB: Firestore;
};

const EMPTY_TIMETABLE: Timetable = [[], [], [], [], []];

function App({ peopleDB }: Props) {
  const [people, setPeople] = useState<PersonData[]>([]);
  const [intersectionsMap, setIntersectionsMap] = useState<LessonIntersections>({});
  const [favoriteId, setFavoriteId] = useState(
    localStorage.getItem('favoriteID'),
  );
  const [victimId, setVictimId] = useState<string | null>(null);
  const [activeTimetable, setActiveTimetable] =
    useState<Timetable>(EMPTY_TIMETABLE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (favoriteId) localStorage.setItem('favoriteID', favoriteId);
  }, [favoriteId]);

  useEffect(() => {
    if (victimId) {
      setActiveTimetable(
        people.find((person) => person.id === victimId)?.timetable ??
          EMPTY_TIMETABLE,
      );
    }
  }, [victimId]);

  const loadData = async () => {
    const foundPeople = await getAllPeopleData(peopleDB);
    setIntersectionsMap(getLessonIntersectionsMap(foundPeople));
    setPeople(foundPeople);
    setVictimId(favoriteId);
    setIsLoading(false);
  };

  return (
    <div className="App bg-dark py-3 text-light text-center">
      <Header
        victimId={victimId}
        setVictimId={setVictimId}
        favoriteId={favoriteId}
        setFavoriteId={setFavoriteId}
        people={people}
      />

      <TimetableWrapper timetable={activeTimetable} isLoading={isLoading} intersectionsMap={intersectionsMap} />
    </div>
  );
}

export default App;
