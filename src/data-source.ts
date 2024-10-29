import "reflect-metadata";
import { DataSouce} from "typeorm";
import { Product } from "./entities/Product";

export const AppDataSource = new DataSource({
    type: "sqlite", 
    database: "database.sqlite",
    synchronize: true, 
    logging: false,
    entities: [Product], 
    migrations: [],
    suscribers: [], 
});