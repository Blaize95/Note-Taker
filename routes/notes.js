const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../public/assets/js/fsUtils');

//get request
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//post request
notes.post('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;
    if (req.body) {
        const newNoteAdded = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(newNoteAdded, './db/db.json');
        res.json(`Note added successfully!`);

    } else {
        res.error(`An error occurred while adding note!`)
    }
});
    
//delete request
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