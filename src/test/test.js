const server = require("../../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
var expect = chai.expect;
chai.use(chaiHttp);

const test1 = {
    apellidoP: "Caicedo",
    apellidoM: "Porras",
    password: "QWERTY123",
    correo: "test@gmail.com",
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
const testauthIncorrectDNI = {
    dni: "81039214221132132",
    password: "QWERTY123"
}
const testauthIncorrectPassword = {
    dni: "81039214",
    password: "QWERTY1234"
}
const testauthIncorrectTypePassword = {
    dni: "81039214",
    password: 123
}


describe("Testing", () => {
    describe("Pruebas generales", () => {
        it("Probando registro correctamente", (done) => {
            chai.request(server)
                .post("/api/register")
                .send(test1)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it("Probando registro incorrecto", (done) => {
            chai.request(server)
                .post("/api/register")
                .send(test1)
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    done();
                });
        });
        it("Probando login correctamente", (done) => {
            chai.request(server)
                .post("/api/auth")
                .send(testauth)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it("Probando login con dni incorrecto", (done) => {
            chai.request(server)
                .post("/api/auth")
                .send(testauthIncorrectDNI)
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    done();
                });
        });
        it("Probando login con contraseña incorrecta", (done) => {
            chai.request(server)
                .post("/api/auth")
                .send(testauthIncorrectPassword)
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    done();
                });
        });
        it("Probando login con entrada de datos incorrecta", (done) => {
            chai.request(server)
                .post("/api/auth")
                .send()
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    done();
                });
        });
        it("Probando login con entrada de datos incorrecta", (done) => {
            chai.request(server)
                .post("/api/auth")
                .send(testauthIncorrectTypePassword)
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    done();
                });
        });
        

    });
});