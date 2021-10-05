// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'quiz_1'
    },
    migrations: {
      tableName: 'quiz_1',
      directory: 'db/migrations'
    },
    seeds: {
      directory: "db/seeds"
    }
  }

};
