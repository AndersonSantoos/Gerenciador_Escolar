"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFilialServicoById = exports.updateFilialServicoById = exports.getFilialServicoById = exports.criarFilialServico = void 0;
const filialServico_1 = __importDefault(require("../models/filialServico"));
const criarFilialServico = async (nome) => {
    try {
        return await filialServico_1.default.create({ nome });
    }
    catch (error) {
        console.error('Erro ao criar filial.');
        throw error;
    }
};
exports.criarFilialServico = criarFilialServico;
const getFilialServicoById = async (id) => {
    const filial = await filialServico_1.default.findByPk(id);
    if (!filial) {
        throw new Error('Filial não encontrada.');
    }
    return filial;
};
exports.getFilialServicoById = getFilialServicoById;
const updateFilialServicoById = async (id, newData) => {
    try {
        const filial = await filialServico_1.default.findByPk(id);
        if (!filial) {
            throw new Error("Filial não encontrada.");
        }
        await filialServico_1.default.update(newData, { where: { id: id } });
        const filialAtualizada = await filialServico_1.default.findByPk(id);
        return filialAtualizada;
    }
    catch (error) {
        throw new Error('Erro na atualização da filial por ID.');
    }
};
exports.updateFilialServicoById = updateFilialServicoById;
const deleteFilialServicoById = async (id) => {
    try {
        const filial = await filialServico_1.default.findByPk(id);
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
exports.deleteFilialServicoById = deleteFilialServicoById;
