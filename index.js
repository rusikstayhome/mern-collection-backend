import dotenv from 'dotenv'
dotenv.config()

import express from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from "mongoose";

import { registerValidation } from './validations.js'
import { validationResult } from 'express-validator';

import UserModel from './models/User.js';
import RoleModel from './models/Role.js';


mongoose.connect(`mongodb+srv://admin:${process.env.DB_PASS}@cluster0.bffceli.mongodb.net/collection?retryWrites=true&w=majority`)
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).jsin(errors.array())
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const userRole = await RoleModel.findOne({ value: 'user' })

        const doc = new UserModel({
            email: req.body.email,
            username: req.body.username,
            passwordHash: hash,
            roles: [userRole.value]
        })

        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id,
            roles: user.roles.map(role => role)
        },
            'ilovenika',
            {
                expiresIn: '30d'
            })

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to register'
        })
    }
})
app.post('/auth/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({ username: req.body.username })

        if (!user) {
            return res.status(404).json({
                message: 'Wrong login or password'
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(404).json({
                message: 'Wrong login or password'
            })
        }

        const token = jwt.sign({
            _id: user._id,
            roles: user.roles.map(role => role)
        },
            'ilovenika',
            {
                expiresIn: '30d'
            })

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to login'
        })
    }
})

app.listen(3001, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server ok')
});