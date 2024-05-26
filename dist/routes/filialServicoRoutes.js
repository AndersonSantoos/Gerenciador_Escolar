"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const filialServicoController_1 = require("../controllers/filialServicoController");
const router = express_1.default.Router();
router.post('/addFilialServico', async (req, res) => {
    try {
        await (0, filialServicoController_1.criaFilialServicoController)(req, res);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
router.get('/filialServico/:id', async (req, res) => {
    try {
        const cargo = await (0, filialServicoController_1.getFilialServicoControllerById)(req, res);
        if (cargo === null) {
            return res.status(404).send('Filial não encontrada.');
        }
        res.status(200).json(cargo);
    }
    catch (error) {
        console.error('Erro na rota:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});
router.put('/filialServico/:id', async (req, res) => {
    try {
        await (0, filialServicoController_1.updateFilialServicoControllerById)(req, res);
    }
    catch (error) {
        console.error('Erro na rota', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});
router.delete('/filialServico/:id', async (req, res) => {
    try {
        const result = await (0, filialServicoController_1.deleteFilialServicoControllerById)(req, res);
        res.status(200).json({ message: result });
    }
    catch (error) {
        console.error('Erro na rota', error);
        res.status(500).json('Erro interno do servidor.');
    }
});
exports.default = router;
