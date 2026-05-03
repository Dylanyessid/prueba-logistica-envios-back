import { DataSource } from "typeorm";

import { envs } from "./envs.js";
import { User } from "../models/user.js";
import { Client } from "../models/client.js";
import { Product } from "../models/product.js";
import { Warehouse } from "../models/warehouse.js";
import { Port } from "../models/ports.js";
import { LandShipment } from "../models/landShipment.js";
import { SeaShipment } from "../models/seaShipment.js";


export const AppDataSource = new DataSource({
    type: "postgres",
    host:envs.DB_HOST,
    port: envs.DB_PORT,
    username: envs.DB_USERNAME,
    password: envs.DB_PASSWORD,
    database: envs.DB_NAME,
    //logging: true,
    ssl:{
        rejectUnauthorized: false
    },
    entities: [User, Client, Product, Warehouse, Port, LandShipment, SeaShipment],
});