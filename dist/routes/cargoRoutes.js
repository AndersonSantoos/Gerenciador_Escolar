"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cargoController_1 = require("../controllers/cargoController");
const router = express_1.default.Router();
router.post('/registrarCargo', async (req, res) => {
    try {
        await (0, cargoController_1.criarCargoController)(req, res);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
router.get('/cargo/:cargo_id', async (req, res) => {
    try {
        const cargo = await (0, cargoController_1.getCargoControllerById)(req, res);
        if (cargo === null) {
            return res.status(404).send('Cargo não encontrado.');
        }
        res.status(200).json(cargo);
    }
    catch (error) {
        console.error('Erro na rota:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});
router.put('/cargo/:cargo_id', async (req, res) => {
    try {
        await (0, cargoController_1.updateCargoControllerById)(req, res);
    }
    catch (error) {
        console.error('Erro na rota', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});
router.delete('/cargo/:cargo_id', async (req, res) => {
    try {
        await (0, cargoController_1.deleteCargoControllerById)(req, res);
    }
    catch (error) {
        console.error('Erro na rota', error);
        res.status(500).json('Erro interno do servidor.');
    }
});
exports.default = router;
