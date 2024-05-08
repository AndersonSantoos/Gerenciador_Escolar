"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnexoById = exports.updateAnexoById = exports.getAnexoById = exports.criarAnexo = void 0;
const anexoModel_1 = __importDefault(require("../models/anexoModel"));
const criarAnexo = async (servico_id, mensagem_id, funcionario_id) => {
    try {
        return await anexoModel_1.default.create({ servico_id, mensagem_id, funcionario_id });
    }
    catch (error) {
        console.error('Erro ao criar cargo.');
        throw error;
    }
};
exports.criarAnexo = criarAnexo;
const getAnexoById = async (id) => {
    const anexo = await anexoModel_1.default.findByPk(id);
    if (!anexo) {
        throw new Error('Anexo não encontrado.');
    }
    return anexo;
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
        console.error('Erro ao atualizar anexo.');
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
    }
    catch (error) {
        console.error('Erro ao deletar anexo.');
        throw new Error('Erro enquanto deletava o anexo pelo ID.');
    }
};
exports.deleteAnexoById = deleteAnexoById;
