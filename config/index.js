require("dotenv").config();

const REQUIRED_KEYS = ["DB_USERNAME", "DB_PASSWORD", "DB_DATABASE", "DB_HOST", "JWT_TOKEN", "TOKEN_EXPIRATION_TIME"];

REQUIRED_KEYS.forEach((key) => {
  if (!(key in process.env)) {
    throw new Error(`Missing required config key: ${key}`);
  }
});

const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST, JWT_TOKEN, TOKEN_EXPIRATION_TIME, API_UPLOAD_URL } = process.env;

module.exports = {
  JWT_TOKEN,
  TOKEN_EXPIRATION_TIME,
  API_UPLOAD_URL,

  // Sequelize config, sourced based on current NODE_ENV from models/index.js file
  [process.env.NODE_ENV || "development"]: {
    username: DB_USERNAME,
    password: DB_PASSWORD || null,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: "postgres",
    logging: false,
  },
};
