import pool from "./dbConfig.js";

export default async function findIngredientsByConcoctionId(concId) {
    const [ingredients] = await pool.query(`
        SELECT amount, name, category
        FROM ingredients
        WHERE concoction_id = ?
    `, [concId]);

    return ingredients;
};