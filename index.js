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
            title: "API",
            version: "1.0.0",
            description: "API",
        },
        servers: [{
            url: "http://localhost:3000",
        }],
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