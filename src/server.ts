import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './database/dbConfig';
import funcionarioRoutes from './routes/funcionarioRoutes';
import cargoRoutes from './routes/cargoRoutes';
import servicoRoutes from './routes/servicoRoutes';
import tipo_servicoRoutes from './routes/tipo_servicoRoutes';
import infoAtualizadasRoutes from './routes/infoAtualizadasRoutes';
import mensagemRoutes from './routes/mensagemRoutes';

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
//Routes
app.use('/', funcionarioRoutes);
app.use('/', cargoRoutes);
app.use('/', servicoRoutes);
app.use('/', tipo_servicoRoutes);
app.use('/', infoAtualizadasRoutes);
app.use('/', mensagemRoutes);

app.listen(port, async () => {
    console.log(`Servidor rodando na porta? ${port}`);
    try {
        await sequelize.sync();
        console.log(`Models sincronizados com o banco de dados com sucesso.`)
    } catch (error) {
        console.log(`Não foi possível sincronizar com o banco de dados.`, error);
    }
});