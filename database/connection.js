import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Inventory } from "../models/inventory.js";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_TfUb4PFWB9xm@ep-twilight-glitter-a5kz9qam-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
    ssl: {
        rejectUnauthorized: false, 
    },
    logging: false,
    synchronize: true,
    entities: [Inventory],
    migrations: [],
    subscribers: [],
});

export const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};
