import { Router } from "express"
import { getOrderId, getOrders, getOrdersId } from "../controllers/order.controller.js"
import { validateOrdersById } from "../middlewares/orders.middlewares.js"


const gets = Router()

gets.get('/orders', getOrders)
gets.get('/orders/:id', validateOrdersById, getOrderId)
gets.get('/clients/:id/orders', validateOrdersById, getOrdersId)

export default gets