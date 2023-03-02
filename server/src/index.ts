import express, {Express} from 'express';
import dotenv from 'dotenv';
import {AppDataSource} from "./app-data-source";
import ErrnoException = NodeJS.ErrnoException;
import cors from "cors";
import DataRouter from "./controller/DataController";
import morgan from "morgan";
import "reflect-metadata";
import https, {Server} from "https";
import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

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
app.listen(() => {
    console.log("App listening.")
})

