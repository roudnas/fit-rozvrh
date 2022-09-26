import { parse } from "date-fns"

const timeFormat = 'HH:mm'

export function intervalFromLesson(lesson) {
    return { start: parse(lesson.startTime, timeFormat, 0), end: parse(lesson.endTime, timeFormat, 0) }
}