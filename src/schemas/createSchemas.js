import Joi from "joi"


export const cakeSchema = Joi.object({

    name: Joi.string().min(2).required(),
    price: Joi.number().required(),
    image: Joi.string().uri().required(),
    description: Joi.string().empty(""),

})

export const clientSchema = Joi.object({

    name: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().trim().min(10).max(11).pattern(/^\d+$/).required()

})

export const orderSchema = Joi.object({

    clientId:Joi.number().required(),
    cakeId: Joi.number().required(),
    quantity: Joi.number().required(),
    totalPrice: Joi.number().required()
})