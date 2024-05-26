"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFilialById = exports.updateFilialById = exports.getFilialById = exports.criarFilial = void 0;
const filial_1 = __importDefault(require("../models/filial"));
const criarFilial = async (nome) => {
    try {
        return await filial_1.default.create({ nome });
    }
    catch (error) {
        console.error('Erro ao criar filial.');
        throw error;
    }
};
exports.criarFilial = criarFilial;
const getFilialById = async (id) => {
    const filial = await filial_1.default.findByPk(id);
    if (!filial) {
        throw new Error('Filial não encontrada.');
    }
    return filial;
};
exports.getFilialById = getFilialById;
const updateFilialById = async (id, newData) => {
    try {
        const filial = await filial_1.default.findByPk(id);
        if (!filial) {
            throw new Error("Filial não encontrada.");
        }
        await filial_1.default.update(newData, { where: { id: id } });
        const filialAtualizada = await filial_1.default.findByPk(id);
        return filialAtualizada;
    }
    catch (error) {
        throw new Error('Erro na atualização da filial por ID.');
    }
};
exports.updateFilialById = updateFilialById;
const deleteFilialById = async (id) => {
    try {
        const filial = await filial_1.default.findByPk(id);
        if (!filial) {
            throw new Error('Filial não encontrada.');
        }
        await filial.destroy();
        return ('Filial deletada com sucesso!');
    }
    catch (error) {
        throw new Error('Erro enquanto deletava a filial pelo ID.');
    }
};
exports.deleteFilialById = deleteFilialById;
