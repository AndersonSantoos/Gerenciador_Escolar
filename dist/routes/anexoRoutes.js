"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const anexoController_1 = require("../controllers/anexoController");
const router = express_1.default.Router();
router.post('/criarAnexo', async (req, res) => {
    try {
        await (0, anexoController_1.criarAnexoController)(req, res);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
router.get('/anexo/:id', async (req, res) => {
    try {
        const anexo = await (0, anexoController_1.getAnexoControllerById)(req, res);
        if (anexo === null) {
            return res.status(404).send('Anexo não encontrado.');
        }
        res.status(200).send(anexo);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
router.put('/anexo/:id', async (req, res) => {
    try {
        await (0, anexoController_1.updateAnexoControllerById)(req, res);
    }
    catch (error) {
        console.error('Erro na rota', error);
        res.status(500).send(error.message);
    }
});
router.delete('/anexo/:id', async (req, res) => {
    try {
        const result = await (0, anexoController_1.deleteAnexoControllerById)(req, res);
        res.status(200).send(result);
    }
    catch (error) {
        console.error('Erro na rota', error);
        res.status(500).send(error.message);
    }
});
exports.default = router;
