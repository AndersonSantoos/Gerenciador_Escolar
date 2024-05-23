"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTipo_servicoById = exports.updateTipo_servicoById = exports.getTipo_servicoById = exports.criarTipoServico = void 0;
// repositories/tipo_servicoRepository.ts
const tipo_servicoModel_1 = __importDefault(require("../models/tipo_servicoModel"));
const criarTipoServico = async (setor_responsavel_id, nome, status, prazo_resolucao, prazo_minimo) => {
    try {
        const tipoServico = await tipo_servicoModel_1.default.create({
            setor_responsavel_id,
            nome,
            status,
            prazo_resolucao,
            prazo_minimo
        });
        console.log('Tipo de serviço criado:', tipoServico.toJSON());
        return tipoServico.toJSON();
    }
    catch (error) {
        console.error('Erro ao criar tipo de serviço:', error);
        throw error;
    }
};
exports.criarTipoServico = criarTipoServico;
const getTipo_servicoById = async (id) => {
    try {
        const tipo_servico = await tipo_servicoModel_1.default.findByPk(id);
        if (!tipo_servico) {
            throw new Error('Tipo de serviço não encontrado.');
        }
        return tipo_servico;
    }
    catch (error) {
        console.error('Erro ao buscar tipo de serviço por ID.', error);
        throw error;
    }
};
exports.getTipo_servicoById = getTipo_servicoById;
const updateTipo_servicoById = async (id, newData) => {
    try {
        const tipo_servico = await tipo_servicoModel_1.default.findByPk(id);
        if (!tipo_servico) {
            throw new Error('Tipo de serviço não encontrado.');
        }
        await tipo_servicoModel_1.default.update(newData, { where: { id } });
        const tipo_servicoAtualizado = await tipo_servicoModel_1.default.findByPk(id);
        return tipo_servicoAtualizado;
    }
    catch (error) {
        console.error('Erro na atualização do tipo de serviço por ID.', error);
        throw error;
    }
};
exports.updateTipo_servicoById = updateTipo_servicoById;
const deleteTipo_servicoById = async (id) => {
    try {
        const tipo_servico = await tipo_servicoModel_1.default.findByPk(id);
        if (!tipo_servico) {
            throw new Error('Tipo de serviço não encontrado.');
        }
        await tipo_servico.destroy();
        return 'Tipo de serviço deletado com sucesso!';
    }
    catch (error) {
        console.error('Erro enquanto deletava o tipo de serviço pelo ID.', error);
        throw error;
    }
};
exports.deleteTipo_servicoById = deleteTipo_servicoById;
