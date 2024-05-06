"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const servicoController_1 = require("../controllers/servicoController");
const router = express_1.default.Router();
router.post('/registrarServico', async (req, res) => {
    try {
        await (0, servicoController_1.criarServicoController)(req, res);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
router.get('/servico/:id', async (req, res) => {
    try {
        const servico = await (0, servicoController_1.getServicoControllerById)(req, res);
        if (servico === null) {
            return res.status(404).send('Fucnionário não encontrado.');
        }
        res.status(200).json(servico);
    }
    catch (error) {
        console.error('Erro na rota:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});
router.put('/servico/:id', async (req, res) => {
    try {
        const updateServico = await (0, servicoController_1.updateServicoControllerById)(req, res);
        res.status(200).json(updateServico);
    }
    catch (error) {
        console.error('Erro na rota:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});
router.delete('/servico/:id', async (req, res) => {
    try {
        const result = await (0, servicoController_1.deleteServicoByIdController)(req, res);
        res.status(200).json({ message: result });
    }
    catch (error) {
        console.error('Erro na rota:', error);
        res.status(500).json('Erro interno do servidor.');
    }
});
exports.default = router;
