import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation} from "typeorm"

import {Timetable} from "./Timetable";

type LessonType = "lec" | "tut" | "lab";

@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
      id: number

    @Column()
      title: string

    @Column()
      type: LessonType

    @Column()
      room: string

    @Column()
      note: string

    @Column()
      startTime: string

    @Column()
      endTime: string

    @Column()
      day: number

    @Column()
      order: number

    @ManyToOne(() => Timetable, (timetable) => timetable.lessons)
      timetable: Relation<Timetable>
}