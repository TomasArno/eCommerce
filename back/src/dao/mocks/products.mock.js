import '../../utils/env.utils.js';

import productsRep from "../../repositories/products.rep.js"

import { faker } from "@faker-js/faker"

const buildMock = () => {
    const product = {}

    product.title = faker.commerce.productName() + " " + Math.round(Math.random() * 100)
    product.photo = faker.image.avatar()
    product.price = faker.commerce.price()
    product.stock = faker.commerce.price({ min: 0, max: 1000, dec: 0 })

    return product
}

const saveMocks = () => {
    for (let index = 0; index < 100; index++) {
        const mock = buildMock()

        productsRep.create(mock) // No uso await ya que no necesito esperar a que se cree para crear otro
    }
}


saveMocks()