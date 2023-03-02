const express = require('express');
const path = require('path');
const app = express();
const apiIndex = require('./routes/index.js');
const PORT = process.env.PORT || 3001;

// Define Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiIndex);
app.use(express.static("public"));

// Define GET requests for notes
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});

