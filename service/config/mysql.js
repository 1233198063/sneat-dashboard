const { Sequelize } = require('sequelize');
require('dotenv').config();

// MySQL database configuration
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  database: process.env.MYSQL_DATABASE || 'sneat_db',
  username: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: '+08:00'
});

// Test database connection
const connectMySQL = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connection has been established successfully.');

    // Synchronize database table structure
    await sequelize.sync({ alter: false });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to MySQL database:', error);
  }
};

module.exports = { sequelize, connectMySQL };