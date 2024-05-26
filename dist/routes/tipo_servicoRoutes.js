"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tipo_servicoController_1 = require("../controllers/tipo_servicoController");
const router = express_1.default.Router();
router.post('/registrarTipo_servico', async (req, res) => {
    try {
        await (0, tipo_servicoController_1.criarTipo_servicoController)(req, res);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
router.get('/tipo_servico/:id', async (req, res) => {
    try {
        const servico = await (0, tipo_servicoController_1.getTipo_servicoControllerById)(req, res);
        if (servico === null) {
            return res.status(404).send('Tipo de serviço não encontrado.');
        }
        res.status(200).json(servico);
    }
    catch (error) {
        console.error('Erro na rota:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});
router.put('/tipo_servico/:id', async (req, res) => {
    try {
        const updateServico = await (0, tipo_servicoController_1.updateTipo_servicoControllerById)(req, res);
        res.status(200).json(updateServico);
    }
    catch (error) {
        console.error('Erro na rota:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});
router.delete('/tipo_servico/:id', async (req, res) => {
    try {
        const result = await (0, tipo_servicoController_1.deleteTipo_servicoControllerById)(req, res); // Corrigido o nome da função
        res.status(200).json({ message: result }); // Enviar resposta com o resultado da exclusão
    }
    catch (error) {
        console.error('Erro na rota:', error);
        res.status(500).json('Erro interno do servidor.');
    }
});
exports.default = router;
