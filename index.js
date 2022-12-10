// Developer branch
const app = require("./src/app");
const path = require("path");
//Swagger UI (OPEN API)

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "ClinicaDental",
            version: "1.0.1",
            description: "APIs de la Clinica Dental",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor Local"
            },
            {
                url: "https://tendencias-arquitec-backend-wq61.vercel.app",
                description: "Servidor de desarrollo"
            }
        ],
        },
        apis: [`${path.join(__dirname, "src/routes/*.js")}`],
    };

//middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerSpec)));

// Settings
app.set('port', process.env.PORT || 3000)

// Server init
module.exports = app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})