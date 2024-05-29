import dotenv from 'dotenv';
dotenv.config(); 
import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './database/dbConfig';
import funcionarioRoutes from './routes/funcionarioRoutes';
import cargoRoutes from './routes/cargoRoutes';
import servicoRoutes from './routes/servicoRoutes';
import tipo_servicoRoutes from './routes/tipo_servicoRoutes';
import infoAtualizadasRoutes from './routes/infoAtualizadasRoutes';
import mensagemRoutes from './routes/mensagemRoutes';
import filialRoutes from './routes/filialRoutes';
import setorResponsavelRoutes from './routes/setorResponsavelRoutes';
import filialServicoRoutes from './routes/filialServicoRoutes';
import anexoRoutes from './routes/anexoRoutes';
import { exec } from 'child_process';
import { promisify } from 'util';

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
app.use('/', filialRoutes);
app.use('/', setorResponsavelRoutes);
app.use('/', filialServicoRoutes);
app.use('/', anexoRoutes);

// app.listen(port, async () => {
//     console.log(`Servidor rodando na porta? ${port}`);
//     try {
//         await sequelize.sync();
//         console.log(`Models sincronizados com o banco de dados com sucesso.`)
//     } catch (error) {
//         console.log(`Não foi possível sincronizar com o banco de dados.`, error);
//     }
// });

const execPromise = promisify(exec);

const runMigrationsAndStartServer = async () => {
  try {
    const { stdout, stderr } = await execPromise('npx sequelize db:migrate --migrations-path dist/migrations');
  if (stderr) {
    console.error(`Erro ao executar migrações: ${stderr}`);
    process.exit(1);
  }
    console.log(stdout);
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}!`);
      console.log(`Migration executadas com sucesso!`)
    });
  } catch (error: any) {
    console.error(`Erro ao executar migrações: ${error.message}`);
    process.exit(1);
  }
};

runMigrationsAndStartServer();
