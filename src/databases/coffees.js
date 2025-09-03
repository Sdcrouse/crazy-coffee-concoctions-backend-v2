import pool from "./dbConfig.js";

async function findCoffeeByConcoctionId(concId) {
    const [coffeesByConcId] = await pool.query(`
        SELECT amount, brand, bean_type AS beanType, blend, roast
        FROM coffees
        WHERE concoction_id = ?
    `, [concId]);
    
    return coffeesByConcId[0];
};

async function createCoffee(concId, amount, brand, blend, optionalArgs) {
    const { roast, beanType } = optionalArgs;
    let values = [concId, amount, brand, blend];
    let sql;

    if (roast) {
        values.push(roast);

        if (beanType) {
            sql = `
                INSERT INTO COFFEES (concoction_id, amount, brand, blend, roast, bean_type)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            values.push(beanType);
        } else {
            sql = `
                INSERT INTO COFFEES (concoction_id, amount, brand, blend, roast)
                VALUES (?, ?, ?, ?, ?)
            `;
        }
    } else if (beanType) {
        values.push(beanType);
        sql = `
            INSERT INTO COFFEES (concoction_id, amount, brand, blend, bean_type)
            VALUES (?, ?, ?, ?, ?)
        `;
    } else {
        sql = `
            INSERT INTO COFFEES (concoction_id, amount, brand, blend)
            VALUES (?, ?, ?, ?)
        `;
    }

    await pool.query(sql, values);
}

export { findCoffeeByConcoctionId, createCoffee };