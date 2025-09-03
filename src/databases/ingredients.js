import pool from "./dbConfig.js";

async function findIngredientsByConcoctionId(concId) {
    const [ingredients] = await pool.query(`
        SELECT amount, name, category
        FROM ingredients
        WHERE concoction_id = ?
    `, [concId]);

    return ingredients;
};

async function createIngredient(concoctionId, category, amount, name) {
    await pool.query(`
        INSERT INTO ingredients (concoction_id, category, amount, name)
        VALUES (?, ?, ?, ?)
    `, [concoctionId, category, amount, name]);
}

export { findIngredientsByConcoctionId, createIngredient };