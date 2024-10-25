require('pg')
require('pg-hstore')

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.POSTGRES_DATABASE)

module.exports = sequelize;
