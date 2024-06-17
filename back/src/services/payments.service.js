import payments from "../repositories/payments.rep.js"

class PaymentsService {
    async create(userId) {
        try {
            const response = await payments.create(userId)

            return response
        } catch (e) {
            throw e
        }
    }
}

const paymentsService = new PaymentsService();

export default paymentsService