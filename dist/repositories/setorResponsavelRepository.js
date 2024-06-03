"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSetorResponsavelById = exports.updateSetorResponsavelById = exports.getSetorResponsavelById = exports.criarSetorResponsavel = void 0;
const setorResponsavelModel_1 = __importDefault(require("../models/setorResponsavelModel"));
const criarSetorResponsavel = async (nome) => {
    try {
        return await setorResponsavelModel_1.default.create({ nome });
    }
    catch (error) {
        console.error('Erro ao criar nome.');
        throw error;
    }
};
exports.criarSetorResponsavel = criarSetorResponsavel;
const getSetorResponsavelById = async (id) => {
    const setorResponsavel = await setorResponsavelModel_1.default.findByPk(id);
    if (!setorResponsavel) {
        throw new Error('Setor responsável não encontrado.');
    }
    return setorResponsavel;
};
exports.getSetorResponsavelById = getSetorResponsavelById;
const updateSetorResponsavelById = async (id, newData) => {
    try {
        const setorResponsavel = await setorResponsavelModel_1.default.findByPk(id);
        if (!setorResponsavel) {
            throw new Error('setor responsável não encontrado.');
        }
        await setorResponsavelModel_1.default.update(newData, { where: { id: id } });
        const setorResponsavelAtualizado = await setorResponsavelModel_1.default.findByPk(id);
        return setorResponsavelAtualizado;
    }
    catch (error) {
        throw new Error('Erro na atualização do setor responsável por ID.');
    }
};
exports.updateSetorResponsavelById = updateSetorResponsavelById;
const deleteSetorResponsavelById = async (id) => {
    try {
        const setorResposanvel = await setorResponsavelModel_1.default.findByPk(id);
        if (!setorResposanvel) {
            throw new Error('Setor responsável não encontrado.');
        }
        await setorResposanvel.destroy();
        return ('Setor responsável deletado com sucesso!');
    }
    catch (error) {
        throw new Error('Erro enquanto deletava setor responsável pelo ID.');
    }
};
exports.deleteSetorResponsavelById = deleteSetorResponsavelById;
