"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnexoById = exports.updateAnexoById = exports.getAnexoById = exports.getMensagemById = exports.getServicoById = exports.getFuncionarioById = exports.criarAnexo = void 0;
const anexoModel_1 = __importDefault(require("../models/anexoModel"));
const funcionarioModel_1 = __importDefault(require("../models/funcionarioModel"));
const mensagemModel_1 = __importDefault(require("../models/mensagemModel"));
const servicoModel_1 = __importDefault(require("../models/servicoModel"));
const criarAnexo = async (servico_id, mensagem_id, funcionario_id) => {
    try {
        return await anexoModel_1.default.create({ servico_id, mensagem_id, funcionario_id });
    }
    catch (error) {
        console.error('Erro ao criar anexo', error);
        throw error;
    }
};
exports.criarAnexo = criarAnexo;
// Função para obter um funcionário pelo ID
const getFuncionarioById = async (id) => {
    try {
        return await funcionarioModel_1.default.findByPk(id);
    }
    catch (error) {
        console.error('Erro ao obter funcionário por ID', error);
        throw error;
    }
};
exports.getFuncionarioById = getFuncionarioById;
const getServicoById = async (servico_id) => {
    try {
        const servico = await servicoModel_1.default.findByPk(servico_id);
        return servico;
    }
    catch (error) {
        console.error('Erro ao buscar serviço por ID:', error);
        return null;
    }
};
exports.getServicoById = getServicoById;
// Função para obter uma mensagem pelo ID
const getMensagemById = async (id) => {
    try {
        return await mensagemModel_1.default.findByPk(id);
    }
    catch (error) {
        console.error('Erro ao obter mensagem por ID', error);
        throw error;
    }
};
exports.getMensagemById = getMensagemById;
const getAnexoById = async (id) => {
    try {
        const anexo = await anexoModel_1.default.findByPk(id);
        if (!anexo) {
            throw new Error('Anexo não encontrado.');
        }
        return anexo;
    }
    catch (error) {
        console.error('Erro ao obter anexo por ID', error);
        throw error;
    }
};
exports.getAnexoById = getAnexoById;
const updateAnexoById = async (id, newData) => {
    try {
        const anexo = await anexoModel_1.default.findByPk(id);
        if (!anexo) {
            throw new Error('Anexo não encontrado.');
        }
        await anexo.update(newData);
        return anexo;
    }
    catch (error) {
        console.error('Erro ao atualizar anexo por ID', error);
        throw error;
    }
};
exports.updateAnexoById = updateAnexoById;
const deleteAnexoById = async (id) => {
    try {
        const anexo = await anexoModel_1.default.findByPk(id);
        if (!anexo) {
            throw new Error('Anexo não encontrado.');
        }
        await anexo.destroy();
        return 'Anexo deletado com sucesso!';
    }
    catch (error) {
        console.error('Erro ao deletar anexo', error);
        throw error;
    }
};
exports.deleteAnexoById = deleteAnexoById;
