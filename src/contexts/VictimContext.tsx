import { createContext, useEffect, useState } from 'react';
import { getAllPeopleData, PersonData, Timetable } from '../utils/dbQueries';
import { Firestore } from 'firebase/firestore/lite';
import { getLessonIntersectionsMap, getLessonKey, LessonIntersections } from '../utils/intersections';
import { ContextualizedLesson } from '../components/Lessons';

interface VictimContextType
{
  people: PersonData[];
  activeVictim: PersonData | null;
  setVictimId: (newVictimId: string | null) => void;
  activeTimetable: ContextualizedLesson[][];
  favoriteId: string | null;
  setFavoriteId: (newFavoriteId: string | null) => void;
  isLoading: boolean;
  error: string | null;
}

type Props = {
  children: React.ReactNode;
  peopleDB: Firestore;
}

const EMPTY_TIMETABLE: Timetable = [[], [], [], [], []];
const FAVORITE_ID_KEY = 'favoriteID';

const getContextualizedLessons = (timetable: Timetable, intersectionsMap: LessonIntersections) =>
  timetable.map((dayLessons) => {
    let prevEnd = undefined;
    const contextualizedDayLessons: ContextualizedLesson[] = [...dayLessons];
    for (const lesson of contextualizedDayLessons)
    {
      lesson.prevEndTime = prevEnd;
      prevEnd = lesson.endTime;
      lesson.intersections = intersectionsMap[getLessonKey(lesson)];
    }

    return contextualizedDayLessons;
  });

export const VictimContext = createContext<VictimContextType | undefined>(undefined);

export const VictimProvider = ({ children, peopleDB }: Props) => {
  const [people, setPeople] = useState<PersonData[]>([]);
  const [activeVictim, setActiveVictim] = useState<PersonData | null>(null);
  const [intersectionsMap, setIntersectionsMap] = useState<LessonIntersections>({});
  const [favoriteId, setFavoriteId] = useState(
    localStorage.getItem(FAVORITE_ID_KEY),
  );
  const [activeTimetable, setActiveTimetable] =
    useState<ContextualizedLesson[][]>(EMPTY_TIMETABLE);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllPeopleData(peopleDB)
      .then((foundPeople) => {
        const map = getLessonIntersectionsMap(foundPeople);
        setIntersectionsMap(map);
        setPeople(foundPeople);
        setIsLoading(false);

        const favoriteVictim = foundPeople.find((person) => person.id === favoriteId) ?? null;
        if (favoriteVictim)
        {
          setActiveVictim(favoriteVictim);
          setActiveTimetable(getContextualizedLessons(favoriteVictim.timetable, map));
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  /**
   * Sets the active victim and updates the active timetable.
   */
  const handleVictimChange = (newVictimId: string | null) => {
    const newVictim = people.find((person) => person.id === newVictimId) ?? null;

    setActiveVictim(newVictim);

    // TODO: does this need to be constructed every time? Wouldn't it be better
    // to run getContextualizedLessons once for each person in getAllPeopleData?
    setActiveTimetable(newVictim ?
      getContextualizedLessons(newVictim.timetable, intersectionsMap)
      : EMPTY_TIMETABLE,
    );
  };

  /**
   * Sets the favorite victim ID in local storage.
   */
  const handleFavoriteChange = (newFavoriteId: string | null) => {
    setFavoriteId(newFavoriteId);
    localStorage.setItem(FAVORITE_ID_KEY, newFavoriteId ?? '');
  };


  return (
    <VictimContext.Provider value={{
      people,
      activeVictim,
      setVictimId: handleVictimChange,
      activeTimetable,
      favoriteId,
      setFavoriteId: handleFavoriteChange,
      isLoading,
      error,
    }}>
      {children}
    </VictimContext.Provider>
  );
};