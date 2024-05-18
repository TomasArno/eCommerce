import "dotenv/config.js";

import supertest from "supertest";
import { expect } from "chai";

const requester = supertest(`http://localhost:${process.env.PORT}/api`);

describe("AUTH TEST", () => {
    const userData = {
        email: "arnotomas1@gmail.com",
        name: "Tomás",
        role: 2,
        password: "tomas123",
    };

    let token;

    it("Registro de un usuario correctamente", async () => {
        const response = await requester.post("/sessions/register").send(userData);
        const { _body } = response;

        expect(_body.statusCode).to.be.equals(201);
    });
    it("Inicio de sesión correctamente", async () => {
        const response = await requester.post("/sessions/login").send({ email: userData.email, password: userData.password });
        const { _body, headers } = response;

        token = `${headers["set-cookie"][0].split("=")[0]}=${headers["set-cookie"][0].split("=")[1]}`;

        expect(_body.statusCode).to.be.equals(200);
    });
    it("Cerrado de sesión correctamente", async () => {
        const response = await requester.post("/sessions/signout").set("Cookie", [token]);
        const { _body } = response;

        expect(_body.statusCode).to.be.equals(200);
    });
    it("Eliminación de un usuario correctamente", async () => {
        const searchedUser = await requester.get(`/users?email=${userData.email}`).set("Cookie", [token]);

        const [user] = searchedUser._body.response.docs

        const response = await requester.delete("/users/" + user._id).set("Cookie", [token]);

        const { _body } = response;

        expect(_body.statusCode).to.be.equals(200);
    });
});

describe("PRODUCTS TEST", () => {
    const userData = {
        email: "arnotomas1@gmail.com",
        name: "Tomás",
        role: 2,
        password: "tomas123",
    };

    let token;

    it("Registro de un usuario correctamente", async () => {
        const response = await requester.post("/sessions/register").send(userData);
        const { _body } = response;

        expect(_body.statusCode).to.be.equals(201);
    });

    it("Inicio de sesión correctamente", async () => {
        const response = await requester.post("/sessions/login").send({ email: userData.email, password: userData.password });
        const { _body, headers } = response;

        token = `${headers["set-cookie"][0].split("=")[0]}=${headers["set-cookie"][0].split("=")[1]}`;

        expect(_body.statusCode).to.be.equals(200);
    });

    it("Cerrado de sesión correctamente", async () => {
        const response = await requester.post("/sessions/signout").set("Cookie", [token]);
        const { _body } = response;

        expect(_body.statusCode).to.be.equals(200);
    });

    it("Eliminación de un usuario correctamente", async () => {
        const searchedUser = await requester.get(`/users?email=${userData.email}`).set("Cookie", [token]);

        const [user] = searchedUser._body.response.docs

        const response = await requester.delete("/users/" + user._id).set("Cookie", [token]);

        const { _body } = response;

        expect(_body.statusCode).to.be.equals(200);
    });
});
