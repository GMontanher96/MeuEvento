const app = require('express')()
const consign = require('consign')
const db = require('./config/db')


app.db = db // arquivo knex 

consign() // chama a função e encadeia o arquivo middlewares e após ele injeta o app nas depedencias.
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(3000, () => {
    console.log('Backend executando....')
})