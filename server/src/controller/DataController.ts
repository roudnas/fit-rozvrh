import express, {Request, Response, Router} from 'express';
import {handleDataUpload} from "../service/DataService";
import {AppDataSource} from "../app-data-source";
import {User} from "../entity/User";
import {Repository} from "typeorm";
import {Timetable} from "../entity/Timetable";

const router: Router = express.Router();

router.post("/upload", async (req: Request, res: Response) => {
    const {user, timetable} = req.body;

    if (!user || !timetable) {
        res.status(400);
        return res.json({
            status: "error",
            message: "Bad request."
        });
    }

    try {
        await handleDataUpload(user, timetable);
    } catch (error) {
        res.status(500);
        return res.json({
            status: "error",
            message: error
        });
    }

    return res.json({
        status: "success",
        message: "Successfully added timetable data"
    });
});

router.get("/", async (req: Request, res: Response) => {
   const timetableRepository: Repository<Timetable> = AppDataSource.getRepository(Timetable);

   const users = await timetableRepository.find({
       select: {
         id: false
       },
       relations: {
           user: true,
           lessons: true
       }
   });

   return res.json(
      users
   );
});

export default router;