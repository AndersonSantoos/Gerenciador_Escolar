"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFuncionarioById = exports.updateFuncionarioById = exports.getFuncionarioById = exports.criarFuncionario = void 0;
const funcionarioModel_1 = __importDefault(require("../models/funcionarioModel"));
var StatusFuncionario;
(function (StatusFuncionario) {
    StatusFuncionario["Ativo"] = "ativo";
    StatusFuncionario["Inativo"] = "inativo";
})(StatusFuncionario || (StatusFuncionario = {}));
const criarFuncionario = async (cargo_id, nome, senha, status, email, filial) => {
    try {
        if (!(status in StatusFuncionario)) {
            throw new Error('Status inválido');
        }
        return await funcionarioModel_1.default.create({ cargo_id, nome, senha, status, email, filial });
    }
    catch (error) {
        console.error('Erro ao criar funcionário', error);
        throw error;
    }
};
exports.criarFuncionario = criarFuncionario;
const getFuncionarioById = async (funcionario_id) => {
    try {
        const funcionario = await funcionarioModel_1.default.findByPk(funcionario_id);
        return funcionario;
    }
    catch (error) {
        throw new Error('Erro enquanto busca funcionário por ID.');
    }
};
exports.getFuncionarioById = getFuncionarioById;
const updateFuncionarioById = async (funcionario_id, newData) => {
    try {
        const funcionario = await funcionarioModel_1.default.findByPk(funcionario_id);
        if (!funcionario) {
            throw new Error('Funcionário não encontrado.');
        }
        await funcionarioModel_1.default.update(newData, { where: { id: funcionario_id } });
        return funcionario;
    }
    catch (error) {
        throw new Error('Erro na atualização do funcionário por ID.');
    }
};
exports.updateFuncionarioById = updateFuncionarioById;
const deleteFuncionarioById = async (funcionario_id) => {
    try {
        const funcionario = await funcionarioModel_1.default.findByPk(funcionario_id);
        if (!funcionario) {
            throw new Error('Funcionário não encontrado.');
        }
        await funcionario.destroy();
        return 'Funcionário deleteado com sucesso!';
    }
    catch (error) {
        throw new Error('Erro enquanto deletava o funcionário pelo ID.');
    }
};
exports.deleteFuncionarioById = deleteFuncionarioById;
