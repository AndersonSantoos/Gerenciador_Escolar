"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMensagemById = exports.updateMensagemById = exports.getMensagemById = exports.criarMensagem = void 0;
const mensagemModel_1 = __importDefault(require("../models/mensagemModel"));
const criarMensagem = async (servico_id, descricao) => {
    try {
        return await mensagemModel_1.default.create({ servico_id, descricao });
    }
    catch (error) {
        console.error('Erro ao criar cargo');
        throw error;
    }
};
exports.criarMensagem = criarMensagem;
const getMensagemById = async (mensagem_id) => {
    const mensagem = await mensagemModel_1.default.findByPk(mensagem_id);
    if (!mensagem) {
        throw new Error('Mensagem não encontrada.');
    }
    return mensagem;
};
exports.getMensagemById = getMensagemById;
const updateMensagemById = async (mensagem_id, newData) => {
    try {
        const mensagem = await mensagemModel_1.default.findByPk(mensagem_id);
        if (!mensagem) {
            throw new Error('Mensagem não encontrada.');
        }
        await mensagemModel_1.default.update(newData, { where: { mensagem_id: mensagem_id } });
        const mensagemAtualizada = await mensagemModel_1.default.findByPk(mensagem_id);
        return mensagemAtualizada;
    }
    catch (error) {
        throw new Error('Erro na atualização da mensagem por ID.');
    }
};
exports.updateMensagemById = updateMensagemById;
const deleteMensagemById = async (mensagem_id) => {
    try {
        const mensagem = await mensagemModel_1.default.findByPk(mensagem_id);
        if (!mensagem) {
            throw new Error('Mensagem não encontrada.');
        }
        await mensagem.destroy();
        return ('Mensagem deletada com sucesso!');
    }
    catch (error) {
        throw new Error('Erro enquanto deletava a mensagem pelo ID.');
    }
};
exports.deleteMensagemById = deleteMensagemById;
