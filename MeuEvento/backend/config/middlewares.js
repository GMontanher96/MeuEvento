// arquivo para acessar as apis 

const bodyParser = require('body-parser')
const cors = require('cors')

// consign faz as dependencias dentro da aplicação usando o require.
// cosign e resposavel por colocar metodos e api dentro do app
// app e instancia do express

module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())
}