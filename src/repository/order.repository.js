import db from "../database/database.connection.js"


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

    const order = await db.query(`
        SELECT 
            clients.id AS "clientId",
            clients.name AS "userName",
            clients.address,
            clients.phone,
                    
            cakes.id AS "cakeId", 
            cakes.name AS "cakeName",
            cakes.price,
            cakes.description,
            cakes.image,
            
            orders.id AS "orderId",
            orders."createdAt",
            orders.quantity,
            orders."totalPrice"
           
       FROM clients
       JOIN orders
       ON clients.id = orders."clientId"
       JOIN cakes
       ON cakes.id = orders."cakeId";`
    )

    return (

        order.rows.map((o) => [
            {
                client: {
                    id: o.clientId,
                    name: o.userName,
                    address: o.address,
                    phone: o.phone
                },
                cake: {
                    id: o.cakeId,
                    name: o.cakeName,
                    price: o.price,
                    description: o.description,
                    image: o.image
                },
                orderId: o.orderId,
                createdAt: o.createdAt,
                quantity: o.quantity,
                totalPrice: o.totalPrice
            }
        ])
    )
}

export async function findOrderById(id) {

    const order = await db.query(`
        SELECT 
            clients.id AS "clientId",
            clients.name AS "userName",
            clients.address,
            clients.phone,
                    
            cakes.id AS "cakeId", 
            cakes.name AS "cakeName",
            cakes.price,
            cakes.description,
            cakes.image,
            
            orders.id AS "orderId",
            orders."createdAt",
            orders.quantity,
            orders."totalPrice"
           
       FROM clients
       JOIN orders
       ON clients.id = orders."clientId"
       JOIN cakes
       ON cakes.id = orders."cakeId"
       WHERE clients.id = $1;`, [id]

    )

    return (

        order.rows.map((o) => [
            {
                client: {
                    id: o.clientId,
                    name: o.userName,
                    address: o.address,
                    phone: o.phone
                },
                cake: {
                    id: o.cakeId,
                    name: o.cakeName,
                    price: o.price,
                    description: o.description,
                    image: o.image
                },
                orderId: o.orderId,
                createdAt: o.createdAt,
                quantity: o.quantity,
                totalPrice: o.totalPrice
            }
        ])
    )
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
