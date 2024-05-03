"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInfoAdicionaisById = exports.updateInfoAdicionaisById = exports.getInfoAdicionaisById = exports.criarInfoAdicionais = void 0;
const informacoesAdicionaisModel_1 = __importDefault(require("../models/informacoesAdicionaisModel"));
const criarInfoAdicionais = async (servico_id, descricao) => {
    try {
        return await informacoesAdicionaisModel_1.default.create({ servico_id, descricao });
    }
    catch (error) {
        throw error;
    }
};
exports.criarInfoAdicionais = criarInfoAdicionais;
const getInfoAdicionaisById = async (informacoes_id) => {
    const infoAdicionais = await informacoesAdicionaisModel_1.default.findByPk(informacoes_id);
    if (!infoAdicionais) {
        throw new Error('Informações adicionais não encontradas.');
    }
    return infoAdicionais;
};
exports.getInfoAdicionaisById = getInfoAdicionaisById;
const updateInfoAdicionaisById = async (informacoes_id, newData) => {
    try {
        const infoAdicionais = await informacoesAdicionaisModel_1.default.findByPk(informacoes_id);
        if (!infoAdicionais) {
            throw new Error('Informações adicionais não encontradas.');
        }
        await informacoesAdicionaisModel_1.default.update(newData, { where: { informacoes_id: informacoes_id } });
        const infoAtualizadas = await informacoesAdicionaisModel_1.default.findByPk(informacoes_id);
        return infoAtualizadas;
    }
    catch (error) {
        throw new Error('Erro na atualização das informações atualizadas por ID.');
    }
};
exports.updateInfoAdicionaisById = updateInfoAdicionaisById;
const deleteInfoAdicionaisById = async (informacoes_id) => {
    try {
        const infoAdicionais = await informacoesAdicionaisModel_1.default.findByPk(informacoes_id);
        if (!infoAdicionais) {
            throw new Error('Informações não encontradas.');
        }
        await informacoesAdicionaisModel_1.default.destroy();
        return ('Informações deletadas com sucesso!');
    }
    catch (error) {
        throw new Error('Erro enquanto deletava informações por ID.');
    }
};
exports.deleteInfoAdicionaisById = deleteInfoAdicionaisById;
