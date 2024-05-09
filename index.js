const mongoose = require('mongoose');
const express = require('express');

const app = express();

const dbUrl = 'mongodb://localhost:27017/test';

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

const Note = require("./models/note");

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        console.log('Connected to database')
        const PORT = 4000;
        app.listen(PORT, () => {
            console.log('Server listen on PORT', PORT);
        });
    })
    .catch(err => console.log(err.message));

app.get('/', async (req, res) => {
    const notes = await Note.find({});
    res.locals.notes = notes;
    res.render('index');
});

app.get('/add', (req, res) => {
    res.render('addNote');
});

app.post('/add', async (req, res) => {
    if (!req.body.note) res.redirect('/');
    const note = new Note({
        note: req.body.note
    });
    await note.save();
    res.redirect('/');
});


