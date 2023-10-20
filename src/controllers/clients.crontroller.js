import { createClient } from "../repository/client.repository.js"

export async function postClients(req, res) {

    const { name, address, phone } = req.body

    try {
        await createClient(name, address, phone)
        return res.sendStatus(201)

    } catch (err) {
        return res.status(500).res(err.message)
    }
}