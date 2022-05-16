const admin = require('./admin')

//  .post(admin(app.api.user.save))
//   .get(admin(app.api.user.get))


module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(app.api.user.save) // acessa os arquivos da api
        .get(app.api.user.get)

        app.route('/users/:id')
            .all(app.config.passport.authenticate())
            .put(admin(app.api.user.save))
            .get(admin(app.api.user.getUserById))
            .delete(admin(app.api.user.remove))

            // API DOS EVENTOS

            app.route('/events')
            .all(app.config.passport.authenticate())
            .post(admin(app.api.event.save)) 
            .get(admin(app.api.event.get))
    
            app.route('/events/:id')
            .all(app.config.passport.authenticate())
                .put(admin(app.api.event.save))
                .get(admin(app.api.event.getEventById))
                .delete(admin(app.api.user.remove))


}