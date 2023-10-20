import { createOrder, findClientId, findOrders, findOrderById, findOrder } from "../repository/order.repository.js";


export async function postOrder(req, res) {

    const { clientId, cakeId, quantity, totalPrice } = req.body

    try {

        await createOrder(clientId, cakeId, quantity, totalPrice)

        return res.sendStatus(201)

    } catch (err) {
        return res.status(500).send(err.message)
    }
}

export async function getOrders(req, res) {

    try {
        const orders = await findOrders()

        res.status(200).send(orders)

    } catch (err) {
        return res.status(500).send(err.message)
    }
}

export async function getOrderId(req, res) {

    const { id } = req.params

    try {

        const orderClient = await findOrderById(id)

        res.status(200).send(orderClient)

    } catch (err) {
        return res.status(500).send(err.message)
    }
}

export async function getOrdersId(req, res) {

    const { id } = req.params

    try {

        const order = await findOrder(id)

        return res.status(200).send(order.rows)

    } catch (err) {
        return res.status(500).send(err.message)
    }
}