import { findCake } from "../repository/cake.repository.js"

export async function validateCake(req, res, next) {

    const { name, price } = req.body

    try {

        const cakeRegistered = await findCake(name)
        if (!cakeRegistered) return res.status(409).send({ message: "Este bolo já existe, tente outro nome" })

        if (price <= 0) return res.status(400).send({ message: "O valor não pode ser igual a 0" })

        next()

    } catch (err) {
        return res.status(500).send(err.message)
    }

}