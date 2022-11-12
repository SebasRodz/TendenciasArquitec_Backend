const server = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
var expect = chai.expect;
chai.use(chaiHttp);

const test1 = {
    apellidoP: "Porras",
    apellidoM: "Caicedo",
    password: "QWERTY123",
    correo: "jose@gmail.com",
    direccion: "av 123",
    dni: "81039214",
    fechanac: "2000-12-23T00:00:00",
    nombre: "Jose",
    sexo: "M",
    tipoUsuario: "2"
}
const testauth = {
    dni: "81039214",
    password: "QWERTY123"
}

describe("Testing", () => {
    it("Probando", (done) => {
        chai.request(server)
            .post("/api/user/register")
            .send(test1)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
    it("Probando", (done) => {
        chai.request(server)
            .post("/api/user/auth")
            .send(testauth)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});