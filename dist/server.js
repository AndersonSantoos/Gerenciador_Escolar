"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const funcionarioRoutes_1 = __importDefault(require("./routes/funcionarioRoutes"));
const cargoRoutes_1 = __importDefault(require("./routes/cargoRoutes"));
const servicoRoutes_1 = __importDefault(require("./routes/servicoRoutes"));
const tipo_servicoRoutes_1 = __importDefault(require("./routes/tipo_servicoRoutes"));
const infoAtualizadasRoutes_1 = __importDefault(require("./routes/infoAtualizadasRoutes"));
const mensagemRoutes_1 = __importDefault(require("./routes/mensagemRoutes"));
const filialRoutes_1 = __importDefault(require("./routes/filialRoutes"));
const setorResponsavelRoutes_1 = __importDefault(require("./routes/setorResponsavelRoutes"));
const filialServicoRoutes_1 = __importDefault(require("./routes/filialServicoRoutes"));
const anexoRoutes_1 = __importDefault(require("./routes/anexoRoutes"));
const child_process_1 = require("child_process");
const util_1 = require("util");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
//Routes
app.use('/', funcionarioRoutes_1.default);
app.use('/', cargoRoutes_1.default);
app.use('/', servicoRoutes_1.default);
app.use('/', tipo_servicoRoutes_1.default);
app.use('/', infoAtualizadasRoutes_1.default);
app.use('/', mensagemRoutes_1.default);
app.use('/', filialRoutes_1.default);
app.use('/', setorResponsavelRoutes_1.default);
app.use('/', filialServicoRoutes_1.default);
app.use('/', anexoRoutes_1.default);
// app.listen(port, async () => {
//     console.log(`Servidor rodando na porta? ${port}`);
//     try {
//         await sequelize.sync();
//         console.log(`Models sincronizados com o banco de dados com sucesso.`)
//     } catch (error) {
//         console.log(`Não foi possível sincronizar com o banco de dados.`, error);
//     }
// });
const execPromise = (0, util_1.promisify)(child_process_1.exec);
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
            console.log(`Migration executadas com sucesso!`);
        });
    }
    catch (error) {
        console.error(`Erro ao executar migrações: ${error.message}`);
        process.exit(1);
    }
};
runMigrationsAndStartServer();
