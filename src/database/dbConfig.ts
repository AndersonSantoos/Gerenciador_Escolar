import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

sequelize.authenticate()
.then(() => {
    console.log('Conexão com banco de dados bem-sucecida.')
})
.catch(error => {
    console.error('Erro ao se conectar com banco de dados.')
});

export { sequelize };