import db from "../database/database.connection.js"

const templateCode = `
SELECT
jsonb_build_object(
'client', jsonb_build_object('id', cl."id", 'name', cl."name", 'address', cl."address", 'phone', cl."phone"),
'cake', jsonb_build_object('id', ca."id", 'name', ca."name", 'price', ca."price", 'description', ca."description", 'image', ca."image"),
'orderId', o."id",
'createdAt', o."createdAt",
'quantity', o."quantity",
'totalPrice', o."totalPrice"
) AS "allOrders"
FROM orders o
JOIN clients cl ON o."clientId" = cl."id"
JOIN cakes ca ON o."cakeId" = ca."id"`;

export async function findClientId(id) {
    return (
        db.query(`SELECT * FROM clients WHERE id = $1;`, [id])
    )
}

export async function findCakeId(cakeId) {
    return (
        db.query(`SELECT * FROM cakes WHERE id = $1;`, [cakeId])
    )
}

export async function createOrder(clientId, cakeId, quantity, totalPrice) {
    return (
        db.query(`
            INSERT INTO orders ("clientId","cakeId", quantity, "totalPrice")
            VALUES ($1 , $2, $3, $4);
        `, [clientId, cakeId, quantity, totalPrice])
    )
}

export async function findOrders() {

    const result = await db.query(templateCode)
    return result.rows

}

export async function findOrderByDate(date) {

    const result = await db.query(`${templateCode} WHERE SUBSTRING(TO_CHAR("createdAt", 'YYYY-MM-DD HH24:MI:SS')
    FROM 1 FOR 10) = $1;`, [date])

    return result.rows

}

export async function findOrderById(id) {

    const result = await db.query(`${templateCode} WHERE orders.id = $1;`, [id])

    return result.rows

}

export async function findOrder(id) {
    return (
        db.query(`
        SELECT 
            orders.id AS "orderId",
            orders.quantity,
            orders."createdAt",
            orders."totalPrice",
            cakes.name as "cakeName"
        FROM orders
        JOIN cakes
        ON orders."cakeId" = cakes.id
        JOIN clients
        ON orders."clientId" = clients.id
        WHERE clients.id = $1;
        `, [id])
    )
}
