import pool from "./dbConfig.js";

async function findUserByUsername(username) {
    const [usersByUsername] = await pool.query(`
        SELECT * FROM users
        WHERE username = ?
    `, [username]);

    return usersByUsername[0];
}

async function findUserById(id) {
    const [usersById] = await pool.query(`
        SELECT * FROM users
        WHERE id = ?
    `, [id]);

    return usersById[0];
}

async function createUser(username, password) {
    await pool.query(`
        INSERT INTO users (username, password)
        VALUES (?, ?)
    `, [username.toLowerCase(), password]);
}

async function deleteUser(id) {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
}

async function increaseTokenVersion(id, tokenVersion) {
    await pool.query(`
        UPDATE users
        SET ref_token_version = ?
        WHERE id = ?
    `, [tokenVersion + 1, id]);
}

export { findUserByUsername, findUserById, createUser, deleteUser, increaseTokenVersion };