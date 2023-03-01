const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../public/assets/js/fsUtils');

notes.get('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;
    if (req.body) {
        const newNoteAdded = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(newNoteAdded, './db/db.json');
        res.json(`Note added successfuly`);
    } else {
        res.errored(`Error - note failed to be added`)
    }
});

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const results = json.filter((note) => note.id !== noteId);
        writeToFile('./db/db.json', results);
        res.json(`Note: ${noteId} has been deleted`);
    });
});

module.exports = notes;