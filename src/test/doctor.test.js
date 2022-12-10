const Doctor = require("../models/doctors")
const User = require("../models/user")

const server = require("../../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

var expect = chai.expect;
chai.use(chaiHttp);

describe("Test para rutas de doctores", () => {

    describe("Pruebas para registro de doctores", () => {
        before(() => {
            Doctor.deleteMany({}, (err) => {})
            User.deleteMany({}, (err) => {})
        })

        it("Probando un registro esperando un 200", (done) => {
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
                especialidad: "PODOLOGO",
                turno: "NOCHE"
            }
            
            chai.request(server)
                .post("/api/doctor/register")
                .send(test_register)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it("Probando un registro esperando un 400 al existir el doctor", (done) => {
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
                especialidad: "PODOLOGO",
                turno: "NOCHE"
            }
            
            chai.request(server)
                .post("/api/doctor/register")
                .send(test_register)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it("Probando un registro esperando un 400 al no colocar especialidad", (done) => {
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
                turno: "NOCHE"
            }
            chai.request(server)
                .post("/api/doctor/register")
                .send(test_register)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });
        it("Probando un registro esperando un 400 al no colocar turno", (done) => {
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
                especialidad: "PODOLOGO"
            }
            
            chai.request(server)
                .post("/api/doctor/register")
                .send(test_register)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it("Probando un registro esperando un 400 al no colocar algo requerido de usuario", (done) => {
            const test_register = {
                apellidoP: "Gutierrez",
                apellidoM: "Albujar",
                password: "contrasena123",
                direccion: "av 123",
                fechanac: "2000-12-23T00:00:00",
                nombre: "Sergio",
                sexo: "M",
                especialidad: "PODOLOGO",
                turno: "NOCHE"
            }
            
            chai.request(server)
                .post("/api/doctor/register")
                .send(test_register)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });

    describe("Pruebas para determinar listados con existencia de doctores", () => {
        after(() => {
            Doctor.deleteMany({}, (err) => {})
            User.deleteMany({}, (err) => {})
        })

        it("Probando un listado total de doctores esperando un 200", (done) => {
            chai.request(server)
                .get("/api/doctor/listar")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                })
        })

        it("Probando un listado con especialidad esperando un 200", (done) => {
            chai.request(server)
                .get("/api/doctor/listar/especialidad/podologo")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                })
        })

        it("Probando un listado con turno esperando un 200", (done) => {
            chai.request(server)
                .get("/api/doctor/listar/turno/noche")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                })
        })

        it("Probando un listado con especialidad y turno esperando un 200", (done) => {
            chai.request(server)
                .get("/api/doctor/listar/todo/podologo/noche")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                })
        })
    })

    describe("Pruebas para listar doctores sin existencia de estos", () => {
        before(() => {
            Doctor.deleteMany({}, (err) => {})
            User.deleteMany({}, (err) => {})
        })

        it("Probando un listado de doctores esperando un 400", (done) => {
            chai.request(server)
                .get("/api/doctor/listar")
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it("Probando un listado esperando un 400 al no encontrar especialidad", (done) => {
            chai.request(server)
                .get("/api/doctor/listar/especialidad/podologo")
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it("Probando un listado esperando un 400 al no encontrar turno", (done) => {
            chai.request(server)
                .get("/api/doctor/listar/turno/noche")
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });

        it("Probando un listado esperando un 400 al no encontrar especialidad ni turno", (done) => {
            chai.request(server)
                .get("/api/doctor/listar/todo/podologo/noche")
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                })
        })
    });
})