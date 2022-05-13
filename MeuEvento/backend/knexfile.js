// Update with your config settings.
// conexão com o banco
module.exports = {
    client: 'postgresql',
    connection: {
      database: 'events',
      user:     'postgres',
      password: '1996'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
