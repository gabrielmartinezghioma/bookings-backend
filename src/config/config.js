require('pg')
require('pg-hstore')
require('dotenv').config();


module.exports = {
  "development": {
    use_env_variable: "POSTGRES_DATABASE",
  },
  "test": {
    use_env_variable: "POSTGRES_DATABASE",
  },
  "production": {
    use_env_variable: "POSTGRES_DATABASE_PRODUCTION",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
}