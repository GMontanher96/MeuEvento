
exports.up = function(knex, Promise) {
    return knex.schema.createTable('events', table => {
        table.increments('id').primary().unique()
        table.string('nome').notNull()
        table.string('descricao').notNull()
        table.string('empresa').notNull()
        table.string('responsavel').notNull()
        table.date('data').notNull()
        table.string('cidade').notNull()
        table.string('estado').notNull()
        table.string('local').notNull()
        table.string('horario').notNull()
        table.decimal('valor').notNull()
        table.string('obs').notNull()
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('events')
  };
  