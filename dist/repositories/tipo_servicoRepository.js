"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTipo_servicoById = exports.updateTipo_servicoById = exports.getTipo_servicoById = exports.criarTipo_servico = void 0;
const tipo_servicoModel_1 = __importDefault(require("../models/tipo_servicoModel"));
const criarTipo_servico = async (servico_id, tipo) => {
    try {
        return await tipo_servicoModel_1.default.create({ servico_id, tipo });
    }
    catch (error) {
        console.error('Erro ao criar tipo de serviço.');
        throw error;
    }
};
exports.criarTipo_servico = criarTipo_servico;
const getTipo_servicoById = async (tipo_servico_id) => {
    const tipo_servico = await tipo_servicoModel_1.default.findByPk(tipo_servico_id);
    if (!tipo_servico) {
        throw new Error('Tipo de serviço não encontrado.');
    }
    return tipo_servico;
};
exports.getTipo_servicoById = getTipo_servicoById;
const updateTipo_servicoById = async (tipo_servico_id, newData) => {
    try {
        const tipo_servico = await tipo_servicoModel_1.default.findByPk(tipo_servico_id);
        if (!tipo_servico) {
            throw new Error('Tipo de serviço não encontrado.');
        }
        await tipo_servicoModel_1.default.update(newData, { where: { tipo_servico_id: tipo_servico_id } });
        const tipo_servicoAtualizado = await tipo_servicoModel_1.default.findByPk(tipo_servico_id);
        return tipo_servicoAtualizado;
    }
    catch (error) {
        throw new Error('Erro na atualização do tipo de serviço por ID.');
    }
};
exports.updateTipo_servicoById = updateTipo_servicoById;
const deleteTipo_servicoById = async (tipo_servico_id) => {
    try {
        const tipo_servico = await tipo_servicoModel_1.default.findByPk(tipo_servico_id);
        if (!tipo_servico) {
            throw new Error('Tipo de serviço não encontrado.');
        }
        await tipo_servico.destroy();
        return ('Tipo de serviço deletado com sucesso!');
    }
    catch (error) {
        throw new Error('Erro enquanto deletava o tipo de serviço pelo ID.');
    }
};
exports.deleteTipo_servicoById = deleteTipo_servicoById;
