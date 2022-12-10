require('dotenv').config();

const config = {
    db: MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://sebastianrodriguez:2319arquitectura@cluster0.ye8q6.mongodb.net/production?retryWrites=true&w=majority",
    db_dev: MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://sebastianrodriguez:2319arquitectura@cluster0.ye8q6.mongodb.net/developer?retryWrites=true&w=majority",
    db_test: "mongodb+srv://sebastianrodriguez:2319arquitectura@cluster0.ye8q6.mongodb.net/test?retryWrites=true&w=majority"
}

module.exports = { config };