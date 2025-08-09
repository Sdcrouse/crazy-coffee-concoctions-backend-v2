import pool from "./dbConfig.js";

async function findConcoctionsByUserId(userId) {
    const [concsByUserId] = await pool.query(`
        SELECT id, name, created_at AS created
        FROM concoctions
        WHERE user_id = ?
        ORDER BY created DESC
    `, [userId]);

    return concsByUserId;
}

async function findConcoctionById(id) {
    const [concoctionsById] = await pool.query(`
        SELECT instructions, notes, user_id as userId
        FROM concoctions
        WHERE id = ?
    `, [id]);
    
    return concoctionsById[0];
}

export { findConcoctionsByUserId, findConcoctionById };