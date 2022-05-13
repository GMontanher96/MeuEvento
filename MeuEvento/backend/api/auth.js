const { authSecret } = require('../.env')
const  jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs') // compara a senha do login e do banco


module.exports = app => {
    const signin = async  (req, res) => {
        if(!req.body.email || !req.body.password) {
            return res.status(400).send('Informe o usuário e a senha!')
        }

        const user = await app.db('users')
            .where({email: req.body.email })
            .first()
        // se o usuario não existe retorne

        if(!user) return res.status(400).send('Usuário não encontrado!!!!')

        const isMatch = bcrypt.compareSync(req.body.password, user.password) // valida se a senha e a mesma 
        if(!isMatch) return res.status(401).send('Email/Senha inválidos!!') // não autorizado

        // se o processo der certo. (gerar o token)

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            id: user.id,
            nome: user.nome,
            email: user.email,
            admin: user.admin,
            iat: now, // data de geração do token
            exp: now + (60 * 60 * 24 * 2) // vai expirar em 2 dias o token
        }

        res.json({
            ...payload, // enviando o payload 
            token: jwt.encode(payload, authSecret) // requisição do token
        })
    }

    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if(userData) {
                const token = jwt.decode(userData.token, authSecret) // armazena o token
                if(new Date(token.exp * 1000) > new Date()) {
                    return res.send(true) // token valido
                }
            }
        } catch(e) {
            // problema com o token

        }

        res.send(false)
    }

    return { signin, validateToken }
}