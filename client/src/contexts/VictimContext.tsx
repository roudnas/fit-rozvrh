import { createContext, useEffect, useState } from 'react';

import { ContextualizedLesson } from '../components/Lessons';
import {
    fetchTimetables,
    PersonData,
    Timetable,
} from '../services/DataService';
import {
    getLessonIntersectionsMap,
    getLessonKey,
    LessonIntersections,
} from '../utils/intersections';

interface VictimContextType {
  people: PersonData[];
  activeVictim: PersonData | null;
  setVictimId: (newVictimId: string | null) => void;
  activeTimetable: ContextualizedLesson[][];
  favoriteId: string | null;
  setFavoriteId: (newFavoriteId: string | null) => void;
  isLoading: boolean;
}

type Props = {
  children: React.ReactNode;
};

const EMPTY_TIMETABLE: Timetable = [[], [], [], [], []];
const FAVORITE_ID_KEY = 'favoriteID';

const getContextualizedLessons = (
    timetable: Timetable,
    intersectionsMap: LessonIntersections,
    activeVictimId?: string,
) =>
    timetable.map((dayLessons) => {
        let prevEnd = undefined;
        const contextualizedDayLessons: ContextualizedLesson[] = [...dayLessons];
        for (const lesson of contextualizedDayLessons) {
            lesson.prevEndTime = prevEnd;
            prevEnd = lesson.endTime;
            // filter out the current victim itself
            lesson.intersections = intersectionsMap[getLessonKey(lesson)].filter(
                (person) => person.id !== activeVictimId,
            );
        }

        return contextualizedDayLessons;
    });

export const VictimContext = createContext<VictimContextType | undefined>(
    undefined,
);

export const VictimProvider = ({ children }: Props) => {
    const [people, setPeople] = useState<PersonData[]>([]);
    const [activeVictim, setActiveVictim] = useState<PersonData | null>(null);
    const [intersectionsMap, setIntersectionsMap] = useState<LessonIntersections>(
        {},
    );
    const [favoriteId, setFavoriteId] = useState(
        localStorage.getItem(FAVORITE_ID_KEY),
    );
    const [activeTimetable, setActiveTimetable] =
    useState<ContextualizedLesson[][]>(EMPTY_TIMETABLE);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchTimetables().then((foundPeople) => {
            const map = getLessonIntersectionsMap(foundPeople);
            setIntersectionsMap(map);
            setPeople(foundPeople);
            setIsLoading(false);

            const favoriteVictim =
        foundPeople.find((person) => person.id === favoriteId) ?? null;
            if (favoriteVictim) {
                setActiveVictim(favoriteVictim);
                setActiveTimetable(
                    getContextualizedLessons(
                        favoriteVictim.timetable,
                        map,
                        favoriteVictim.id,
                    ),
                );
            }
        });
    }, []);

    /**
   * Sets the active victim and updates the active timetable.
   */
    const handleVictimChange = (newVictimId: string | null) => {
        const newVictim =
      people.find((person) => person.id === newVictimId) ?? null;

        setActiveVictim(newVictim);

        // TODO: does this need to be constructed every time? Wouldn't it be better
        // to run getContextualizedLessons once for each person in getPeople?
        setActiveTimetable(
            newVictim
                ? getContextualizedLessons(
                    newVictim.timetable,
                    intersectionsMap,
                    newVictim.id,
                )
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
        <VictimContext.Provider
            value={{
                people,
                activeVictim,
                setVictimId: handleVictimChange,
                activeTimetable,
                favoriteId,
                setFavoriteId: handleFavoriteChange,
                isLoading,
            }}
        >
            {children}
        </VictimContext.Provider>
    );
};
