import { Router } from "express";
import { validateCake } from "../middlewares/cakes.middlewares.js"
import { postCake } from "../controllers/cake.crontroller.js"
import { postClients } from "../controllers/clients.crontroller.js"
import { postOrder } from "../controllers/order.controller.js"
import { validateOrder } from "../middlewares/orders.middlewares.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import { cakeSchema, clientSchema, orderSchema } from "../schemas/createSchemas.js"

const posts = Router()

posts.post('/cakes', validateSchema(cakeSchema), validateCake, postCake)
posts.post('/clients', validateSchema(clientSchema), postClients)
posts.post('/order', validateSchema(orderSchema), validateOrder, postOrder)


export  default posts