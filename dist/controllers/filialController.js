"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFilialControllerById = exports.updateFilialControllerById = exports.getFilialControllerById = exports.criaFilialController = void 0;
const filialRepository_1 = require("../repositories/filialRepository");
const criaFilialController = async (req, res) => {
    const { nome } = req.body;
    try {
        const novaFilial = await (0, filialRepository_1.criarFilial)(nome);
        res.status(201).json(novaFilial);
    }
    catch (error) {
        console.error('Erro ao criar filial', error);
        res.status(500).json({ message: 'Erro ao criar filial' });
    }
};
exports.criaFilialController = criaFilialController;
const getFilialControllerById = async (req, res) => {
    const { id } = req.params;
    try {
        const filial = await (0, filialRepository_1.getFilialById)(parseInt(id, 10));
        if (!filial) {
            res.status(404).json({ message: 'Filial não encontrada' });
        }
        else {
            res.status(200).json(filial);
        }
    }
    catch (error) {
        console.error('Erro ao obter filial por ID', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};
exports.getFilialControllerById = getFilialControllerById;
const updateFilialControllerById = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        const filialAtualizada = await (0, filialRepository_1.updateFilialById)(parseInt(id, 10), newData);
        res.status(200).json(filialAtualizada);
    }
    catch (error) {
        console.error('Erro ao atualizar filial por ID', error);
        res.status(500).json({ message: 'Erro ao atualizar filial por ID' });
    }
};
exports.updateFilialControllerById = updateFilialControllerById;
const deleteFilialControllerById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, filialRepository_1.deleteFilialById)(parseInt(id, 10));
        return result;
    }
    catch (error) {
        console.error('Erro ao excluir filial por ID', error);
        res.status(500).json({ message: 'Erro ao excluir filial por ID' });
    }
};
exports.deleteFilialControllerById = deleteFilialControllerById;
