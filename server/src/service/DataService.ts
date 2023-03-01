import {Repository} from "typeorm";
import {User} from "../entity/User";
import {AppDataSource} from "../app-data-source";
import {Timetable} from "../entity/Timetable";
import {Lesson} from "../entity/Lesson";

const insertUser = async (name: string) => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const userObj: User = new User();
    userObj.name = name;
    let maps = await userRepo.insert(userObj);
    const lastInsertId: number = maps.generatedMaps[0].id;

    const insertedUser = await userRepo.findOneBy({
        id: lastInsertId
    })

    if (!insertedUser) {
        throw new Error("Failed inserting a user.");
    }

    return insertedUser;
}

const insertTimetable = async (user: User) => {
    const timetableRepo: Repository<Timetable> = AppDataSource.getRepository(Timetable);
    const timetableObj = new Timetable();
    timetableObj.user = user;

    const maps = await timetableRepo.insert(timetableObj);
    const timetableFoundObj = await timetableRepo.findOneBy({
        id: maps.generatedMaps[0].id
    });

    if (!timetableFoundObj) {
        throw new Error("Failed inserting a timetable.");
    }

    return timetableFoundObj;
}

const insertLessons = async (timetableData: Array<Array<Lesson>>, timetable: Timetable) => {
    const lessonRepo: Repository<Lesson> = AppDataSource.getRepository(Lesson);

    timetableData.forEach((d: Array<Lesson>, i: number) => {
        d.forEach(async (c: Lesson, j: number) => {
            c.timetable = timetable;
            c.day = i;
            c.order = j;
            await lessonRepo.save(c);
        });
    });
}

export const handleDataUpload = async (user: string, timetable: Array<Array<Lesson>>) => {
    const insertedUser = await insertUser(user);
    const insertedTimetable = await insertTimetable(insertedUser);

    await insertLessons(timetable, insertedTimetable);
}