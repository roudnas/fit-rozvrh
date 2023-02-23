import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from 'firebase/firestore/lite';

type LessonInfo = {
  title: string;
  type: 'tut' | 'lab' | 'lec';
  room: string;
  note: string | undefined;
  startTime: string;
  endTime: string;
};

export type TimetableRecord = {
  day: number;
  order: number;
} & LessonInfo;

export type Timetable = [
  TimetableRecord[],
  TimetableRecord[],
  TimetableRecord[],
  TimetableRecord[],
  TimetableRecord[],
];

export type PersonInfo = {
  id: string;
  name: string;
}

export type PersonData = {
  timetable: Timetable;
} & PersonInfo;

export const getAllPeopleData = async (db: Firestore) => {
  const peopleCollection = collection(db, 'users');
  const peopleDocs = await getDocs(peopleCollection);
  const people: PersonData[] = [];

  await Promise.all(
    peopleDocs.docs.map(async (per) => {
      const personId = per.id;
      const personData = per.data();
      const personTimetable: Timetable = [[], [], [], [], []];

      const queryPersonLessons = query(
        collection(db, 'classes'),
        where('user', '==', personId),
      );
      const personLessons = await getDocs(queryPersonLessons);

      personLessons.docs
        .map((lessonDocument) => lessonDocument.data() as TimetableRecord)
        .forEach((lesson) => {
          personTimetable[lesson.day][lesson.order] = lesson;
        });

      people.push({
        id: personId,
        name: personData.name,
        timetable: personTimetable,
      });
    }),
  );

  return people;
};
