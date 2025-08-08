import pool from "./dbConfig.js";

async function findConcoctionsByUserId(userId) {
    // Note: This converts the created_at value from UTC to PST
    
    const [concsByUserId] = await pool.query(`
        SELECT id, name, CONVERT_TZ(created_at, '+00:00','-08:00') AS created
        FROM concoctions
        WHERE user_id = ?
        ORDER BY created DESC
    `, [userId]);

    return concsByUserId;
}

async function findConcoctionById(id) {
    const [concoctionsById] = await pool.query(`
        SELECT name, instructions, notes, user_id as userId
        FROM concoctions
        WHERE id = ?
    `, [id]);
    
    return concoctionsById[0];
}

export { findConcoctionsByUserId, findConcoctionById };