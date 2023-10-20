import { createCake } from "../repository/cake.repository.js"

export async function postCake(req, res) {

    const { name, price, image, description } = req.body

    try {

        await createCake(name, price, image, description)
        return res.sendStatus(201)

    } catch (err) {
        return res.status(500).send(err.message)
    }
}