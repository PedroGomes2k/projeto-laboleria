import { findCakeId, findClientId, findOrderByDate, findOrders } from "../repository/order.repository.js"

export async function validateOrders(req, res, next) {

    const { date } = req.body

    let orders = []

    if (date) {
        orders = await findOrderByDate(date)
        console.log(orders)
        
    } else {
        orders = await findOrders()
        console.log(orders)
    }
    if (orders.length === 0) return res.status(404).send([])


    orders = orders.map(o => o.allOrders)

    res.locals.body = orders

    next()
}

export async function validateOrder(req, res, next) {

    const { clientId, cakeId, quantity } = req.body

    if (quantity <= 0 || quantity >= 6) return res.status(400).send({ message: "A quantidade tem que ser maior do que 0 e não pode ser maior que 5!" })

    try {
        const verifyClientId = await findClientId(clientId)
        if (verifyClientId.rows[0] > 0) return res.status(404).send({ message: "Este cliente não existe" })

        const verifyCakeId = await findCakeId(cakeId)
        if (verifyCakeId.rows[0] > 0) return res.status(404).send({ message: "Este bolo não existe" })

        next()

    } catch (err) {
        return res.status(500).send(err.message)
    }
}

export async function validateOrdersById(req, res, next) {

    const { id } = req.params

    try {

        const find = await findClientId(id)
        if (!find) return res.status(404).send({ message: "O id não existe" })

        next()

    } catch (err) {
        return res.status(500).send(err.message)
    }
}

