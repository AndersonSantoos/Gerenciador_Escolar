"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mensagemController_1 = require("../controllers/mensagemController");
const router = express_1.default.Router();
router.post('/registrarMensagem', async (req, res) => {
    try {
        await (0, mensagemController_1.criarMensagemController)(req, res);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
router.get('/mensagem/:uuid', async (req, res) => {
    try {
        const mensagem = await (0, mensagemController_1.getMensagemControllerById)(req, res);
        if (mensagem === null) {
            return res.status(404).json({ message: 'Mensagem não encontrada' });
        }
        else {
            return res.status(200).json(mensagem);
        }
    }
    catch (error) {
        console.error('Erro na rota:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});
router.put('/mensagem/:uuid', async (req, res) => {
    try {
        await (0, mensagemController_1.updateMensagemControllerById)(req, res);
    }
    catch (error) {
        console.error('Erro na rota', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});
router.delete('/mensagem/:uuid', async (req, res) => {
    try {
        await (0, mensagemController_1.deleteMensagemControllerById)(req, res);
    }
    catch (error) {
        console.error('Erro na rota', error);
        res.status(500).json('Erro interno do servidor.');
    }
});
exports.default = router;
