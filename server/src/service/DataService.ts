import {type Repository} from "typeorm";

import {AppDataSource} from "../app-data-source";
import {Lesson} from "../entity/Lesson";
import {Timetable} from "../entity/Timetable";
import {User} from "../entity/User";

const insertUser = async (name: string): Promise<User> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const userObj: User = new User();
  userObj.name = name;
  const maps = await userRepo.insert(userObj);
  const lastInsertId: number = maps.generatedMaps[0].id;

  const insertedUser = await userRepo.findOneBy({
    id: lastInsertId
  })

  if (insertedUser == null) {
    throw new Error("Failed inserting a user.");
  }

  return insertedUser;
}

const insertTimetable = async (user: User): Promise<Timetable> => {
  const timetableRepo: Repository<Timetable> = AppDataSource.getRepository(Timetable);
  const timetableObj = new Timetable();
  timetableObj.user = user;

  const maps = await timetableRepo.insert(timetableObj);
  const timetableFoundObj = await timetableRepo.findOneBy({
    id: maps.generatedMaps[0].id
  });

  if (timetableFoundObj == null) {
    throw new Error("Failed inserting a timetable.");
  }

  return timetableFoundObj;
}

const insertLessons = async (timetableData: Lesson[][], timetable: Timetable): Promise<void> => {
  const lessonRepo: Repository<Lesson> = AppDataSource.getRepository(Lesson);

  for (const d of timetableData) {
    const i: number = timetableData.indexOf(d);

    for (let j = 0; j < d.length; ++j) {
      const c:Lesson = d[i];

      c.timetable = timetable;
      c.day = i;
      c.order = j;

      await lessonRepo.save(c);
    }
  }
}

export const handleDataUpload = async (user: string, timetable: Lesson[][]): Promise<void> => {
  const insertedUser = await insertUser(user);
  const insertedTimetable = await insertTimetable(insertedUser);

  await insertLessons(timetable, insertedTimetable);
}