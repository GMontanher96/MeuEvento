module.exports = app => {
    // API DE USUÁRIOS

    app.route('/users')
        .post(app.api.user.save) // acessa os arquivos da api
        .get(app.api.user.get)

        app.route('/users/:id')
            .put(app.api.user.save)
            .get(app.api.user.getUserById)

            // API DOS EVENTOS

            app.route('/events')
            .post(app.api.event.save) 
            .get(app.api.event.get)
    
            app.route('/events/:id')
                .put(app.api.event.save)
                .get(app.api.event.getEventById)

}