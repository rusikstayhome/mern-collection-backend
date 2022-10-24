import dotenv from 'dotenv'
dotenv.config()

import express from "express";
import mongoose from "mongoose";
import cors from 'cors'

import multer from 'multer'
import { storage } from './storage/storage.js';


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
app.use(cors())


const upload = multer({ storage: storage })

app.post("/upload", upload.single("image"), async (req, res) => {
    return res.json({ image: req.file.path });
});


app.post('/auth/register', registerValidation, UserController.register)
app.post('/auth/login', loginValidation, UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe)
app.get('/users', checkRole, UserController.getAll)
app.get('/users/:id', UserController.getOne)
app.patch('/users/:id', checkRole, UserController.update)

app.post('/collections', collectionCreateValidation, checkAuth, CollectionController.create)
app.get('/tags', CollectionController.getLastTags)
app.get('/items', CollectionController.getLastItems)
app.get('/collections', CollectionController.getAll)
app.get('/collections/:id', CollectionController.getOne)
app.delete('/collections/:id', checkAuth, CollectionController.remove)
app.patch('/collections/:id', collectionCreateValidation, checkAuth, CollectionController.update)

app.post('/collections/:id/items', checkAuth, CollectionController.addItem)
app.get('/collections/:id/items', CollectionController.getAllItemsInCollection)
app.get('/collections/:id/items/:item', CollectionController.getOneItem)
app.patch('/collections/:id/items/:item', checkAuth, CollectionController.updateItem)
app.delete('/items/:item', checkAuth, CollectionController.removeItem)

app.listen(process.env.PORT || 3001, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server ok')
});