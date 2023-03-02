const API_BASE = import.meta.env.VITE_API_BASE;

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

export type RemoteUserData = {
  id: number;

  name: string;
};

export type RemotePersonData = {
    id: number;

    user: RemoteUserData;

    lessons: TimetableRecord[];
};

export const fetchTimetables = async () => {
    const people: PersonData[] = [];
    const response = await fetch(`${API_BASE}/data`);
    const data = await response.json();

    data.forEach((p: RemotePersonData) => {
        const personTimetable: Timetable = [[], [], [], [], []];

        p.lessons.map((lesson: TimetableRecord) => {
            personTimetable[lesson.day][lesson.order] = lesson;
        })

        people.push({
            id: p.user.id.toString(),
            name: p.user.name,
            timetable: personTimetable
        })
    })

    return people;
}