// Developer branch
const app = require("./src/app");

// Settings
app.set('port', process.env.PORT || 3000)

// Server init
module.exports = app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})