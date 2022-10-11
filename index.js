import dotenv from 'dotenv'
dotenv.config()

import express from "express";
import mongoose from "mongoose";

import { registerValidation, collectionCreateValidation, loginValidation } from './validations.js'

import checkAuth from './middlewares/checkAuth.js'
import checkRole from './middlewares/checkRole.js'

import * as UserController from './controllers/UserController.js'
import * as CollectionController from './controllers/CollectionController.js';


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, UserController.register)
app.post('/auth/login', loginValidation, UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe)
app.get('/users', checkRole, UserController.getAll)
app.patch('/users/:id', checkRole, UserController.update)

app.post('/collections', collectionCreateValidation, checkAuth, CollectionController.create)
app.get('/collections', CollectionController.getAll)
app.get('/collections/:id', CollectionController.getOne)
app.delete('/collections/:id', checkAuth, CollectionController.remove)
app.patch('/collections/:id', collectionCreateValidation, checkAuth, CollectionController.update)

app.post('/collections/:id/items', checkAuth, CollectionController.addItem)
app.get('/collections/:id/items', CollectionController.getAllItems)
app.get('/collections/:id/items/:item', CollectionController.getOneItem)
app.delete('/collections/:id/items/:item', checkAuth, CollectionController.removeItem)
app.patch('/collections/:id/items/:item', checkAuth, CollectionController.updateItem)

app.listen(process.env.PORT || 3001, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server ok')
});