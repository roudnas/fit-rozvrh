import dotenv from 'dotenv';
import express, {type Express} from 'express';

import {AppDataSource} from "./app-data-source";
import ErrnoException = NodeJS.ErrnoException;
import "reflect-metadata";

import cors from "cors";
import morgan from "morgan";

import DataRouter from "./controller/DataController";

dotenv.config();

const app: Express = express();
const port: string | undefined = process.env.PORT;

await AppDataSource
  .initialize()
  .catch((err: ErrnoException) => {
    console.error("Error during DS init: ", err);
  })

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/data", DataRouter);
app.listen(port,() => {
  console.log(`App listening, p=${port ?? 0}`)
})

