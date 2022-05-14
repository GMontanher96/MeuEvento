const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {
        const event = { ...req.body }
        if(req.params.id) event.id = req.params.id

        try {
            existsOrError(event.nome, 'Nome do evento não informado')
            existsOrError(event.descricao, 'Descrição não informado')
            existsOrError(event.responsavel, 'Responsável não informado')
            existsOrError(event.data, 'Data do evento não informado')
            existsOrError(event.cidade, 'Cidade do evento não informado')
            existsOrError(event.estado, 'Estado do evento não informado')
            existsOrError(event.local, 'Local do evento não informado')
            existsOrError(event.horario, 'Horário do evento não informado')
            existsOrError(event.valor, 'Valor do evento não informado')
            existsOrError(event.obs, 'Observação do evento não informado')
       

            const eventFromDB = await app.db('events')
                .where({ nome: event.nome }).first()
            if(!event.id) {
                notExistsOrError(eventFromDB, 'Evento já cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(event.id) {
            app.db('events')
                .update(event)
                .where({ id: event.id })
                .whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('events')
                .insert(event)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('events')
            .select('id', 'nome', 'descricao', 'empresa', 'responsavel', 'data', 'cidade', 'estado', 'local', 'horario', 'valor', 'obs')
            .whereNull('deletedAt')
            .then(events => res.json(events))
            .catch(err => res.status(500).send(err))
    }

    const getEventById = (req, res) => {
        app.db('events')
        .select('id', 'nome', 'descricao', 'empresa', 'responsavel', 'data', 'cidade', 'estado', 'local', 'horario', 'valor', 'obs')
        .whereNull('deletedAt')
        .where({ id: req.params.id })
            .first()
            .then(events => res.json(events))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsUpdated = await app.db('events')
                .update({ deletedAt: new Date()})
                .where({ id: req.params.id })
                existsOrError(rowsUpdated, 'Evento não foi encontrado')

                res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }


    return { save, get, getEventById, remove  }
}