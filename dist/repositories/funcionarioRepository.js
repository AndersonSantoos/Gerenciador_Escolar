"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFuncionarioById = exports.updateFuncionarioById = exports.getFuncionarioById = exports.criarFuncionario = void 0;
const funcionarioModel_1 = __importDefault(require("../models/funcionarioModel"));
const criarFuncionario = async (cargo_id, filial_id, nome, status, email, senha) => {
    try {
        return await funcionarioModel_1.default.create({ cargo_id, filial_id, nome, status, email, senha });
    }
    catch (error) {
        console.error('Erro ao criar funcionário', error);
        throw error;
    }
};
exports.criarFuncionario = criarFuncionario;
const getFuncionarioById = async (id) => {
    try {
        const funcionario = await funcionarioModel_1.default.findByPk(id);
        return funcionario;
    }
    catch (error) {
        throw new Error('Erro enquanto busca funcionário por ID.');
    }
};
exports.getFuncionarioById = getFuncionarioById;
const updateFuncionarioById = async (id, newData) => {
    try {
        const funcionario = await funcionarioModel_1.default.findByPk(id);
        if (!funcionario) {
            throw new Error('Funcionário não encontrado.');
        }
        await funcionarioModel_1.default.update(newData, { where: { id: id } });
        return funcionario;
    }
    catch (error) {
        throw new Error('Erro na atualização do funcionário por ID.');
    }
};
exports.updateFuncionarioById = updateFuncionarioById;
const deleteFuncionarioById = async (id) => {
    try {
        const funcionario = await funcionarioModel_1.default.findByPk(id);
        if (!funcionario) {
            throw new Error('Funcionário não encontrado.');
        }
        await funcionario.destroy();
        return 'Funcionário deletado com sucesso!';
    }
    catch (error) {
        throw new Error('Erro enquanto deletava o funcionário pelo ID.');
    }
};
exports.deleteFuncionarioById = deleteFuncionarioById;
