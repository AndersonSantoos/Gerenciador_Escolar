"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const infoAdicionaisController_1 = require("../controllers/infoAdicionaisController");
const router = express_1.default.Router();
router.post('/registrarInfo', async (req, res) => {
    try {
        await (0, infoAdicionaisController_1.criarInfoAdicionaisController)(req, res);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
router.get('/info/:informacoes_id', async (req, res) => {
    try {
        const cargo = await (0, infoAdicionaisController_1.getInfoAdicionaisControllerById)(req, res);
        if (cargo === null) {
            return res.status(404).send('Informações não encontradas.');
        }
        res.status(200).json(cargo);
    }
    catch (error) {
        console.error('Erro na rota:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});
router.put('/info/:informacoes_id', async (req, res) => {
    try {
        await (0, infoAdicionaisController_1.updateInfoAdicionaisControllerById)(req, res);
    }
    catch (error) {
        console.error('Erro na rota', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});
// NÃO VAI DELETAR PORQUE ESTÁ EM CASCATA COM A TABLE SERVIÇO
router.delete('/info/:informacoes_id', async (req, res) => {
    try {
        const result = await (0, infoAdicionaisController_1.deleteInfoAdicionaisControllerById)(req, res);
        res.status(200).json({ message: result });
    }
    catch (error) {
        console.error('Erro na rota', error);
        res.status(500).json('Erro interno do servidor.');
    }
});
exports.default = router;
