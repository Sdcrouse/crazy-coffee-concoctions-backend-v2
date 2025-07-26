import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// TODO: See if I can move this into a separate file as middleware
// I will need this for other tables
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
}).promise();

async function findUserByUsername(username) {
    const [usersByUsername] = await pool.query(`
        SELECT * FROM users
        WHERE username = ?
    `, [username]);

    return usersByUsername[0];
}

async function createUser(username, password) {
    await pool.query(`
        INSERT INTO users (username, password)
        VALUES (?, ?)
    `, [username.toLowerCase(), password]);
}

async function increaseTokenVersion(id, tokenVersion) {
    await pool.query(`
        UPDATE users
        SET ref_token_version = ?
        WHERE id = ?
    `, [tokenVersion + 1, id]);
}

export { findUserByUsername, createUser, increaseTokenVersion };