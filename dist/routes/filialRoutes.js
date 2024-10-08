"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const filialController_1 = require("../controllers/filialController");
const router = express_1.default.Router();
router.post('/registrarFilial', async (req, res) => {
    try {
        await (0, filialController_1.criaFilialController)(req, res);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
router.get('/filial/:id', async (req, res) => {
    try {
        const cargo = await (0, filialController_1.getFilialControllerById)(req, res);
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
router.put('/filial/:id', async (req, res) => {
    try {
        await (0, filialController_1.updateFilialControllerById)(req, res);
    }
    catch (error) {
        console.error('Erro na rota', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});
router.delete('/filial/:id', async (req, res) => {
    try {
        const result = await (0, filialController_1.deleteFilialControllerById)(req, res);
        res.status(200).json({ message: result });
    }
    catch (error) {
        console.error('Erro na rota', error);
        res.status(500).json('Erro interno do servidor.');
    }
});
exports.default = router;
