import express, {type Request, type Response, type Router} from 'express';
import {type Repository} from "typeorm";

import {AppDataSource} from "../app-data-source";
import {Timetable} from "../entity/Timetable";
import {handleDataUpload} from "../service/DataService";

const router: Router = express.Router();

router.post("/upload", (req: Request, res: Response): Response => {
  const {user, timetable} = req.body;

  if (typeof user === "undefined" || typeof timetable === "undefined") {
    res.status(400);

    return res.json({
      status: "error",
      message: "Bad request."
    });
  }

  handleDataUpload(user, timetable).catch((e) => {
    res.status(500);
    return res.json({
      status: "error",
      message: e
    });
  })

  return res.json({
    status: "success",
    message: "Successfully added timetable data"
  });
});

router.get("/", (req: Request, res: Response) => {
  const timetableRepository: Repository<Timetable> = AppDataSource.getRepository(Timetable);

  void (async () => {
    const users = await timetableRepository.find({
      select: {
        id: false
      },
      relations: {
        user: true,
        lessons: true
      },
      order: {
        user: {
          name: "ASC"
        }
      }
    })

    return res.json(
      users
    );
  })()
});

export default router;