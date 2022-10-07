import dotenv from 'dotenv'
dotenv.config()

import express from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from "mongoose";

import { registerValidation } from './validations.js'


import UserModel from './models/User.js';
import RoleModel from './models/Role.js';

import checkAuth from './middleWare/checkAuth.js'
import checkRole from './middleWare/checkRole.js'

import * as UserController from './controllers/UserController.js'


mongoose.connect(`mongodb+srv://admin:${process.env.DB_PASS}@cluster0.bffceli.mongodb.net/collection?retryWrites=true&w=majority`)
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, UserController.register)
app.post('/auth/login', UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe)
app.get('/users', checkRole, UserController.getAll)

app.listen(3001, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server ok')
});