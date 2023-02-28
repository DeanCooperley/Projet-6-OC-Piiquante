require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    APP_SECRET: process.env.APP_SECRET,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PW: process.env.MONGO_PW,
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_DBNAME: process.env.MONGO_DBNAME
};
