import express from 'express';
import bcrypt from 'bcryptjs';

import { getUser, addUser } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// TODO: Make this asynchronous and use the Promise-based version of bcrypt
app.post('/users', (req, res) => {
    const { username, password } = req.body;
    const user = getUser(username);

    if (user) {
        res.status(409).json('A user with this username already exists!');
        return;
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    
    try {
        addUser(username, hashedPassword);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).json('Something went wrong. Please try again later.');
    }
});

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});