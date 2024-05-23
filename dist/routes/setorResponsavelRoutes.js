"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const setorResponsavelController_1 = require("../controllers/setorResponsavelController");
const router = express_1.default.Router();
router.post('/registrarSetorResposnavel', async (req, res) => {
    try {
        await (0, setorResponsavelController_1.criarSetorResponsavelController)(req, res);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
router.get('/setorResponsavel/:id', async (req, res) => {
    try {
        const cargo = await (0, setorResponsavelController_1.getSetorResponsavelControllerById)(req, res);
        if (cargo === null) {
            return res.status(404).send('Setor responsável não encontrado.');
        }
        res.status(200).json(cargo);
    }
    catch (error) {
        console.error('Erro na rota:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});
router.put('/setorResponsavel/:id', async (req, res) => {
    try {
        await (0, setorResponsavelController_1.updateSetorResponsavelControllerById)(req, res);
    }
    catch (error) {
        console.error('Erro na rota', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});
router.delete('/setorResponsavel/:id', async (req, res) => {
    try {
        const result = await (0, setorResponsavelController_1.deleteSetorResponsavelControllerById)(req, res);
        res.status(200).json({ message: result });
    }
    catch (error) {
        console.error('Erro na rota', error);
        res.status(500).json('Erro interno do servidor.');
    }
});
exports.default = router;
