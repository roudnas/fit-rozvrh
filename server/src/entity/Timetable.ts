import {Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, type Relation} from "typeorm"

import {Lesson} from "./Lesson";
import {User} from "./User";

@Entity()
export class Timetable {
    @PrimaryGeneratedColumn()
      id: number

    @OneToOne(() => User)
    @JoinColumn()
      user: User

    @OneToMany(() => Lesson, (lesson) => lesson.timetable, {
      cascade: true
    })
      lessons: Array<Relation<Lesson>>
}