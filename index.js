import dotenv from 'dotenv'
dotenv.config()

import express from "express";
import jwt from 'jsonwebtoken'


import mongoose from "mongoose";

mongoose.connect(`mongodb+srv://admin:${process.env.DB_PASS}@cluster0.bffceli.mongodb.net/collection?retryWrites=true&w=majority`)
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello world!")
});

app.post('/auth/login', (req, res) => {
    console.log(req.body)

    const token = jwt.sign({
        email: req.body.email,
        fullName: "lol"
    },
        'ilovenika',
    );

    res.json({
        succes: true,
        token
    })
})

app.listen(3001, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server ok')
});