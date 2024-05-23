"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFuncionarioByIdController = exports.updateFuncionarioControllerById = exports.getFuncionarioControllerById = exports.criarFuncionarioController = void 0;
const cargoModel_1 = __importDefault(require("../models/cargoModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const funcionarioRepository_1 = require("../repositories/funcionarioRepository");
const criarFuncionarioController = async (req, res) => {
    try {
        const { cargo_id, filial_id, nome, status, email, senha, confirmSenha } = req.body;
        if (!cargo_id || !filial_id || !nome || !status || !email || !senha || !confirmSenha) {
            console.error('Todos os campos são necessários.');
            return res.status(400).send('Todos os campos são necessários.');
        }
        if (senha !== confirmSenha) {
            console.error('Senhas não coincidem.');
            return res.status(400).send('Senhas não coincidem');
        }
        // Verifica se o cargo (cargo_id) fornecido na requisição existe na tabela Cargo
        const cargo = await cargoModel_1.default.findByPk(parseInt(cargo_id)); // Convertendo para número
        if (!cargo) {
            console.error('Position not found');
            return res.status(404).send('Cargo não encontrado.');
        }
        const hashedSenha = await bcrypt_1.default.hash(senha, 10);
        await (0, funcionarioRepository_1.criarFuncionario)(cargo_id, filial_id, nome, status, email, hashedSenha);
        console.log('Funcionário cadastrado com sucesso.');
        res.status(201).send('Funcionário cadastrado com sucesso.');
    }
    catch (error) {
        console.error('Erro interno no servidor:', error);
        res.status(500).send('Erro interno no servidor');
    }
};
exports.criarFuncionarioController = criarFuncionarioController;
const getFuncionarioControllerById = async (req, res) => {
    try {
        const { id } = req.params;
        const funcionario = await (0, funcionarioRepository_1.getFuncionarioById)(parseInt(id, 10));
        if (!funcionario) {
            return res.status(404).send('Funcionário não encontrado.');
        }
        res.status(200).json(funcionario);
    }
    catch (error) {
        console.error('Error ao encontrar funcionário', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};
exports.getFuncionarioControllerById = getFuncionarioControllerById;
const updateFuncionarioControllerById = async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const updateFuncionario = await (0, funcionarioRepository_1.updateFuncionarioById)(parseInt(id, 10), newData);
        res.status(200).json(updateFuncionario);
    }
    catch (error) {
        console.error('Erro ao atualizar o funcionário', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};
exports.updateFuncionarioControllerById = updateFuncionarioControllerById;
const deleteFuncionarioByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, funcionarioRepository_1.deleteFuncionarioById)(parseInt(id, 10));
        return result;
    }
    catch (error) {
        console.error('Erro ao deletar funcionário:', error);
        throw new Error('Erro ao deletar funcionário por ID.');
    }
};
exports.deleteFuncionarioByIdController = deleteFuncionarioByIdController;
