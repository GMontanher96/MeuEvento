// Update with your config settings.
// conexão com o banco
const { db } = require('./.env')

module.exports = {
    client: 'postgresql',
    connection: db,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
