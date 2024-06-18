import Stripe from "stripe";

import dao from "../dao/index.dao.js";
const { orders, payments } = dao;

import PaymentsDto from "../dto/payments.dto.js"

const stripe = new Stripe(process.env.SECRET_STRIPE)

class PaymentsRepository {
    async create(userId) {
        try {
            const userOrders = await orders.read({ filter: { userId } })
            const line_items = userOrders.docs.map((el) => new PaymentsDto(el))

            const intent = await stripe.checkout.sessions.create({
                line_items,
                mode: "payment",
                success_url: "https://proteo-39cde.web.app/thanks"
            })

            return intent
        } catch (e) {
            throw e
        }
    }
}

const paymentsRepository = new PaymentsRepository();


export default paymentsRepository