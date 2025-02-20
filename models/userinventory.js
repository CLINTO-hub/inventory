import "reflect-metadata";
import { EntitySchema } from "typeorm";
import { Inventory } from "./inventory.js";

export const User = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
            length: 255,
        },
        password: {
            type: "varchar",
            length: 255,
        },
        created_at: {
            type: "timestamp",
            createDate: true,
        },
        updated_at: {
            type: "timestamp",
            updateDate: true,
        },
    },
    relations: {
        inventory: {
            type: "one-to-many",
            target: "Inventory",
            inverseSide: "user",
        },
    },
});
