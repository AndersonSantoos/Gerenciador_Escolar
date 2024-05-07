"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFilialServicoControllerById = exports.updateFilialServicoControllerById = exports.getFilialServicoControllerById = exports.criaFilialServicoController = void 0;
const filialServicoRepository_1 = require("../repositories/filialServicoRepository");
const criaFilialServicoController = async (req, res) => {
    const { nome } = req.body;
    try {
        const novaFilial = await (0, filialServicoRepository_1.criarFilialServico)(nome);
        res.status(201).json(novaFilial);
    }
    catch (error) {
        console.error('Erro ao criar filial', error);
        res.status(500).json({ message: 'Erro ao criar filial' });
    }
};
exports.criaFilialServicoController = criaFilialServicoController;
const getFilialServicoControllerById = async (req, res) => {
    const { id } = req.params;
    try {
        const filial = await (0, filialServicoRepository_1.getFilialServicoById)(parseInt(id, 10));
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
exports.getFilialServicoControllerById = getFilialServicoControllerById;
const updateFilialServicoControllerById = async (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    try {
        const filialAtualizada = await (0, filialServicoRepository_1.updateFilialServicoById)(parseInt(id, 10), newData);
        res.status(200).json(filialAtualizada);
    }
    catch (error) {
        console.error('Erro ao atualizar filial por ID', error);
        res.status(500).json({ message: 'Erro ao atualizar filial por ID' });
    }
};
exports.updateFilialServicoControllerById = updateFilialServicoControllerById;
const deleteFilialServicoControllerById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, filialServicoRepository_1.deleteFilialServicoById)(parseInt(id, 10));
        return result;
    }
    catch (error) {
        console.error('Erro ao excluir filial por ID', error);
        res.status(500).json({ message: 'Erro ao excluir filial por ID' });
    }
};
exports.deleteFilialServicoControllerById = deleteFilialServicoControllerById;
