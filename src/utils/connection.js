require('pg')
require('pg-hstore')

const { Sequelize } = require('sequelize');
require('dotenv').config();
const { exec } = require('child_process');


const sequelize = new Sequelize(process.env.POSTGRES_DATABASE_PRODUCTION, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

async function runMigrations() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');

    exec('npx sequelize-cli db:migrate --env production', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al ejecutar migraciones: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Error: ${stderr}`);
        return;
      }
      console.log(`Migraciones ejecutadas:\n${stdout}`);
    });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  } finally {
    await sequelize.close();
  }
}

runMigrations();

module.exports = sequelize;
