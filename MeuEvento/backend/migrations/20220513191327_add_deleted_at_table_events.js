
exports.up = function(knex) {
    return knex.schema.alterTable('events', function (table) {
        table.timestamp('deletedAt')
    })
};

exports.down = function(knex) {
    return knex.schema.alterTable('events', function (table) {
        table.dropColumn('deletedAt')
    })
};
