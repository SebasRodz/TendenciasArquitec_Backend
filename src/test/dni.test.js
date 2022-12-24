process.env.MONGODB_URI = "mongodb+srv://sebastianrodriguez:2319arquitectura@cluster0.ye8q6.mongodb.net/test?retryWrites=true&w=majority";
process.env.PORT = 4000;

const server = require("../../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

var expect = chai.expect;
chai.use(chaiHttp);

describe("Test para probar la ruta de DNI", () => {
    describe("Pruebas para probar el funcionamiento de la API", () => {
        it("Probando la API esperando una respuesta positiva", (done) => {
            chai.request(server)
                .get("/api/pac1/71814625")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                })
        })
    })
})