import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/userinventory.js';
import { AppDataSource } from '../database/connection.js';

export const generateToken = (user) => {
    return jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const loginUser = async (req, res) => {
    try {
        const { name, password } = req.body;
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { name } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = await generateToken(user);
        res.status(201).json({ message: "LoggedIn", token: token });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const signupUser = async (req, res) => {
    try {
        const { name, password } = req.body;
        const userRepository = AppDataSource.getRepository(User);
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = userRepository.create({ name, password: hashedPassword });
        await userRepository.save(user);
        res.status(201).json({ message: "Successfully signed" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
