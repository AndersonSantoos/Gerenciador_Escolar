"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const funcionarioController_1 = require("../controllers/funcionarioController");
const router = express_1.default.Router();
router.post('/registrarFuncionario', async (req, res) => {
    try {
        await (0, funcionarioController_1.criarFuncionarioController)(req, res);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
router.get('/funcionario/:funcionario_id', async (req, res) => {
    try {
        const funcionario = await (0, funcionarioController_1.getFuncionarioControllerById)(req, res);
        if (funcionario === null) {
            return res.status(404).send('Fucnionário não encontrado.');
        }
        res.status(200).json(funcionario);
    }
    catch (error) {
        console.error('Erro na rota:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});
router.put('/funcionario/:funcionario_id', async (req, res) => {
    try {
        const updateFuncionario = await (0, funcionarioController_1.updateFuncionarioControllerById)(req, res);
        res.status(200).json(updateFuncionario);
    }
    catch (error) {
        console.error('Erro na rota:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});
router.delete('/funcionario/:funcionario_id', async (req, res) => {
    try {
        const result = await (0, funcionarioController_1.deleteFuncionarioByIdController)(req, res);
        res.status(200).json({ message: result });
    }
    catch (error) {
        console.error('Erro na rota:', error);
        res.status(500).json('Erro interno do servidor.');
    }
});
exports.default = router;
