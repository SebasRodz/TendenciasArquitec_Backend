require('dotenv').config();

const config = {
    db: MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://sebastianrodriguez:2319arquitectura@cluster0.ye8q6.mongodb.net/developer?retryWrites=true&w=majority",
    user_mail: process.env.USER_MAIL || "lon77@ethereal.email",
    user_pass: process.env.USER_PASS || "bZjxjpQ8scfunfHHgP",
}

module.exports = { config };