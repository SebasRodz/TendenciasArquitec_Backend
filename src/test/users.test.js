const User = require("../models/user")

const server = require("../../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

var expect = chai.expect;
chai.use(chaiHttp);

// Constantes para determinar las pruebas unitarias
const test_register = {
    apellidoP: "Gutierrez",
    apellidoM: "Albujar",
    password: "contrasena123",
    correo: "test123@gmail.com",
    direccion: "av 123",
    dni: "01234567",
    fechanac: "2000-12-23T00:00:00",
    nombre: "Sergio",
    sexo: "M",
}

const test_auth_200 = {
    dni: "01234567",
    password: "contrasena123"
}

const test_auth_400_user = {
    dni: "01010101",
    password: "contrasena123"
}

const test_auth_400_password = {
    dni: "01234567",
    password: "contrasena12"
}

describe("Test para rutas de pacientes", () => {
   
    describe("Pruebas para registro de pacientes", () => {
        it("Probando un registro esperando un 200", (done) => {
            chai.request(server)
                .post("/api/users/register")
                .send(test_register)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it("Probando un registro esperando un 400", (done) => {
            chai.request(server)
                .post("/api/users/register")
                .send(test_register)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });

    describe("Pruebas para autentificar pacientes", () => {
        it("Probando una autentificación esperando un 200", (done) => {
            chai.request(server)
                .post("/api/users/auth")
                .send(test_auth_200)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it("Probando una autentificación esperando un 400 al no encontrar DNI", (done) => {
            chai.request(server)
                .post("/api/users/auth")
                .send(test_auth_400_user)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it("Probando una autentificación esperando un 400 al tener una contraseña incorrecta", (done) => {
            chai.request(server)
                .post("/api/users/auth")
                .send(test_auth_400_password)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                })
        })
    });

    describe("Pruebas para listado de pacientes lleno", () => {
        it("Probando un listado esperando un 200", (done) => {
            chai.request(server)
                .get("/api/users/listar")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                })
        })
    })
    
    describe("Probando un listado de pacientes vacio", () => {
        before(() => {
            User.deleteMany({}, (err) => {
            })
        })

        it("Probando un listado esperando un 400", (done) => {
            chai.request(server)
                .get("/api/users/listar")
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                })
        })
    })
})