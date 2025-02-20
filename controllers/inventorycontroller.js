import { AppDataSource } from "../database/connection.js";
import { Inventory } from '../models/inventory.js'


export const addInventory = async (req, res) => {
    try {
        const { name, description, quantity, price } = req.body;

        if (!name || !quantity || !price ||!description) {
            return res.status(400).json({ message: "Name, quantity, description and price are required" });
        }

        const inventoryRepo = AppDataSource.getRepository(Inventory);

        const newInventory = inventoryRepo.create({
            name,
            description,
            quantity,
            price,
        });

        await inventoryRepo.save(newInventory);

        res.status(201).json({ message: "Inventory added successfully", inventory: newInventory });
    } catch (error) {
        console.error("Error adding inventory:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const addBulkInventory = async (req, res) => {
    try {
        const items = req.body.items; 
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Invalid input, expecting an array of items" });
        }

        const inventoryRepo = AppDataSource.getRepository(Inventory);
        const newItems = inventoryRepo.create(items);
        await inventoryRepo.save(newItems);

        return res.status(201).json({ message: "Bulk inventory added", data: newItems });
    } catch (error) {
        console.error("Error adding bulk inventory:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const listInventory = async (req, res) => {
    try {
        const { name, minPrice, maxPrice, minQuantity, maxQuantity } = req.query;
        const inventoryRepo = AppDataSource.getRepository(Inventory);

        let query = inventoryRepo.createQueryBuilder("inventory");

        if (name) query = query.andWhere("inventory.name ILIKE :name", { name: `%${name}%` });
        if (minPrice) query = query.andWhere("inventory.price >= :minPrice", { minPrice });
        if (maxPrice) query = query.andWhere("inventory.price <= :maxPrice", { maxPrice });
        if (minQuantity) query = query.andWhere("inventory.quantity >= :minQuantity", { minQuantity });
        if (maxQuantity) query = query.andWhere("inventory.quantity <= :maxQuantity", { maxQuantity });

        const inventoryList = await query.getMany();
        return res.status(200).json({ message: "Inventory list retrieved", data: inventoryList });
    } catch (error) {
        console.error("Error listing inventory:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, quantity, price } = req.body;
        const inventoryRepo = AppDataSource.getRepository(Inventory);

        let item = await inventoryRepo.findOne({ where: { id } });
        if (!item) return res.status(404).json({ message: "Inventory item not found" });

        item.name = name ?? item.name;
        item.description = description ?? item.description;
        item.quantity = quantity ?? item.quantity;
        item.price = price ?? item.price;

        await inventoryRepo.save(item);
        return res.status(200).json({ message: "Inventory updated successfully", data: item });
    } catch (error) {
        console.error("Error updating inventory:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const stockCheckIn = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        if (!quantity || quantity <= 0) {
            return res.status(400).json({ message: "Invalid quantity" });
        }

        const inventoryRepo = AppDataSource.getRepository(Inventory);
        let item = await inventoryRepo.findOne({ where: { id } });
        if (!item) return res.status(404).json({ message: "Inventory item not found" });

        item.quantity += quantity;
        await inventoryRepo.save(item);

        return res.status(200).json({ message: "Stock checked in", data: item });
    } catch (error) {
        console.error("Error in stock check-in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const stockCheckOut = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        if (!quantity || quantity <= 0) {
            return res.status(400).json({ message: "Invalid quantity" });
        }

        const inventoryRepo = AppDataSource.getRepository(Inventory);
        let item = await inventoryRepo.findOne({ where: { id } });
        if (!item) return res.status(404).json({ message: "Inventory item not found" });

        if (item.quantity < quantity) {
            return res.status(400).json({ message: "Insufficient stock" });
        }

        item.quantity -= quantity;
        await inventoryRepo.save(item);

        return res.status(200).json({ message: "Stock checked out", data: item });
    } catch (error) {
        console.error("Error in stock check-out:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const generateReports = async (req, res) => {
    try {
        const { name, minPrice, maxPrice, minQuantity, maxQuantity, status, startDate, endDate, sortBy, sortOrder } = req.query;

        const inventoryRepo = AppDataSource.getRepository(Inventory);
        let query = inventoryRepo.createQueryBuilder("inventory");

        
        if (name) query = query.andWhere("inventory.name ILIKE :name", { name: `%${name}%` });

       
        if (minPrice) query = query.andWhere("inventory.price >= :minPrice", { minPrice });
        if (maxPrice) query = query.andWhere("inventory.price <= :maxPrice", { maxPrice });

       
        if (minQuantity) query = query.andWhere("inventory.quantity >= :minQuantity", { minQuantity });
        if (maxQuantity) query = query.andWhere("inventory.quantity <= :maxQuantity", { maxQuantity });

        
        if (status === "in-stock") {
            query = query.andWhere("inventory.quantity > 0");
        } else if (status === "out-of-stock") {
            query = query.andWhere("inventory.quantity = 0");
        }

        
        if (startDate) query = query.andWhere("inventory.created_at >= :startDate", { startDate });
        if (endDate) query = query.andWhere("inventory.created_at <= :endDate", { endDate });

       
        const validSortFields = ["name", "price", "quantity", "created_at"];
        const sortField = validSortFields.includes(sortBy) ? sortBy : "created_at";
        const order = sortOrder === "ASC" ? "ASC" : "DESC"; // Default: DESC

        query = query.orderBy(`inventory.${sortField}`, order);

        
        const reportData = await query.getMany();
        return res.status(200).json({ message: "Report generated", data: reportData });
    } catch (error) {
        console.error("Error generating report:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
