import pool from "./dbConfig.js";

export default async function findCoffeeByConcoctionId(concId) {
    const [coffeesByConcId] = await pool.query(`
        SELECT amount, brand, bean_type AS beanType, blend, roast
        FROM coffees
        WHERE concoction_id = ?
    `, [concId]);
    
    return coffeesByConcId[0];
};