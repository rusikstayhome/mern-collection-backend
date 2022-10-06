import express from "express";

import mongoose from "mongoose";

mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.bffceli.mongodb.net/collection?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello world!")
})

app.listen(3001, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server ok')
});