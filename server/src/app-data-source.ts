import {DataSource} from "typeorm";
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [ "src/entity/*.ts"],
    migrations: ["src/migrations/*.sql"],
    synchronize: true
});