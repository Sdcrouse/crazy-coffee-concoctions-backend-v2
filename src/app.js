import express from 'express';

import { getUser, addUser } from './db.js';

const app = express();
const PORT = process.env.port || 5000;

app.use(express.json());

app.post('/users', (req, res) => {
    const { username, password } = req.body;
    const user = getUser(username);

    if (user) {
        res.status(409).json('A user with this username already exists!');
        return;
    }
    
    try {
        addUser(username, password);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).json('Something went wrong. Please try again later.');
    }
});

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});