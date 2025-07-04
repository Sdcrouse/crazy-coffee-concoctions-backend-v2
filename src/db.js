import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
}).promise();

// async function getUsers() {
//     const [rows] = await pool.query("SELECT * FROM users");
//     return rows;
// }

// const users = await getUsers();
// console.log(users);

const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
    { id: 3, username: 'user3', password: 'password3' },
    { id: 4, username: 'user4', password: 'password4' },
];

export function findUserByUsername(username) {
    return users.find(user => user.username === username);
}

export function addUser(username, password) {
    const id = users.length + 1;
    users.push({ id, username, password });
}