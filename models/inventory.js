import "reflect-metadata";
import { EntitySchema } from "typeorm";

export const Inventory = new EntitySchema({
    name: "Inventory",
    tableName: "inventory",
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
        description: {
            type: "text",
            nullable: true,
        },
        quantity: {
            type: "int",
            default: 0,
        },
        price: {
            type: "numeric",
            precision: 10,
            scale: 2,
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
});
