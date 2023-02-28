import { createContext, useEffect, useState } from 'react';
import { getAllPeopleData, PersonData, Timetable } from '../utils/dbQueries';
import { Firestore } from 'firebase/firestore/lite';
import { getLessonIntersectionsMap, LessonIntersections } from '../utils/intersections';

interface VictimContextType {
  victim: PersonData | null;
  people: PersonData[];
  setVictimId: (newVictimId: string | null) => void;
  activeTimetable: Timetable;
  intersectionsMap: LessonIntersections;
  favoriteId: string | null;
  setFavoriteId: (newFavoriteId: string | null) => void;
  isLoading: boolean;
}

type Props = {
  children: React.ReactNode;
  peopleDB: Firestore;
}

const EMPTY_TIMETABLE: Timetable = [[], [], [], [], []];

export const VictimContext = createContext<VictimContextType | undefined>(undefined);

export const VictimProvider = ({ children, peopleDB }: Props) => {
  const [people, setPeople] = useState<PersonData[]>([]);
  const [victim, setVictim] = useState<PersonData | null>(null);
  const [intersectionsMap, setIntersectionsMap] = useState<LessonIntersections>({});
  const [favoriteId, setFavoriteId] = useState(
    localStorage.getItem('favoriteID'),
  );
  const [activeTimetable, setActiveTimetable] = useState<Timetable>(EMPTY_TIMETABLE);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    getAllPeopleData(peopleDB).then((foundPeople) => {
      const favoriteVictim = foundPeople.find((person) => person.id === favoriteId) ?? null;
      if (favoriteVictim) {
        setVictim(favoriteVictim);
        setActiveTimetable(favoriteVictim.timetable ?? EMPTY_TIMETABLE);
      }

      setIntersectionsMap(getLessonIntersectionsMap(foundPeople));
      setPeople(foundPeople);
      setIsLoading(false);
    });
  }, [])


  useEffect(() => {
    if (favoriteId) localStorage.setItem('favoriteID', favoriteId);
  }, [favoriteId]);


  const handleVictimChange = (newVictimId: string | null) => {
    const newVictim = people.find((person) => person.id === newVictimId) ?? null;

    setVictim(newVictim);

    if (newVictim) {
      setActiveTimetable(newVictim.timetable ?? EMPTY_TIMETABLE);
    }
  }

  return (
    <VictimContext.Provider value={{
      victim,
      people,
      setVictimId: handleVictimChange,
      activeTimetable,
      intersectionsMap,
      favoriteId,
      setFavoriteId,
      isLoading
    }}>
      {children}
    </VictimContext.Provider>
  );
};