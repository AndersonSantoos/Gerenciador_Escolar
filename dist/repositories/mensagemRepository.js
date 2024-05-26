"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMensagemById = exports.updateMensagemById = exports.getMensagemById = exports.criarMensagem = void 0;
const mensagemModel_1 = __importDefault(require("../models/mensagemModel"));
const sequelize_1 = require("sequelize");
const criarMensagem = async (servico_id, descricao) => {
    try {
        return await mensagemModel_1.default.create({ servico_id, descricao });
    }
    catch (error) {
        console.error('Erro ao criar mensagem');
        throw error;
    }
};
exports.criarMensagem = criarMensagem;
const getMensagemById = async (uuid) => {
    const mensagem = await mensagemModel_1.default.findOne({
        where: {
            id: {
                [sequelize_1.Op.eq]: uuid
            }
        }
    });
    if (!mensagem) {
        throw new Error('Mensagem não encontrada.');
    }
    return mensagem;
};
exports.getMensagemById = getMensagemById;
const updateMensagemById = async (uuid, newData) => {
    try {
        const mensagem = await mensagemModel_1.default.findByPk(uuid);
        if (!mensagem) {
            throw new Error('Mensagem não encontrada.');
        }
        await mensagemModel_1.default.update(newData, { where: { id: uuid } });
        const mensagemAtualizada = await mensagemModel_1.default.findByPk(uuid);
        return mensagemAtualizada;
    }
    catch (error) {
        throw new Error('Erro na atualização da mensagem por UUID.');
    }
};
exports.updateMensagemById = updateMensagemById;
const deleteMensagemById = async (uuid) => {
    try {
        const mensagem = await mensagemModel_1.default.findOne({ where: { id: uuid } });
        if (!mensagem) {
            throw new Error('Mensagem não encontrada.');
        }
        await mensagem.destroy();
        return 'Mensagem deletada com sucesso!';
    }
    catch (error) {
        console.error('Erro enquanto deletava a mensagem pelo UUID:', error);
        throw new Error('Erro enquanto deletava a mensagem pelo UUID.');
    }
};
exports.deleteMensagemById = deleteMensagemById;
