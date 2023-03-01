import {Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany, Relation} from "typeorm"
import {User} from "./User";
import {Lesson} from "./Lesson";

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
    lessons: Relation<Lesson>[]
}