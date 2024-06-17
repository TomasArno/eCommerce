import "dotenv/config.js";

import supertest from "supertest";
import { expect } from "chai";

const requester = supertest(`http://localhost:${process.env.PORT}/api`);

const userData = {
    email: "arnotomas1@gmail.com",
    name: "tomas",
    password: "tomas",
};

describe("AUTH TEST", () => {
    let token;

    it("Registro de un usuario", async () => {
        const response = await requester.post("/sessions/register").send(userData);
        const { _body } = response;

        expect(_body.statusCode).to.be.equals(201);
    });

    it("Inicio de sesión", async () => {
        const response = await requester.post("/sessions/login").send({ email: userData.email, password: userData.password });
        const { _body, headers } = response;

        token = `${headers["set-cookie"][0]?.split("=")[0]}=${headers["set-cookie"][0].split("=")[1]}`;

        expect(_body.statusCode).to.be.equals(200);
    });

    it("Cerrado de sesión", async () => {
        const response = await requester.post("/sessions/signout").set("Cookie", [token]);
        const { _body } = response;

        expect(_body.statusCode).to.be.equals(200);
    });

    it("Eliminación de un usuario", async () => {
        const searchedUser = await requester.get(`/users?email=${userData.email}`).set("Cookie", [token]);

        const [user] = searchedUser._body.response.docs

        const response = await requester.delete("/users/" + user._id).set("Cookie", [token]);

        const { _body } = response;

        expect(_body.statusCode).to.be.equals(200);
    });
});

// describe("PRODUCTS TEST", () => {
//     const productData = {
//         title: "Heladera Samsung",
//         price: 100000,
//         stock: 20
//     };

//     let token;

//     it("Inicio de sesión", async () => {
//         const response = await requester.post("/sessions/login").send({ email: userData.email, password: userData.password });
//         const { _body, headers } = response;

//         token = `${headers["set-cookie"][0]?.split("=")[0]}=${headers["set-cookie"][0].split("=")[1]}`;

//         expect(_body.statusCode).to.be.equals(200);
//     });

//     it("Creación de producto", async () => {
//         const response = await requester.post("/products/").send(productData).set("Cookie", [token]);
//         const { _body } = response;

//         expect(_body.statusCode).to.be.equals(201);
//     });

//     it("Obtener todos los productos", async () => {
//         const response = await requester.get(`/products`).set("Cookie", [token]);

//         const { _body } = response;

//         expect(_body.statusCode).to.be.equals(200);
//     });

//     it("Obtener un producto", async () => {
//         const productsResponse = await requester.get(`/products`).set("Cookie", [token]);
//         const { response: products } = productsResponse._body

//         const productId = products?.docs[0]._id

//         const response = await requester.get(`/products/${productId}`)

//         const { _body } = response;

//         expect(_body.statusCode).to.be.equals(200);
//     });

//     it("Modificar producto", async () => {
//         const productsResponse = await requester.get(`/products`)
//         const { response: products } = productsResponse._body

//         const productId = products?.docs[0]._id

//         const response = await requester.put(`/products/${productId}`).send({ stock: 1000 }).set("Cookie", [token]);

//         const { _body } = response;

//         expect(_body.statusCode).to.be.equals(200);
//     });

//     it("Eliminar producto", async () => {
//         const productsResponse = await requester.get(`/products`)
//         const { response: products } = productsResponse._body

//         const productId = products?.docs[0]._id

//         const response = await requester.delete(`/products/${productId}`).set("Cookie", [token]);

//         const { _body } = response;

//         expect(_body.statusCode).to.be.equals(200);
//     });
// });

// describe("ORDERS TEST", () => {
//     const productData = {
//         title: "Heladera Samsung",
//         price: 100000,
//         stock: 20
//     };

//     let token;
//     let productId

//     it("Inicio de sesión", async () => {
//         const response = await requester.post("/sessions/login").send({ email: userData.email, password: userData.password });
//         const { _body, headers } = response;

//         token = `${headers["set-cookie"][0]?.split("=")[0]}=${headers["set-cookie"][0].split("=")[1]}`;

//         expect(_body.statusCode).to.be.equals(200);
//     });

//     it("Creación de producto", async () => {
//         const response = await requester.post("/products/").send(productData).set("Cookie", [token]);
//         const { _body } = response;

//         productId = _body.response._id

//         expect(_body.statusCode).to.be.equals(201);
//     });

//     it("Obtener ordenes del usuario", async () => {
//         const productsResponse = await requester.get(`/orders`).set("Cookie", [token])
//         const response = productsResponse

//         const { _body } = response;

//         expect(_body.statusCode).to.be.equals(200);
//     });

//     it("Creación de orden", async () => {
//         const response = await requester.post("/orders/").send({ productId, quantity: 10 }).set("Cookie", [token]);
//         const { _body } = response;

//         expect(_body.statusCode).to.be.equals(201);
//     });

//     it("Obtener una orden", async () => {
//         const ordersResponse = await requester.get(`/orders`).set("Cookie", [token])
//         const { response: orders } = ordersResponse._body

//         const orderId = orders?.docs[0]._id

//         const response = await requester.get(`/orders/${orderId}`)

//         const { _body } = response;

//         expect(_body.statusCode).to.be.equals(200);
//     });

//     it("Modificar orden", async () => {
//         const ordersResponse = await requester.get(`/orders`).set("Cookie", [token])
//         const { response: orders } = ordersResponse._body

//         const orderId = orders?.docs[0]._id

//         const response = await requester.put(`/orders/${orderId}`).send({ units: 1000 }).set("Cookie", [token]);

//         const { _body } = response;

//         expect(_body.statusCode).to.be.equals(200);
//     });

//     it("Eliminar orden", async () => {
//         const ordersResponse = await requester.get(`/orders`).set("Cookie", [token])
//         const { response: orders } = ordersResponse._body

//         const orderId = orders?.docs[0]._id

//         const response = await requester.delete(`/orders/${orderId}`).set("Cookie", [token]);

//         const { _body } = response;

//         expect(_body.statusCode).to.be.equals(200);
//     });
// });
