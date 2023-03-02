import {
  PersonData,
  PersonInfo,
  TimetableRecord,
} from '../services/DataService';

const isInvalidNote = (note: string|undefined) => {
  return !note || note === "" || (note !== "odd" && note !== "even");
}

/**
 * LessonInteractions["dayNumber-BI-PA2-lec-T9:350-..."] = array of people who share this lesson.
 * Hashmap go brrr... Jebu nějaký fancy, top speed, A* lookup překryvů.
 */
export type LessonIntersections = {
  [key: string]: PersonInfo[];
};

/**
 * Get an identification key for a given lesson.
 */
export const getLessonKey = (lesson: TimetableRecord) => {
  const key = `${lesson.day}-${lesson.title}-${lesson.type}-${lesson.room}-${lesson.startTime}-${lesson.endTime}`;

  if (isInvalidNote(lesson.note)) {
    return key;
  }

  return `${key}-${lesson.note}`;
};

/**
 * Since we've only got a few people, we can afford to "precalculate" all the
 * intersections once.
 * @param people
 */
export const getLessonIntersectionsMap = (
  people: PersonData[],
): LessonIntersections => {
  const intersections: LessonIntersections = {};

  for (const person of people) {
    for (const day of person.timetable) {
      for (const lesson of day) {
        const key = getLessonKey(lesson);
        if (!intersections[key]) {
          intersections[key] = [];
        }

        intersections[key].push({
          id: person.id,
          name: person.name,
        });
      }
    }
  }

  return intersections;
};
